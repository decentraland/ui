import React from 'react'
import {
  act,
  fireEvent,
  RenderResult,
  render,
  waitFor
} from '@testing-library/react'
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
    const user = userEvent.setup({ delay: null })
    resolveNameMock = jest.fn()
    onChangeMock = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      placeholder: 'test address',
      onChange: onChangeMock
    })
    const addressInput = screen.getByPlaceholderText('test address')
    await user.type(addressInput, address)
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
      const user = userEvent.setup({ delay: null })
      resolveNameMock = jest.fn().mockResolvedValue(address)
      onChangeMock = jest.fn()
      screen = renderAddressField({
        resolveName: resolveNameMock,
        placeholder: 'test address',
        onChange: onChangeMock
      })
      const addressInput = screen.getByPlaceholderText('test address')
      await user.type(addressInput, name)
      await waitFor(
        () => expect(screen.getByTestId('check-icon')).toBeInTheDocument(),
        { timeout: 3000 }
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
      const user = userEvent.setup({ delay: null })
      resolveNameMock = jest.fn().mockResolvedValue(undefined)
      onChangeMock = jest.fn()
      screen = renderAddressField({
        resolveName: resolveNameMock,
        placeholder: 'test address',
        onChange: onChangeMock
      })
      const addressInput = screen.getByPlaceholderText('test address')
      await user.type(addressInput, name)
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
    const user = userEvent.setup({ delay: null })
    resolveNameMock = jest.fn().mockRejectedValue(new Error('Some ERROR'))
    onChangeMock = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      placeholder: 'test address',
      onChange: onChangeMock
    })
    const addressInput = screen.getByPlaceholderText('test address')
    await user.type(addressInput, name)
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

describe('when an input event supersedes a pending lookup', () => {
  let finishFirst: (value: string) => void
  let firstLookup: Promise<string>
  let user: ReturnType<typeof userEvent.setup>
  let input: HTMLElement
  let latestAddress: string

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    latestAddress = '0x000000000000000000000000000000000000000b'
    firstLookup = new Promise((resolve) => {
      finishFirst = resolve
    })
    resolveNameMock = jest
      .fn()
      .mockReturnValueOnce(firstLookup)
      .mockResolvedValueOnce(latestAddress)
    onChangeMock = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      onChange: onChangeMock,
      'aria-label': 'Recipient'
    })
    input = screen.getByRole('textbox')
    await user.type(input, 'alice.eth')
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    // The input is disabled while loading, but stale/programmatic events must also be safe.
    fireEvent.change(input, { target: { value: 'bob.eth' } })
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    await act(async () => {
      finishFirst('0x000000000000000000000000000000000000000a')
      await firstLookup
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should display the latest name', () => {
    expect(input).toHaveValue('bob.eth')
  })

  it('should only emit the address from the latest lookup', () => {
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ value: latestAddress })
    )
  })
})

describe('when the field unmounts during resolution', () => {
  let finish: (value: string) => void
  let lookup: Promise<string>
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    lookup = new Promise((resolve) => {
      finish = resolve
    })
    resolveNameMock = jest.fn().mockReturnValueOnce(lookup)
    onChangeMock = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      onChange: onChangeMock
    })
    await user.type(screen.getByRole('textbox'), 'alice.eth')
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    screen.unmount()
    await act(async () => {
      finish(address)
      await lookup
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should not emit a recipient after unmounting', () => {
    expect(onChangeMock).not.toHaveBeenCalled()
  })
})
