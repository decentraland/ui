import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Footer } from '../Footer/Footer'
import { Navbar } from '../Navbar/Navbar'
import { Page } from '../Page/Page'
import { Atlas, Layer, Coord } from './Atlas'

// Controlled

let tiles
if (window) {
  Atlas.fetchTiles().then((_tiles) => (tiles = _tiles))
}

// For Sale

const forSaleLayer: Layer = (x, y) => {
  const key = x + ',' + y
  if (tiles && tiles[key] && 'price' in tiles[key]) {
    return { color: '#00d3ff' }
  }
  return null
}

// Selection

let selected: Coord[] = []

function isSelected(x: number, y: number) {
  return selected.some((coord) => coord.x === x && coord.y === y)
}

const selectedStrokeLayer: Layer = (x, y) => {
  return isSelected(x, y) ? { color: '#ff0044', scale: 1.4 } : null
}

const selectedFillLayer: Layer = (x, y) => {
  return isSelected(x, y) ? { color: '#ff9990', scale: 1.2 } : null
}

const handleClick = (x: number, y: number) => {
  console.log(x, y)
  if (isSelected(x, y)) {
    selected = selected.filter((coord) => coord.x !== x || coord.y !== y)
  } else {
    selected.push({ x, y })
  }
}

// Hover

let hover

const isValid = () => {
  if (!hover) return false
  // only valid if it fits in central plaza
  return hover.x >= -5 && hover.x <= 6 && hover.y >= -5 && hover.y <= 5
}

const isHighlighted = (x: number, y: number) => {
  if (!hover) return false
  // only highlight a 10x10 area centered around hover coords
  const radius = 5
  return (
    x > hover.x - radius &&
    x < hover.x + radius &&
    y > hover.y - radius &&
    y < hover.y + radius
  )
}

const handleHover = (x: number, y: number) => {
  hover = { x, y }
}

const hoverStrokeLayer: Layer = (x, y) => {
  if (isHighlighted(x, y)) {
    return {
      color: isValid() ? '#44ff00' : '#ff0044',
      scale: 1.5
    }
  }
  return null
}

const hoverFillLayer: Layer = (x, y) => {
  if (isHighlighted(x, y)) {
    return {
      color: isValid() ? '#99ff90' : '#ff9990',
      scale: 1.2
    }
  }
  return null
}

const App = ({ children }) => (
  <>
    <Navbar activePage="marketplace" isFullscreen />
    <Page isFullscreen>{children}</Page>
    <Footer isFullscreen />
  </>
)

storiesOf('Atlas', module)
  .add('Uncontrolled', () => (
    <App>
      <Atlas />
    </App>
  ))
  .add('Controlled', () => (
    <App>
      <Atlas tiles={tiles} />
    </App>
  ))
  .add('For Sale', () => (
    <App>
      <Atlas tiles={tiles} layers={[forSaleLayer]} />
    </App>
  ))
  .add('Click to select', () => (
    <App>
      <Atlas
        tiles={tiles}
        layers={[selectedStrokeLayer, selectedFillLayer]}
        onClick={handleClick}
      />
    </App>
  ))
  .add('Hover to highlight', () => (
    <App>
      <Atlas
        tiles={tiles}
        layers={[hoverStrokeLayer, hoverFillLayer]}
        onHover={handleHover}
      />
    </App>
  ))
