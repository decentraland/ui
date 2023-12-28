import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ArrayFilter } from './ArrayFilter'
import { ArrayFilterOption, ArrayFilterProps } from './ArrayFilter.types'

function renderArrayFilter(props: Partial<ArrayFilterProps> = {}) {
  return render(
    <ArrayFilter values={[]} options={[]} onChange={jest.fn()} {...props} />
  )
}

let renderedComponent: ReturnType<typeof renderArrayFilter>

describe('when rendering the component without a name', () => {
  beforeEach(() => {
    renderedComponent = renderArrayFilter()
  })

  it("should not the component's header", () => {
    const { queryByTestId } = renderedComponent

    expect(queryByTestId('array-filter-header')).not.toBeInTheDocument()
  })
})

describe('when rendering the component with a name', () => {
  let name: string

  beforeEach(() => {
    name = 'a name'
    renderedComponent = renderArrayFilter({ name })
  })

  it("should show the component's header with the provided name", () => {
    const { getByTestId } = renderedComponent

    const header = getByTestId('array-filter-header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent(name)
  })
})

describe('when clicking on non-selected options', () => {
  let preSelectedOptions: string[]
  let options: ArrayFilterOption[]
  let onChangeMock: jest.Mock

  beforeEach(() => {
    onChangeMock = jest.fn()
    options = [
      { text: 'Mainnet', value: 'mainnet' },
      { text: 'Rinkeby', value: 'rinkeby' },
      { text: 'Mumbai', value: 'mumbai' }
    ]
    preSelectedOptions = ['mainnet', 'rinkeby']
    renderedComponent = renderArrayFilter({
      options,
      values: preSelectedOptions,
      onChange: onChangeMock
    })
  })

  it('should call onChange callback with the added selected option', () => {
    fireEvent.click(renderedComponent.getByText('Mumbai'))
    expect(onChangeMock).toHaveBeenCalledWith(['mainnet', 'rinkeby', 'mumbai'])
  })
})

describe('when clicking on a selected option', () => {
  let preSelectedOptions: string[]
  let options: ArrayFilterOption[]
  let onChangeMock: jest.Mock

  beforeEach(() => {
    onChangeMock = jest.fn()
    options = [
      { text: 'Mainnet', value: 'mainnet' },
      { text: 'Rinkeby', value: 'rinkeby' },
      { text: 'Mumbai', value: 'mumbai' }
    ]
    preSelectedOptions = ['mainnet', 'rinkeby']
    renderedComponent = renderArrayFilter({
      options,
      values: preSelectedOptions,
      onChange: onChangeMock
    })
  })

  it('should call onChange callback with the removed selected option', () => {
    fireEvent.click(renderedComponent.getByText('Rinkeby'))
    expect(onChangeMock).toHaveBeenCalledWith(['mainnet'])
  })
})

describe('when down pressing a key on non-selected options', () => {
  let preSelectedOptions: string[]
  let options: ArrayFilterOption[]
  let onChangeMock: jest.Mock

  beforeEach(() => {
    onChangeMock = jest.fn()
    options = [
      { text: 'Mainnet', value: 'mainnet' },
      { text: 'Rinkeby', value: 'rinkeby' },
      { text: 'Mumbai', value: 'mumbai' }
    ]
    preSelectedOptions = ['mainnet', 'rinkeby']
    renderedComponent = renderArrayFilter({
      options,
      values: preSelectedOptions,
      onChange: onChangeMock
    })
  })

  it('should call onChange callback with the added selected option', () => {
    fireEvent.keyDown(renderedComponent.getByText('Mumbai'), { key: 'Enter' })
    expect(onChangeMock).toHaveBeenCalledWith(['mainnet', 'rinkeby', 'mumbai'])
  })
})

describe('when down pressing a key on a selected option', () => {
  let preSelectedOptions: string[]
  let options: ArrayFilterOption[]
  let onChangeMock: jest.Mock

  beforeEach(() => {
    onChangeMock = jest.fn()
    options = [
      { text: 'Mainnet', value: 'mainnet' },
      { text: 'Rinkeby', value: 'rinkeby' },
      { text: 'Mumbai', value: 'mumbai' }
    ]
    preSelectedOptions = ['mainnet', 'rinkeby']
    renderedComponent = renderArrayFilter({
      options,
      values: preSelectedOptions,
      onChange: onChangeMock
    })
  })

  it('should call onChange callback with the removed selected option', () => {
    fireEvent.keyDown(renderedComponent.getByText('Rinkeby'), { key: 'Enter' })
    expect(onChangeMock).toHaveBeenCalledWith(['mainnet'])
  })
})
