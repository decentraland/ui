import * as React from 'react'
import "./SliderField.css"

export type SliderFieldProps = {
  header: string
  className?: string
  min?: number
  max?: number
  defaultValue?: number
  label?: string | React.PureComponent<{ value: number }>
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: number) => void
  onMouseUp?: (ev: React.MouseEvent<HTMLInputElement>, data: number) => void
}

export enum SliderDefault { MIN = 0, MAX = 100, VALUE = 100 }

export type SliderFieldState = {
  value: number
}

export class SliderField extends React.PureComponent<SliderFieldProps, SliderFieldState> {

  state = {
    value: SliderDefault.VALUE
  }

  componentDidMount(): void {
    if (this.props.defaultValue === undefined) {
      this.setState(prevState => {
        return {
          ...prevState,
          value: !isNaN(this.props.max) ? this.props.max : prevState.value
        }
      })
    } else {
      this.setState({
        value: this.props.defaultValue
      })
    }
  }

  render(): JSX.Element {
    const {
      header,
      className,
      onChange,
      onMouseUp,
    } = this.props

    const min = this.props.min || SliderDefault.MIN
    const max = this.props.max || SliderDefault.MAX

    const classes = ["dcl", "sliderfield"]
    if (className) {
      classes.push(className)
    }

    const handleChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target

      this.setState(prevState => {
        return {
          ...prevState,
          value: Number(input.value)
        }
      }, () => {
        if (onChange) {
          onChange(e, this.state.value)
        }
      })
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
      if (onMouseUp) {
        onMouseUp(e, this.state.value)
      }
    }

    const trackLeft = `${100 - ((this.state.value - min) * 100 / (max - min))}%`
    const handleValue = `${(this.state.value - min) * 100 / (max - min)}%`

    const label = this.props.label || `${this.state.value}`

    return (
      <div>
        <div className={classes.join(" ")}>
          <div className={"dcl slider-header"}>{header}</div>
          <p>{label}</p>
          <div className="dcl sliderfield-wrapper">
            <div className={"dcl sliderfield-rail"}>
              <div className={"dcl sliderfield-track"} style={{ left: 0, right: trackLeft }}></div>
              <span className={"dcl sliderfield-handle"} style={{ left: handleValue }}></span>
            </div>
            <input
              type="range"
              value={this.state.value}
              max={max}
              min={min}
              step="1"
              onChange={handleChangeFrom}
              onMouseUp={handleMouseUp}
            />
          </div>
        </div>
      </div>
    )
  }
}