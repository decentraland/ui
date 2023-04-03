import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, FieldProps } from './Field'

function renderField(props: Partial<FieldProps> = {}) {
  return render(
    <Field
      onChange={jest.fn()}
      onAction={jest.fn()}
      label="Field"
      id="test-field"
      {...props}
    />
  )
}

it('should show an input with correct label', () => {
  const screen = renderField({ label: 'My label' })
  expect(screen.getByRole('textbox', { name: 'My label' })).toBeInTheDocument()
})

it('should show a field message', () => {
  const message = 'A custom message'
  const screen = renderField({ message })
  expect(screen.getByText(message)).toBeInTheDocument()
})

describe('when typing in the field', () => {
  it('should call onChange callback', async () => {
    const onChangeMock = jest.fn()
    const screen = renderField({ onChange: onChangeMock })
    await userEvent.type(screen.getByRole('textbox'), 'test')
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ value: 'test' })
    )
  })
})

describe('when clicking on the action button', () => {
  it('should call onAction callback', async () => {
    const actionName = 'Custom Action'
    const onActionMock = jest.fn()
    const screen = renderField({ action: actionName, onAction: onActionMock })
    await userEvent.click(screen.getByRole('button', { name: actionName }))
    expect(onActionMock).toHaveBeenCalled()
  })
})
