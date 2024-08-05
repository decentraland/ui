import * as React from 'react'
import * as blockies from 'ethereum-blockies/blockies'
import './Blockie.css'
import classNames from 'classnames'

export type BlockieProps = {
  seed: string
  color?: string
  spotcolor?: string
  bgcolor?: string
  size?: number
  scale?: number
  shape?: 'circle' | 'square'
  className?: string
  children?: React.ReactNode
}

export type CanvasStateStore = {
  canvas?: HTMLCanvasElement
}

export class Blockie extends React.PureComponent<BlockieProps> {
  static defaultProps = {
    color: '#e449c2',
    bgcolor: '#3149de',
    spotcolor: '#e449c2',
    size: 6,
    scale: 6,
    className: ''
  }

  canvas = React.createRef<HTMLCanvasElement>()

  componentDidMount(): void {
    this.draw()
  }
  componentDidUpdate(): void {
    this.draw()
  }

  getOpts(): Pick<
    BlockieProps,
    'seed' | 'color' | 'spotcolor' | 'bgcolor' | 'size' | 'scale'
  > {
    const { seed, color, spotcolor, bgcolor, size, scale } = this.props

    return {
      seed: seed ? seed.toLowerCase() : '',
      color,
      spotcolor,
      bgcolor,
      size,
      scale
    }
  }

  draw(): string | undefined {
    if (!this.canvas || !this.canvas.current) {
      return '🦄'
    }
    const { size, scale } = this.props
    const ctx = this.canvas.current.getContext('2d')
    ctx.clearRect(0, 0, size * scale, size * scale)
    blockies.render(this.getOpts(), this.canvas.current)
  }

  render(): JSX.Element {
    const { size, scale, shape, children, className } = this.props

    let scaleClass = ''
    if (scale * size <= 16) {
      scaleClass += ' mini'
    } else if (scale * size <= 24) {
      scaleClass += ' tiny'
    } else if (scale * size <= 36) {
      scaleClass += ' small'
    }

    const canvas = (
      <canvas
        className={classNames(
          'dcl blockie',
          className,
          shape === 'circle' && 'circle',
          scaleClass
        )}
        ref={this.canvas}
      />
    )

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
