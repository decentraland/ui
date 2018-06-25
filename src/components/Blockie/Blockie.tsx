import * as React from 'react'
import * as blockies from 'ethereum-blockies/blockies'
import './Blockie.css'

type Props = {
  seed: string
  color?: string
  spotcolor?: string
  bgcolor?: string
  size?: number
  scale?: number
  className?: string
  children?: any
}

type State = {}

export class Blockie extends React.PureComponent<Props, State> {
  private shouldRefresh: boolean = false
  public canvas: HTMLCanvasElement = null
  static defaultProps = {
    color: '#ff4130',
    bgcolor: '#9f1a10',
    spotcolor: '#00dbef',
    size: 6,
    scale: 6,
    className: ''
  }

  componentDidMount() {
    this.draw()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.seed !== nextProps.seed) {
      this.shouldRefresh = true
    }
  }

  componentDidUpdate() {
    if (this.shouldRefresh) {
      this.shouldRefresh = false
      this.draw()
    }
  }

  getOpts() {
    const { seed, color, spotcolor, bgcolor, size, scale } = this.props

    return {
      seed,
      color,
      spotcolor,
      bgcolor,
      size,
      scale
    }
  }

  draw() {
    if (!this.canvas) {
      return '🦄'
    }
    const { size, scale } = this.props
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, size * scale, size * scale)
    blockies.render(this.getOpts(), this.canvas)
  }

  render() {
    const { size, scale, children, className } = this.props
    let classes = `dcl blockie ${className}`.trim()
    if (scale * size <= 16) {
      classes += ' mini'
    } else if (scale * size <= 24) {
      classes += ' tiny'
    } else if (scale * size <= 36) {
      classes += ' small'
    }
    const canvas = React.createElement('canvas', {
      className: classes,
      ref: canvas => (this.canvas = canvas as HTMLCanvasElement)
    })

    if (children) {
      return (
        <span className="dcl blockie-wrapper">
          {canvas}
          <span className="dcl blockie-children">{children}</span>
        </span>
      )
    }
    return canvas
  }
}
