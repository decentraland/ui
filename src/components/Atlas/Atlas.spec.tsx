import { Atlas, AtlasProps, AtlasTile } from './Atlas'

const OWNED_COLOR = '#3D3A46'
const UNOWNED_COLOR = '#09080A'
const ROAD_COLOR = '#716C7A'

const buildTile = (tile: Partial<AtlasTile> = {}): AtlasTile => ({
  x: 0,
  y: 0,
  type: 9,
  owner: '0xowner',
  ...tile
})

const buildLayer = (tiles: AtlasTile[]) => {
  const props = {
    tiles: tiles.reduce<Record<string, AtlasTile>>((acc, tile) => {
      acc[tile.x + ',' + tile.y] = tile
      return acc
    }, {})
  } as AtlasProps
  return new Atlas(props).layer
}

describe('Atlas.layer', () => {
  describe('when the tile is a road', () => {
    it('should keep its color and the borders reported by the API', () => {
      const layer = buildLayer([buildTile({ type: 7, top: 1, left: 1 })])

      expect(layer(0, 0)).toEqual({
        color: ROAD_COLOR,
        top: true,
        left: true,
        topLeft: false
      })
    })
  })

  describe('when the tile is a district', () => {
    it('should paint it as the LAND it is instead of demarcating it', () => {
      const layer = buildLayer([buildTile({ type: 5 })])

      expect(layer(0, 0)).toEqual({
        color: OWNED_COLOR,
        top: false,
        left: false,
        topLeft: false
      })
    })

    it('should paint an unowned district parcel as unowned LAND', () => {
      const layer = buildLayer([
        buildTile({ type: 5, owner: undefined as never })
      ])

      expect(layer(0, 0)).toHaveProperty('color', UNOWNED_COLOR)
    })

    it('should stitch it to the neighbours that belong to its estate', () => {
      const layer = buildLayer([
        buildTile({
          x: 0,
          y: 0,
          type: 5,
          estate_id: '1',
          top: 1,
          left: 1,
          topLeft: 1
        }),
        buildTile({ x: 0, y: 1, type: 5, estate_id: '1' }),
        buildTile({ x: -1, y: 0, type: 5, estate_id: '2' }),
        buildTile({ x: -1, y: 1, type: 5, estate_id: '1' })
      ])

      expect(layer(0, 0)).toEqual({
        color: OWNED_COLOR,
        top: true,
        left: false,
        topLeft: true
      })
    })

    it('should not stitch a district parcel that does not belong to an estate', () => {
      const layer = buildLayer([
        buildTile({ x: 0, y: 0, type: 5, top: 1, left: 1, topLeft: 1 }),
        buildTile({ x: 0, y: 1, type: 5 })
      ])

      expect(layer(0, 0)).toEqual({
        color: OWNED_COLOR,
        top: false,
        left: false,
        topLeft: false
      })
    })
  })

  describe('when the tile is a parcel on sale inside a district', () => {
    it('should stitch it to its estate instead of to the district', () => {
      const layer = buildLayer([
        buildTile({ x: 0, y: 0, type: 10, estate_id: '1', top: 1, left: 1 }),
        buildTile({ x: -1, y: 0, type: 5, estate_id: '2' })
      ])

      expect(layer(0, 0)).toEqual({
        color: OWNED_COLOR,
        top: false,
        left: false,
        topLeft: false
      })
    })
  })
})
