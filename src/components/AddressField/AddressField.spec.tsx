import React from 'react'
import { RenderResult, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddressFieldErrors, Props } from './AddressField.types'
import AddressField from './AddressField'
import { shorten } from './utils'

function renderAddressField(props: Partial<Props> = {}) {
  return render(<AddressField resolveName={jest.fn()} {...props} />)
}

const address = '0x89805E5f0698Cb4dB57f0E389f2a75259f78CC22'
const name = 'test.dcl.eth'
let screen: RenderResult
let resolveNameMock: jest.Mock
let onChangeMock: jest.Mock

describe('when user inputs an address', () => {
  beforeEach(async () => {
    resolveNameMock = jest.fn()
    onChangeMock = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      placeholder: 'test address',
      onChange: onChangeMock
    })
    const addressInput = screen.getByPlaceholderText('test address')
    userEvent.type(addressInput, address)
    await waitFor(() =>
      expect(screen.getByTestId('check-icon')).toBeInTheDocument()
    )
  })

  it('should not call resolveName function', () => {
    expect(resolveNameMock).not.toHaveBeenCalled()
  })

  it('should show the address as the input value', () => {
    expect(screen.getByPlaceholderText('test address')).toHaveValue(address)
  })

  it('should not show the resolved address', () => {
    expect(screen.queryByTestId('resolved-address')).not.toBeInTheDocument()
  })

  it('should call onChange callback with address', () => {
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ value: address, error: undefined })
    )
  })
})

describe('when user inputs a name', () => {
  describe('and the name resolves correctly to an address', () => {
    beforeEach(async () => {
      resolveNameMock = jest.fn().mockResolvedValue(address)
      onChangeMock = jest.fn()
      screen = renderAddressField({
        resolveName: resolveNameMock,
        placeholder: 'test address',
        onChange: onChangeMock
      })
      const addressInput = screen.getByPlaceholderText('test address')
      userEvent.type(addressInput, name)
      await waitFor(() =>
        expect(screen.getByTestId('check-icon')).toBeInTheDocument()
      )
    })

    it('should keep the name as the input value', () => {
      expect(screen.getByPlaceholderText('test address')).toHaveValue(name)
    })

    it('should show the resolved address', () => {
      expect(screen.queryByTestId('resolved-address')).toBeInTheDocument()
    })

    it('should show the cropped address', () => {
      expect(screen.queryByText(shorten(address))).toBeInTheDocument()
    })

    it('should call onChange callback with resolved address', () => {
      expect(onChangeMock).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ value: address, error: undefined })
      )
    })
  })

  describe("and the name doesn't resolve to an address", () => {
    beforeEach(async () => {
      resolveNameMock = jest.fn().mockResolvedValue(undefined)
      onChangeMock = jest.fn()
      screen = renderAddressField({
        resolveName: resolveNameMock,
        placeholder: 'test address',
        onChange: onChangeMock
      })
      const addressInput = screen.getByPlaceholderText('test address')
      userEvent.type(addressInput, name)
    })

    it('should keep the name as the input value', () => {
      expect(screen.getByPlaceholderText('test address')).toHaveValue(name)
    })

    it('should show an error', async () => {
      await waitFor(() =>
        expect(
          screen.getByText('This is not a valid name or address')
        ).toBeInTheDocument()
      )
    })

    it('should call onChange callback with the invalid address/name', async () => {
      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            value: name,
            error: new Error(AddressFieldErrors.INVALID_ADDRESS_OR_NAME)
          })
        )
      })
    })
  })
})

describe('when there is an error resolving the name', () => {
  beforeEach(async () => {
    resolveNameMock = jest.fn().mockRejectedValue(new Error('Some ERROR'))
    onChangeMock = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      placeholder: 'test address',
      onChange: onChangeMock
    })
    const addressInput = screen.getByPlaceholderText('test address')
    userEvent.type(addressInput, name)
  })

  it('should show an error', async () => {
    await waitFor(() =>
      expect(
        screen.getByText('This is not a valid name or address')
      ).toBeInTheDocument()
    )
  })

  it('should call onChange callback with error', async () => {
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          value: name,
          error: new Error(AddressFieldErrors.ERROR_RESOLVING_NAME)
        })
      )
    })
  })
})
