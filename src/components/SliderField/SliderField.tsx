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
    if (this.props.defaultValue === undefined) {
      this.setState((prevState) => {
        return {
          ...prevState,
          from: !isNaN(this.props.min) ? this.props.min : prevState.from,
          to: !isNaN(this.props.max) ? this.props.max : prevState.to
        }
      })
    } else {
      if (Array.isArray(this.props.defaultValue)) {
        this.setState({
          from: this.props.defaultValue[0],
          to: this.props.defaultValue[1]
        })
      } else {
        this.setState({
          to: Number(this.props.defaultValue)
        })
      }
    }
  }

  render(): JSX.Element {
    const { header, className, onChange, onMouseUp, range } = this.props

    const min = this.props.min || SliderDefault.MIN
    const max = this.props.max || SliderDefault.MAX

    const classes = ['dcl', 'sliderfield']
    if (className) {
      classes.push(className)
    }

    const handleChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target

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

    const handleChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target

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
            onChange(
              e,
              range ? [this.state.from, this.state.to] : this.state.to
            )
          }
        }
      )
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
      if (onMouseUp) {
        onMouseUp(e, range ? [this.state.from, this.state.to] : this.state.to)
      }
    }

    const diffMaxMin = max - min
    const trackLeft = range
      ? `${((this.state.from - min) * 100) / diffMaxMin}%`
      : 0
    const trackRight = range
      ? `${((max - this.state.to) * 100) / diffMaxMin}%`
      : `${100 - ((this.state.to - min) * 100) / diffMaxMin}%`
    const handleFrom = `${((this.state.from - min) * 100) / diffMaxMin}%`
    const handleTo = `${((this.state.to - min) * 100) / diffMaxMin}%`

    const label =
      this.props.label ||
      (range ? `${this.state.from} - ${this.state.to}` : this.state.to)

    return (
      <div>
        <div className={classes.join(' ')}>
          <div className={'dcl sliderfield-header'}>{header}</div>
          <p>{label}</p>
          <div className="dcl sliderfield-wrapper">
            <div className={'dcl sliderfield-rail'}>
              <div
                className={'dcl sliderfield-track'}
                style={{ left: trackLeft, right: trackRight }}
              ></div>
              {range && (
                <span
                  className={'dcl sliderfield-handle'}
                  style={{ left: handleFrom }}
                ></span>
              )}

              <span
                className={'dcl sliderfield-handle'}
                style={{ left: handleTo }}
              ></span>
            </div>

            {range && (
              <input
                type="range"
                value={this.state.from}
                max={max}
                min={min}
                step="1"
                onChange={handleChangeFrom}
                style={{
                  zIndex:
                    this.state.lastInteraction == SliderLastInteraction.from
                      ? 4
                      : 3
                }}
                onMouseUp={handleMouseUp}
              />
            )}

            <input
              type="range"
              value={this.state.to}
              max={max}
              min={min}
              step="1"
              onChange={handleChangeTo}
              style={{
                zIndex:
                  this.state.lastInteraction == SliderLastInteraction.to ? 4 : 3
              }}
              onMouseUp={handleMouseUp}
            />
          </div>
        </div>
      </div>
    )
  }
}
