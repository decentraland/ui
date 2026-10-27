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

describe('when the resolver changes during a lookup', () => {
  let finishFirst: (value: string) => void
  let rejectFirst: (error: Error) => void
  let finishLatest: (value: string) => void
  let firstLookup: Promise<string>
  let latestLookup: Promise<string>
  let latestResolver: jest.Mock
  let latestAddress: string
  let input: HTMLElement
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    latestAddress = '0x000000000000000000000000000000000000000b'
    firstLookup = new Promise((resolve, reject) => {
      finishFirst = resolve
      rejectFirst = reject
    })
    latestLookup = new Promise((resolve) => {
      finishLatest = resolve
    })
    resolveNameMock = jest.fn().mockReturnValueOnce(firstLookup)
    latestResolver = jest.fn().mockReturnValueOnce(latestLookup)
    onChangeMock = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      onChange: onChangeMock
    })
    input = screen.getByRole('textbox')
    await user.type(input, 'alice.eth')
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    screen.rerender(
      <AddressField resolveName={latestResolver} onChange={onChangeMock} />
    )
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should immediately restart resolution of the current input', () => {
    expect(latestResolver).toHaveBeenCalledWith('alice.eth')
  })

  describe('and the obsolete lookup finishes first', () => {
    beforeEach(async () => {
      await act(async () => {
        finishFirst(address)
        await firstLookup
      })
    })

    it('should not publish the obsolete result', () => {
      expect(onChangeMock).not.toHaveBeenCalled()
    })

    it('should remain disabled while the current lookup is pending', () => {
      expect(input).toBeDisabled()
    })

    describe('and the current lookup finishes', () => {
      beforeEach(async () => {
        await act(async () => {
          finishLatest(latestAddress)
          await latestLookup
        })
      })

      it('should publish the current result and enable the field', () => {
        expect(onChangeMock).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({ value: latestAddress })
        )
        expect(input).not.toBeDisabled()
      })
    })
  })

  describe('and the obsolete lookup rejects after the current one finishes', () => {
    beforeEach(async () => {
      await act(async () => {
        finishLatest(latestAddress)
        await latestLookup
      })
      await act(async () => {
        rejectFirst(new Error('Old resolver failed'))
        await firstLookup.catch(() => undefined)
      })
    })

    it('should retain the successful result without emitting an error', () => {
      expect(onChangeMock).toHaveBeenCalledTimes(1)
      expect(onChangeMock).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ value: latestAddress, error: undefined })
      )
      expect(input).not.toBeDisabled()
    })
  })
})

describe('when only the onChange callback changes during resolution', () => {
  let finish: (value: string) => void
  let lookup: Promise<string>
  let latestOnChange: jest.Mock
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    lookup = new Promise((resolve) => {
      finish = resolve
    })
    resolveNameMock = jest.fn().mockReturnValueOnce(lookup)
    onChangeMock = jest.fn()
    latestOnChange = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      onChange: onChangeMock
    })
    await user.type(screen.getByRole('textbox'), 'alice.eth')
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    screen.rerender(
      <AddressField resolveName={resolveNameMock} onChange={latestOnChange} />
    )
    await act(async () => {
      finish(address)
      await lookup
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should notify the latest callback without restarting the lookup', () => {
    expect(latestOnChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ value: address })
    )
    expect(onChangeMock).not.toHaveBeenCalled()
    expect(resolveNameMock).toHaveBeenCalledTimes(1)
  })
})

describe('when the resolver changes before the debounce finishes', () => {
  let latestResolver: jest.Mock
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    resolveNameMock = jest.fn()
    latestResolver = jest.fn().mockResolvedValueOnce(address)
    onChangeMock = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      onChange: onChangeMock
    })
    await user.type(screen.getByRole('textbox'), 'alice.eth')
    screen.rerender(
      <AddressField resolveName={latestResolver} onChange={onChangeMock} />
    )
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should only call the latest resolver', () => {
    expect(resolveNameMock).not.toHaveBeenCalled()
    expect(latestResolver).toHaveBeenCalledWith('alice.eth')
    expect(screen.getByRole('textbox')).not.toBeDisabled()
  })
})

describe.each([
  { inputValue: 'alice.eth', expectedResolverCalls: 1 },
  {
    inputValue: '0x89805E5f0698Cb4dB57f0E389f2a75259f78CC22',
    expectedResolverCalls: 0
  }
])(
  'when a parent passes an inline resolver for $inputValue',
  ({ inputValue, expectedResolverCalls }) => {
    let user: ReturnType<typeof userEvent.setup>
    let nextField: HTMLElement

    beforeEach(async () => {
      jest.useFakeTimers()
      user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
      resolveNameMock = jest.fn().mockResolvedValue(address)
      onChangeMock = jest.fn()

      function InlineResolverParent() {
        const [result, setResult] = React.useState({ value: '' })
        return (
          <>
            <AddressField
              resolveName={(name) => resolveNameMock(name)}
              onChange={(event, data) => {
                onChangeMock(event, data)
                // Always create a fresh object, as a controlled form does on each result.
                setResult({ value: data.value })
              }}
            />
            <output>{result.value}</output>
            <button>Next field</button>
          </>
        )
      }

      screen = render(<InlineResolverParent />)
      await user.type(screen.getByRole('textbox'), inputValue)
      await act(async () => {
        jest.advanceTimersByTime(800)
      })
      nextField = screen.getByRole('button', { name: 'Next field' })
      await user.click(nextField)
      for (let cycle = 0; cycle < 10; cycle++) {
        await act(async () => {
          jest.advanceTimersByTime(800)
        })
      }
    })

    afterEach(() => {
      jest.useRealTimers()
      jest.resetAllMocks()
    })

    it('should emit the completed result once without restarting', () => {
      expect(onChangeMock).toHaveBeenCalledTimes(1)
      expect(resolveNameMock).toHaveBeenCalledTimes(expectedResolverCalls)
    })

    it('should leave the field enabled and preserve focus on the next field', () => {
      expect(screen.getByRole('textbox')).not.toBeDisabled()
      expect(nextField).toHaveFocus()
    })
  }
)

