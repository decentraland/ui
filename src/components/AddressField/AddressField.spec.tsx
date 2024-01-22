import React from 'react'
import { RenderResult, render, waitFor } from '@testing-library/react'
import { Props } from './AddressField.types'
import AddressField from './AddressField'
import userEvent from '@testing-library/user-event'
import { shorten } from './utils'

function renderAddressField(props: Partial<Props> = {}) {
  return render(<AddressField resolveName={jest.fn()} {...props} />)
}

const address = '0x89805E5f0698Cb4dB57f0E389f2a75259f78CC22'
const name = 'test.dcl.eth'
let screen: RenderResult
let resolveNameMock: jest.Mock

describe('when user inputs an address', () => {
  beforeEach(async () => {
    resolveNameMock = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      placeholder: 'test address'
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

  it('should show address as the input value', () => {
    expect(screen.getByPlaceholderText('test address')).toHaveValue(address)
  })

  it('should not show resolved address', () => {
    expect(screen.queryByTestId('resolved-address')).not.toBeInTheDocument()
  })
})

describe('when user inputs a name', () => {
  describe('and the name resolves correctly to an address', () => {
    beforeEach(async () => {
      resolveNameMock = jest.fn().mockResolvedValue(address)
      screen = renderAddressField({
        resolveName: resolveNameMock,
        placeholder: 'test address'
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

    it('should show resolved address', () => {
      expect(screen.queryByTestId('resolved-address')).toBeInTheDocument()
    })

    it('should show cropped address', () => {
      expect(screen.queryByText(shorten(address))).toBeInTheDocument()
    })
  })

  describe("and the name doesn't resolve to an address", () => {
    beforeEach(async () => {
      resolveNameMock = jest.fn().mockResolvedValue(undefined)
      screen = renderAddressField({
        resolveName: resolveNameMock,
        placeholder: 'test address'
      })
      const addressInput = screen.getByPlaceholderText('test address')
      userEvent.type(addressInput, name)
    })

    it('should keep the name as the input value', () => {
      expect(screen.getByPlaceholderText('test address')).toHaveValue(name)
    })

    it('should show an error', async () => {
      await waitFor(() =>
        expect(screen.getByText('This is not a valid name or address')).toBeInTheDocument()
      )
    })
  })
})
