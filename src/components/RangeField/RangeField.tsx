import * as React from 'react'
import './RangeField.css'

export type RangeFieldProps = {
  header: string
  className?: string
  min?: number
  max?: number
  defaultValue?: readonly [number, number]
  label?: string | React.PureComponent<{ value: [number, number] }>
  onChange?: (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: [number, number]
  ) => void
  onMouseUp?: (
    ev: React.MouseEvent<HTMLInputElement>,
    data: [number, number]
  ) => void
}

export enum RangeLastInteraction {
  'from',
  'to'
}
export enum RangeDefault {
  FROM = 0,
  TO = 100
}

export type RangeFieldState = {
  from: number
  to: number
  lastInteraction: RangeLastInteraction
}

export class RangeField extends React.PureComponent<
  RangeFieldProps,
  RangeFieldState
> {
  state = {
    from: RangeDefault.FROM,
    to: RangeDefault.TO,
    lastInteraction: RangeLastInteraction.from
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
      this.setState({
        from: this.props.defaultValue[0],
        to: this.props.defaultValue[1]
      })
    }
  }

  render(): JSX.Element {
    const { header, className, onChange, onMouseUp } = this.props

    const min = this.props.min || RangeDefault.FROM
    const max = this.props.max || RangeDefault.TO

    const classes = ['dcl', 'rangefield']
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
            lastInteraction: RangeLastInteraction.from
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
            lastInteraction: RangeLastInteraction.to
          }
        },
        () => {
          if (onChange) {
            onChange(e, [this.state.from, this.state.to])
          }
        }
      )
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
      if (onMouseUp) {
        onMouseUp(e, [this.state.from, this.state.to])
      }
    }

    const trackLeft = `${((this.state.from - min) * 100) / (max - min)}%`
    const trackRight = `${((max - this.state.to) * 100) / max}%`
    const handleFrom = `${((this.state.from - min) * 100) / (max - min)}%`
    const handleTo = `${(this.state.to * 100) / max}%`

    const label = this.props.label || `${this.state.from} - ${this.state.to}`

    return (
      <div>
        <div className={classes.join(' ')}>
          <div className={'dcl range-header'}>{header}</div>
          <p>{label}</p>
          <div className="dcl rangefield-wrapper">
            <div className={'dcl rangefield-rail'}>
              <div
                className={'dcl rangefield-track'}
                style={{ left: trackLeft, right: trackRight }}
              ></div>
              <span
                className={'dcl rangefield-handle'}
                style={{ left: handleFrom }}
              ></span>
              <span
                className={'dcl rangefield-handle'}
                style={{ left: handleTo }}
              ></span>
            </div>
            <input
              type="range"
              value={this.state.from}
              max={max}
              min={min}
              step="1"
              onChange={handleChangeFrom}
              style={{
                zIndex:
                  this.state.lastInteraction == RangeLastInteraction.from
                    ? 4
                    : 3
              }}
              onMouseUp={handleMouseUp}
            />

            <input
              type="range"
              value={this.state.to}
              max={max}
              min={min}
              step="1"
              onChange={handleChangeTo}
              style={{
                zIndex:
                  this.state.lastInteraction == RangeLastInteraction.to ? 4 : 3
              }}
              onMouseUp={handleMouseUp}
            />
          </div>
        </div>
      </div>
    )
  }
}
