import * as React from 'react'
import { TileMapProps, Layer, TileMap, Coord } from 'react-tile-map'
import 'react-tile-map/lib/styles.css'
import './Atlas.css'
import { AtlasColor } from '../../colors'

export enum AtlasTileType {
  OWNED = 'owned',
  UNOWNED = 'unowned',
  PLAZA = 'plaza',
  ROAD = 'road',
  DISTRICT = 'district'
}

export type AtlasTile = {
  id: string
  x: number
  y: number
  type: AtlasTileType
  top: boolean
  left: boolean
  topLeft: boolean
  name?: string
  owner?: string
  estateId?: string
  tokenId?: string
  price?: number
}

export { Layer, Coord }

export type AtlasProps = Omit<TileMapProps, 'layers'> & {
  layers?: Layer[]
  tiles?: Record<string, AtlasTile>
}

export type AtlasState = {
  tiles?: Record<string, AtlasTile>
}

export class Atlas extends React.PureComponent<AtlasProps, AtlasState> {
  static defaultProps = {
    ...TileMap.defaultProps,
    layers: []
  }

  state = {
    tiles: this.props.tiles
  }

  mounted: boolean = true

  static getLayer = (tiles: Record<string, AtlasTile>): Layer => (x, y) => {
    const id = x + ',' + y
    if (tiles && id in tiles) {
      const tile = tiles[id]
      return {
        color: Atlas.getColorByType(tile.type),
        top: tile.top,
        left: tile.left,
        topLeft: tile.topLeft
      }
    } else {
      return {
        color: (x + y) % 2 === 0 ? AtlasColor.EVEN : AtlasColor.ODD
      }
    }
  }

  static TILES_URL = 'https://api.decentraland.org/v2/tiles?exclude=updatedAt'

  static fetchTiles = async (url: string = Atlas.TILES_URL) => {
    if (!window.fetch) return {}
    const resp = await window.fetch(url)
    const json = await resp.json()
    return json.data as Record<string, AtlasTile>
  }

  static getColorByType(type: AtlasTileType) {
    switch (type) {
      case AtlasTileType.OWNED:
        return AtlasColor.OWNED
      case AtlasTileType.UNOWNED:
        return AtlasColor.UNOWNED
      case AtlasTileType.PLAZA:
        return AtlasColor.PLAZA
      case AtlasTileType.ROAD:
        return AtlasColor.ROAD
      case AtlasTileType.DISTRICT:
        return AtlasColor.DISTRICT
    }
  }

  componentDidMount() {
    if (!this.state.tiles) {
      Atlas.fetchTiles().then(this.handleUpdateTiles)
    }
    this.mounted = true
  }

  componentDidUpdate() {
    if (this.props.tiles && this.props.tiles !== this.state.tiles) {
      this.setState({ tiles: this.props.tiles })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  handleUpdateTiles = (tiles: Record<string, AtlasTile>) => {
    if (this.mounted) {
      this.setState({ tiles })
    }
  }

  render() {
    const { layers, className, ...rest } = this.props
    let classes = 'dcl atlas ' + className

    return (
      <TileMap
        {...rest}
        className={classes.trim()}
        layers={[Atlas.getLayer(this.state.tiles), ...layers]}
      />
    )
  }
}
