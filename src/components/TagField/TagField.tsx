import * as React from 'react'
import { DropdownProps, Dropdown } from '../Dropdown/Dropdown'
import { Header } from '../Header/Header'
import './TagField.css'

export type TagFieldProps = DropdownProps & {
  label?: string
  error?: boolean
  message?: string
  value?: (string | number | boolean)[]
}

export class TagField extends React.PureComponent<TagFieldProps> {
  containerRef = React.createRef<HTMLDivElement>()

  getOptions = (): Array<{ text: string; value: string }> => {
    const value = this.props.value ?? []
    return value.map((value) => ({
      text: value.toString(),
      value: value.toString()
    }))
  }

  handleScrollToEnd = (): void => {
    const el = this.containerRef.current
    if (el) {
      setTimeout(() => (el.scrollLeft = el.scrollWidth), 0)
    }
  }

  handleChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    dropdownProps: DropdownProps
  ): void => {
    const { onChange } = this.props

    this.handleScrollToEnd()

    if (onChange) {
      onChange(e, dropdownProps)
    }
  }

  render(): JSX.Element {
    const { label, error, message, ...rest } = this.props
    let classes = 'dcl tag-field'

    if (error) {
      classes += ' error'
    }

    return (
      <div className={classes}>
        {label ? <Header sub>{label}</Header> : null}
        <div className="container" ref={this.containerRef}>
          <Dropdown
            options={this.getOptions()}
            allowAdditions
            selection
            multiple
            search
            fluid
            on
            {...rest}
            onChange={this.handleChange}
          />
        </div>
        <p className="message">
          {message}
          &nbsp;
        </p>
      </div>
    )
  }
}
