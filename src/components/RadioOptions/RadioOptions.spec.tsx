import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioOptions } from './RadioOptions'
import { RadioOptionsProps } from './RadioOptions.types'

function renderRadioOptions(props: Partial<RadioOptionsProps<string>> = {}) {
  return render(
    <RadioOptions
      value={undefined}
      options={[]}
      onChange={jest.fn()}
      {...props}
    />
  )
}

let renderedComponent: ReturnType<typeof renderRadioOptions>
let options: RadioOptionsProps<string>['options']

describe('when rendering the component', () => {
  beforeEach(() => {
    options = [
      { name: 'First option', value: 'first_option' },
      { name: 'Second option', value: 'second_option' },
      { name: 'Third option', value: 'third_option', info: 'Some info!' }
    ]
    renderedComponent = renderRadioOptions({ options })
  })

  it('should render a radio button for each option', () => {
    const { getByText } = renderedComponent

    options.forEach((option) => {
      const radio = getByText(option.name)
      expect(radio).toBeInTheDocument()
      if (option.info) {
        expect(
          radio.querySelector('.dui-info-tooltip__trigger')
        ).toBeInTheDocument()
      }
    })
  })
})

describe('when clicking on an option', () => {
  let value: string
  let onChange: jest.Mock

  beforeEach(() => {
    onChange = jest.fn()
    options = [
      { name: 'First option', value: 'first_option' },
      { name: 'Second option', value: 'second_option' },
      { name: 'Third option', value: 'third_option', info: 'Some info!' }
    ]
  })

  describe('and the option is already selected', () => {
    beforeEach(() => {
      value = options[0].value
      renderedComponent = renderRadioOptions({ options, value, onChange })
    })

    it('should not call the onChange callback', () => {
      const { getByText } = renderedComponent

      const radio = getByText(options[0].name)
      userEvent.click(radio)

      expect(onChange).not.toHaveBeenCalledWith(value)
    })
  })

  describe('and the option is not selected', () => {
    beforeEach(() => {
      value = options[1].value
      renderedComponent = renderRadioOptions({ options, value, onChange })
    })

    it('should call the onChange callback with the new value', () => {
      const { getByText } = renderedComponent

      const radio = getByText(options[0].name)
      userEvent.click(radio)

      expect(onChange).toHaveBeenCalledWith(options[0].value)
    })
  })
})
