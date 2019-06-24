import * as React from 'react'
import { TileMapProps, Layer, TileMap, Coord } from 'react-tile-map'

import './Atlas.css'

export type AtlasTile = {
  x: number
  y: number
  type: number
  left?: number
  top?: number
  topLeft?: number
}

export { Layer, Coord }

export type AtlasProps = Omit<TileMapProps, 'layers'> & {
  layers?: Layer[]
  tiles?: Record<string, AtlasTile>
}

export type AtlasState = {
  tiles?: Record<string, AtlasTile>
}

const COLOR_BY_TYPE = Object.freeze({
  0: '#ff9990',
  1: '#ff4053',
  2: '#ff9990',
  3: '#ff4053',
  4: '#5054D4',
  5: '#563db8',
  6: '#716C7A',
  7: '#70AC76',
  8: '#3D3A46',
  9: '#3D3A46',
  10: '#09080A',
  11: '#18141a',
  12: '#110e13',
  13: '#0d0b0e'
})

export class Atlas extends React.PureComponent<AtlasProps, AtlasState> {
  static defaultProps = {
    ...TileMap.defaultProps,
    layers: []
  }

  state = {
    tiles: this.props.tiles
  }

  mounted: boolean = true

  layer: Layer = (x, y) => {
    const { tiles } = this.state
    const id = x + ',' + y
    if (tiles && id in tiles) {
      const tile = tiles[id]
      return {
        color: COLOR_BY_TYPE[tile.type],
        top: !!tile.top,
        left: !!tile.left,
        topLeft: !!tile.topLeft
      }
    } else {
      return {
        color: (x + y) % 2 === 0 ? COLOR_BY_TYPE[12] : COLOR_BY_TYPE[13]
      }
    }
  }

  static TILES_URL = 'https://api.decentraland.org/v1/tiles'

  static fetchTiles = async (url: string = Atlas.TILES_URL) => {
    if (!window.fetch) return {}
    const resp = await window.fetch(url)
    const json = await resp.json()
    return json.data as Record<string, AtlasTile>
  }

  componentWillMount() {
    if (!this.state.tiles) {
      Atlas.fetchTiles().then(this.handleUpdateTiles)
    }
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillReceiveProps(nextProps: AtlasProps) {
    if (nextProps.tiles && nextProps.tiles !== this.state.tiles) {
      this.setState({ tiles: nextProps.tiles })
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
        layers={[this.layer, ...layers]}
      />
    )
  }
}
