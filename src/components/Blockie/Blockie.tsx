import * as React from 'react'
import * as blockies from 'ethereum-blockies/blockies'
import './Blockie.css'
import { WrappedAsProps } from '../../types/as'

export type BlockieProps<T extends React.ElementType = typeof React.Fragment> =
  {
    seed: string
    color?: string
    spotcolor?: string
    bgcolor?: string
    size?: number
    scale?: number
    className?: string
    children?: React.ReactNode
  } & WrappedAsProps<T>

export type CanvasStateStore = {
  canvas?: HTMLCanvasElement
}

export class Blockie<T extends React.ElementType> extends React.PureComponent<
  BlockieProps<T>
> {
  static defaultProps = {
    color: '#e449c2',
    bgcolor: '#3149de',
    spotcolor: '#e449c2',
    size: 6,
    scale: 6,
    className: '',
    as: React.Fragment
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
    const {
      size,
      scale,
      children,
      className,
      as: Wrapper,
      ...rest
    } = this.props

    let classes = `dcl blockie ${className}`.trim()
    if (scale * size <= 16) {
      classes += ' mini'
    } else if (scale * size <= 24) {
      classes += ' tiny'
    } else if (scale * size <= 36) {
      classes += ' small'
    }

    const canvas = <canvas className={classes} ref={this.canvas} />

    if (children) {
      return (
        <span className="dcl blockie-wrapper">
          <Wrapper {...rest}>
            {canvas}
            <span className="dcl blockie-children">{children}</span>
          </Wrapper>
        </span>
      )
    }
    return <Wrapper {...rest}>{canvas}</Wrapper>
  }
}
