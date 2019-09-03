import * as React from 'react'
import { Header, Dropdown, DropdownProps } from 'semantic-ui-react'
import './TagField.css'

export type TagFieldProps = DropdownProps & {
  label?: string
  error?: boolean
  message?: string
}

export type TagFieldState = {
  options: { key?: number; text: string; value: string }[]
}

export class TagField extends React.PureComponent<
  TagFieldProps,
  TagFieldState
> {
  state = {
    options: []
  }

  handleAddition = (_, dropdownProps) => {
    const { value } = dropdownProps

    this.setState(prevState => ({
      options: [...prevState.options, { text: value, value }]
    }))
  }

  handleChange = (e, dropdownProps) => {
    const { options } = this.state
    const { onChange } = this.props

    if (e.code === 'Backspace') {
      this.setState({
        options: options.slice(0, options.length - 1)
      })
    } else if (!(e instanceof KeyboardEvent)) {
      this.setState({
        options: options.filter(option =>
          dropdownProps.value.includes(option.value)
        )
      })
    }

    if (onChange) {
      onChange(e, dropdownProps)
    }
  }

  render() {
    const { label, error, message, ...rest } = this.props
    let classes = 'dcl tag-field'

    if (error) {
      classes += ' error'
    }

    return (
      <div className={classes}>
        {label ? <Header sub>{label}</Header> : null}
        <Dropdown
          onAddItem={this.handleAddition}
          options={this.state.options}
          allowAdditions
          selection
          multiple
          search
          fluid
          on
          {...rest}
          onChange={this.handleChange}
        />
        <p className="message">
          {message}
          &nbsp;
        </p>
      </div>
    )
  }
}
