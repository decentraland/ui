import * as React from 'react'
import './SliderField.css'

export type SliderFieldProps = {
  header: string
  className?: string
  min?: number
  max?: number
  defaultValue?: number | readonly [number, number]
  label?: string | React.PureComponent<{ value: number | [number, number] }>
  range?: boolean
  onChange?: (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: number | [number, number]
  ) => void
  onMouseUp?: (
    ev: React.MouseEvent<HTMLInputElement>,
    data: number | [number, number]
  ) => void
}

export enum SliderLastInteraction {
  'from',
  'to'
}
export enum SliderDefault {
  MIN = 0,
  MAX = 100,
  FROM = 0,
  TO = 100
}

export type SliderFieldState = {
  from: number
  to: number
  lastInteraction: SliderLastInteraction
}

export type SliderFieldLeftRightStyle = {
  left: string | number
  right: string
}

export class SliderField extends React.PureComponent<
  SliderFieldProps,
  SliderFieldState
> {
  state = {
    from: SliderDefault.FROM,
    to: SliderDefault.TO,
    lastInteraction: SliderLastInteraction.from
  }

  componentDidMount(): void {
    const { defaultValue, min, max } = this.props

    if (defaultValue === undefined) {
      this.setState((prevState) => {
        return {
          ...prevState,
          from: !isNaN(min) ? min : prevState.from,
          to: !isNaN(max) ? max : prevState.to
        }
      })
    } else {
      if (Array.isArray(defaultValue)) {
        this.setState({
          from: defaultValue[0],
          to: defaultValue[1]
        })
      } else {
        this.setState({
          to: Number(defaultValue)
        })
      }
    }
  }

  handleChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const { onChange } = this.props

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          from: Math.min(Number(input.value), prevState.to),
          lastInteraction: SliderLastInteraction.from
        }
      },
      () => {
        if (onChange) {
          onChange(e, [this.state.from, this.state.to])
        }
      }
    )
  }

  handleChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const { onChange, range } = this.props

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          to: Math.max(Number(input.value), prevState.from),
          lastInteraction: SliderLastInteraction.to
        }
      },
      () => {
        if (onChange) {
          onChange(e, range ? [this.state.from, this.state.to] : this.state.to)
        }
      }
    )
  }

  handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    const { onMouseUp, range } = this.props
    if (onMouseUp) {
      onMouseUp(e, range ? [this.state.from, this.state.to] : this.state.to)
    }
  }

  getTrackStyles = (min: number, max: number): SliderFieldLeftRightStyle => {
    const { range } = this.props
    const { from, to } = this.state

    const diffMaxMin = max - min
    const trackLeft = range ? `${((from - min) * 100) / diffMaxMin}%` : 0
    const trackRight = range
      ? `${((max - to) * 100) / diffMaxMin}%`
      : `${100 - ((to - min) * 100) / diffMaxMin}%`

    return {
      left: trackLeft,
      right: trackRight
    }
  }

  getLabel = () => {
    const { label, range } = this.props
    const { from, to } = this.state
    return label || (range ? `${from} - ${to}` : to)
  }

  getMarkStyle = (min: number, max: number): SliderFieldLeftRightStyle => {
    const { from, to } = this.state
    const diffMaxMin = max - min
    const leftStyle = `${((from - min) * 100) / diffMaxMin}%`
    const rightStyle = `${((to - min) * 100) / diffMaxMin}%`

    return {
      left: leftStyle,
      right: rightStyle
    }
  }

  render(): JSX.Element {
    const { header, className, range } = this.props

    const min = this.props.min || SliderDefault.MIN
    const max = this.props.max || SliderDefault.MAX

    const { from, to } = this.state

    const classes = ['dcl', 'sliderfield']
    if (className) {
      classes.push(className)
    }

    const trackStyle = this.getTrackStyles(min, max)
    const markStyle = this.getMarkStyle(min, max)
    const label = this.getLabel()

    return (
      <div>
        <div className={classes.join(' ')}>
          <div className="dcl sliderfield-header">{header}</div>
          <p>{label}</p>
          <div className="dcl sliderfield-wrapper">
            <div className="dcl sliderfield-rail">
              <div
                className="dcl sliderfield-track"
                style={{ left: trackStyle.left, right: trackStyle.right }}
              ></div>
              {range && (
                <span
                  className="dcl sliderfield-mark"
                  style={{ left: markStyle.left }}
                ></span>
              )}

              <span
                className="dcl sliderfield-mark"
                style={{ left: markStyle.right }}
              ></span>
            </div>

            {range && (
              <input
                type="range"
                value={from}
                max={max}
                min={min}
                step="1"
                onChange={this.handleChangeFrom}
                style={{
                  zIndex:
                    this.state.lastInteraction == SliderLastInteraction.from
                      ? 4
                      : 3
                }}
                onMouseUp={this.handleMouseUp}
              />
            )}

            <input
              type="range"
              value={to}
              max={max}
              min={min}
              step="1"
              onChange={this.handleChangeTo}
              style={{
                zIndex:
                  this.state.lastInteraction == SliderLastInteraction.to ? 4 : 3
              }}
              onMouseUp={this.handleMouseUp}
            />
          </div>
        </div>
      </div>
    )
  }
}