describe.each(['alice.eth', '0x89805E5f0698Cb4dB57f0E389f2a75259f78CC22'])(
  'when a polling parent replaces the inline resolver every 500ms for %s',
  (inputValue) => {
    let user: ReturnType<typeof userEvent.setup>
    let latestResolver: jest.Mock

    beforeEach(async () => {
      jest.useFakeTimers()
      user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
      resolveNameMock = jest.fn().mockResolvedValue(address)
      latestResolver = jest.fn().mockResolvedValue(address)
      onChangeMock = jest.fn()
      function PollingParent() {
        const [tick, setTick] = React.useState(0)
        React.useEffect(() => {
          const interval = setInterval(() => setTick((value) => value + 1), 500)
          return () => clearInterval(interval)
        }, [])
        return (
          <AddressField
            resolveName={(name) =>
              (tick === 0 ? resolveNameMock : latestResolver)(name)
            }
            onChange={onChangeMock}
          />
        )
      }
      screen = render(<PollingParent />)
      await user.type(screen.getByRole('textbox'), inputValue)
      for (let cycle = 0; cycle < 100; cycle++) {
        await act(async () => {
          jest.advanceTimersByTime(100)
        })
      }
    })

    afterEach(() => {
      jest.useRealTimers()
      jest.resetAllMocks()
    })

    it('should complete once using the latest resolver without waiting for polling to stop', () => {
      expect(onChangeMock).toHaveBeenCalledTimes(1)
      expect(resolveNameMock).not.toHaveBeenCalled()
      expect(latestResolver).toHaveBeenCalledTimes(
        inputValue === 'alice.eth' ? 1 : 0
      )
      expect(screen.getByRole('textbox')).not.toBeDisabled()
    })
  }
)

describe.each(['success', 'rejection'])(
  'when a polling parent changes resolvers faster than a slow %s',
  (outcome) => {
    let user: ReturnType<typeof userEvent.setup>

    beforeEach(async () => {
      jest.useFakeTimers()
      user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
      resolveNameMock = jest.fn().mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            setTimeout(
              () =>
                outcome === 'success'
                  ? resolve(address)
                  : reject(new Error('Obsolete failure')),
              1000
            )
          })
      )
      onChangeMock = jest.fn()
      function PollingParent() {
        const [, setTick] = React.useState(0)
        React.useEffect(() => {
          const interval = setInterval(() => setTick((tick) => tick + 1), 500)
          return () => clearInterval(interval)
        }, [])
        return (
          <AddressField
            resolveName={(name) => resolveNameMock(name)}
            onChange={onChangeMock}
          />
        )
      }
      screen = render(<PollingParent />)
      await user.type(screen.getByRole('textbox'), 'alice.eth')
      for (let cycle = 0; cycle < 100; cycle++) {
        await act(async () => {
          jest.advanceTimersByTime(100)
        })
      }
    })

    afterEach(() => {
      jest.useRealTimers()
      jest.resetAllMocks()
    })

    it('should stop after one restart, report one error, and ignore both obsolete results', () => {
      expect(resolveNameMock).toHaveBeenCalledTimes(2)
      expect(onChangeMock).toHaveBeenCalledTimes(1)
      expect(onChangeMock).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          value: 'alice.eth',
          error: new Error(AddressFieldErrors.ERROR_RESOLVING_NAME)
        })
      )
      expect(screen.getByRole('textbox')).not.toBeDisabled()
      expect(screen.queryByTestId('resolved-address')).not.toBeInTheDocument()
    })

    describe('and the user changes the input', () => {
      beforeEach(async () => {
        resolveNameMock.mockResolvedValue(address)
        await user.type(screen.getByRole('textbox'), 'a')
        for (let cycle = 0; cycle < 10; cycle++) {
          await act(async () => {
            jest.advanceTimersByTime(100)
          })
        }
      })

      it('should allow resolution again', () => {
        expect(onChangeMock).toHaveBeenCalledTimes(2)
        expect(onChangeMock).toHaveBeenLastCalledWith(
          expect.anything(),
          expect.objectContaining({ value: address, error: undefined })
        )
        expect(screen.getByRole('textbox')).not.toBeDisabled()
      })
    })
  }
)
