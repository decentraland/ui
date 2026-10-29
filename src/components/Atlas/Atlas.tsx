import * as React from 'react'
import { TileMapProps, Layer, TileMap, Coord } from 'react-tile-map'
import 'react-tile-map/dist/styles.css'
import './Atlas.css'

export type AtlasTile = {
  x: number
  y: number
  type: number
  left?: number
  top?: number
  topLeft?: number
  owner: string
  name?: string
  estate_id?: string
}

export { Layer, Coord }

// Legacy tile types served by https://api.decentraland.org/v1/tiles
const DISTRICT_TYPE = 5
const OWNED_TYPE = 9
const ON_SALE_TYPE = 10
const UNOWNED_TYPE = 11

const coordsToId = (x: number, y: number) => x + ',' + y

const isSameEstate = (tile: AtlasTile, other?: AtlasTile) =>
  !!tile.estate_id && !!other && other.estate_id === tile.estate_id

export type AtlasProps = Omit<TileMapProps, 'layers'> & {
  layers?: Layer[]
  tiles?: Record<string, AtlasTile>
}

export type AtlasState = {
  tiles?: Record<string, AtlasTile>
}

const COLOR_BY_TYPE = Object.freeze({
  0: '#ff9990', // my parcels
  1: '#ff4053', // my parcels on sale
  2: '#ff9990', // my estates
  3: '#ff4053', // my estates on sale
  4: '#ffbd33', // parcels/estates where I have permissions
  5: '#3D3A46', // districts, drawn as owned LAND
  6: '#563db8', // contributions
  7: '#716C7A', // roads
  8: '#70AC76', // plazas
  9: '#3D3A46', // owned parcel/estate
  10: '#3D3A46', // parcels on sale (we show them as owned parcels)
  11: '#09080A', // unowned pacel/estate
  12: '#18141a', // background
  13: '#110e13', // loading odd
  14: '#0d0b0e' // loading even
})

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export class Atlas extends React.PureComponent<AtlasProps, AtlasState> {
  static defaultProps = {
    ...TileMap.defaultProps,
    layers: []
  }

  state = {
    tiles: this.props.tiles
  }

  mounted = true

  layer: Layer = (x, y) => {
    const { tiles } = this.state
    const id = x + ',' + y
    if (tiles && id in tiles) {
      const tile = tiles[id]
      // Districts are drawn as the LAND they are, with borders recomputed per
      // estate instead of tracing the district outline. Parcels on sale go
      // through it too: the ones inside a district are reported as ON_SALE.
      // See DAO proposal 9ee1965f-6a96-45f9-bb20-f60baa13607f.
      if (tile.type === DISTRICT_TYPE || tile.type === ON_SALE_TYPE) {
        return {
          color:
            tile.type === DISTRICT_TYPE
              ? COLOR_BY_TYPE[tile.owner ? OWNED_TYPE : UNOWNED_TYPE]
              : COLOR_BY_TYPE[tile.type],
          top: isSameEstate(tile, tiles[coordsToId(x, y + 1)]),
          left: isSameEstate(tile, tiles[coordsToId(x - 1, y)]),
          topLeft: isSameEstate(tile, tiles[coordsToId(x - 1, y + 1)])
        }
      }
      return {
        color: COLOR_BY_TYPE[tile.type],
        top: !!tile.top,
        left: !!tile.left,
        topLeft: !!tile.topLeft
      }
    } else {
      return {
        color: (x + y) % 2 === 0 ? COLOR_BY_TYPE[13] : COLOR_BY_TYPE[14]
      }
    }
  }

  static TILES_URL = 'https://api.decentraland.org/v1/tiles'

  static fetchTiles = async (
    url: string = Atlas.TILES_URL
  ): Promise<Record<string, AtlasTile>> => {
    if (!window.fetch) return {}
    const resp = await window.fetch(url)
    const json = await resp.json()
    return json.data as Record<string, AtlasTile>
  }

  componentDidMount(): void {
    if (!this.state.tiles) {
      Atlas.fetchTiles().then(this.handleUpdateTiles)
    }
    this.mounted = true
  }

  componentDidUpdate(): void {
    if (this.props.tiles && this.props.tiles !== this.state.tiles) {
      this.setState({ tiles: this.props.tiles })
    }
  }

  componentWillUnmount(): void {
    this.mounted = false
  }

  handleUpdateTiles = (tiles: Record<string, AtlasTile>): void => {
    if (this.mounted) {
      this.setState({ tiles })
    }
  }

  render(): JSX.Element {
    const { layers, className, ...rest } = this.props
    const classes = 'dcl atlas ' + className

    return (
      <TileMap
        {...rest}
        className={classes.trim()}
        layers={[this.layer, ...layers]}
      />
    )
  }
}
