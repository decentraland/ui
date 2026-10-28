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

type Deferred<T> = {
  promise: Promise<T>
  resolve: (value: T) => void
  reject: (error: Error) => void
}

function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void
  let reject!: (error: Error) => void
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise
    reject = rejectPromise
  })
  return { promise, resolve, reject }
}

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
    ;({ promise: firstLookup, resolve: finishFirst } = deferred<string>())
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
    ;({ promise: lookup, resolve: finish } = deferred<string>())
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
    ;({
      promise: firstLookup,
      resolve: finishFirst,
      reject: rejectFirst
    } = deferred<string>())
    ;({ promise: latestLookup, resolve: finishLatest } = deferred<string>())
    resolveNameMock = jest.fn().mockReturnValueOnce(firstLookup)
    latestResolver = jest.fn().mockReturnValueOnce(latestLookup)
    onChangeMock = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      resolverKey: 'mainnet',
      onChange: onChangeMock
    })
    input = screen.getByRole('textbox')
    await user.type(input, 'alice.eth')
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    screen.rerender(
      <AddressField
        resolveName={latestResolver}
        resolverKey="sepolia"
        onChange={onChangeMock}
      />
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
    ;({ promise: lookup, resolve: finish } = deferred<string>())
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
      resolverKey: 'mainnet',
      onChange: onChangeMock
    })
    await user.type(screen.getByRole('textbox'), 'alice.eth')
    screen.rerender(
      <AddressField
        resolveName={latestResolver}
        resolverKey="sepolia"
        onChange={onChangeMock}
      />
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
      for (let cycle = 0; cycle < 3; cycle++) {
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
      for (let cycle = 0; cycle < 25; cycle++) {
        await act(async () => {
          jest.advanceTimersByTime(100)
        })
      }
    })

    afterEach(() => {
      jest.useRealTimers()
      jest.resetAllMocks()
    })

    it('should resolve once using the latest callback captured when the debounce ends', () => {
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
      for (let cycle = 0; cycle < 25; cycle++) {
        await act(async () => {
          jest.advanceTimersByTime(100)
        })
      }
    })

    afterEach(() => {
      jest.useRealTimers()
      jest.resetAllMocks()
    })

    it('should settle once without restarting on ordinary parent renders', () => {
      expect(resolveNameMock).toHaveBeenCalledTimes(1)
      expect(onChangeMock).toHaveBeenCalledTimes(1)
      expect(onChangeMock).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          value: outcome === 'success' ? address : 'alice.eth',
          error:
            outcome === 'success'
              ? undefined
              : new Error(AddressFieldErrors.ERROR_RESOLVING_NAME)
        })
      )
      expect(screen.getByRole('textbox')).not.toBeDisabled()
      if (outcome === 'success') {
        expect(screen.getByTestId('resolved-address')).toBeInTheDocument()
      } else {
        expect(screen.queryByTestId('resolved-address')).not.toBeInTheDocument()
      }
    })
  }
)

describe('when a settled ENS name changes resolver context', () => {
  let user: ReturnType<typeof userEvent.setup>
  let latestLookup: Promise<string>
  let finishLatest: (value: string) => void
  let latestAddress: string
  let nextField: HTMLElement

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    latestAddress = '0x000000000000000000000000000000000000000b'
    ;({ promise: latestLookup, resolve: finishLatest } = deferred<string>())
    resolveNameMock = jest
      .fn()
      .mockResolvedValueOnce(address)
      .mockReturnValueOnce(latestLookup)
    onChangeMock = jest.fn()
    screen = render(
      <>
        <AddressField
          resolveName={resolveNameMock}
          resolverKey="mainnet"
          onChange={onChangeMock}
        />
        <button>Next field</button>
      </>
    )
    await user.type(screen.getByRole('textbox'), 'alice.eth')
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    nextField = screen.getByRole('button', { name: 'Next field' })
    await user.click(nextField)
    screen.rerender(
      <>
        <AddressField
          resolveName={resolveNameMock}
          resolverKey="sepolia"
          onChange={onChangeMock}
        />
        <button>Next field</button>
      </>
    )
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should discard the old display and refresh even with the same resolver callback', () => {
    expect(screen.queryByTestId('resolved-address')).not.toBeInTheDocument()
    expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(resolveNameMock).toHaveBeenCalledTimes(2)
    expect(onChangeMock).toHaveBeenCalledTimes(2)
  })

  describe('and the new context resolves', () => {
    beforeEach(async () => {
      await act(async () => {
        finishLatest(latestAddress)
        await latestLookup
      })
    })

    it('should publish the new result without stealing focus', () => {
      expect(onChangeMock).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ value: latestAddress, error: undefined })
      )
      expect(screen.getByRole('textbox')).not.toBeDisabled()
      expect(nextField).toHaveFocus()
    })
  })

  describe('and the context changes again before completion', () => {
    let newestLookup: Promise<string>
    let finishNewest: (value: string) => void
    let newestAddress: string

    beforeEach(async () => {
      newestAddress = '0x000000000000000000000000000000000000000c'
      ;({ promise: newestLookup, resolve: finishNewest } = deferred<string>())
      resolveNameMock.mockReturnValueOnce(newestLookup)
      screen.rerender(
        <AddressField
          resolveName={resolveNameMock}
          resolverKey="updated-configuration"
          onChange={onChangeMock}
        />
      )
      await act(async () => {
        finishLatest(latestAddress)
        await latestLookup
      })
      await act(async () => {
        finishNewest(newestAddress)
        await newestLookup
      })
    })

    it('should publish only the newest context instead of accepting the obsolete refresh', () => {
      expect(resolveNameMock).toHaveBeenCalledTimes(3)
      expect(onChangeMock).toHaveBeenCalledTimes(3)
      expect(onChangeMock).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ value: newestAddress, error: undefined })
      )
    })
  })

  describe('and the field unmounts during the refresh', () => {
    beforeEach(async () => {
      screen.unmount()
      await act(async () => {
        finishLatest(latestAddress)
        await latestLookup
      })
    })

    it('should not publish the refresh result', () => {
      expect(onChangeMock).toHaveBeenCalledTimes(2)
    })
  })
})

describe('when a direct address changes resolver context', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    resolveNameMock = jest.fn()
    onChangeMock = jest.fn()
    screen = renderAddressField({
      resolveName: resolveNameMock,
      resolverKey: 'mainnet',
      onChange: onChangeMock
    })
    await user.type(screen.getByRole('textbox'), address)
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    screen.rerender(
      <AddressField
        resolveName={resolveNameMock}
        resolverKey="sepolia"
        onChange={onChangeMock}
      />
    )
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should preserve the address without resolving or notifying again', () => {
    expect(resolveNameMock).not.toHaveBeenCalled()
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('textbox')).toHaveValue(address)
    expect(screen.getByRole('textbox')).not.toBeDisabled()
  })
})

describe('when the parent stores a previously resolved recipient', () => {
  let user: ReturnType<typeof userEvent.setup>
  let lookup: Deferred<string>
  let input: HTMLElement

  function Parent({ resolverKey = 'mainnet' }: { resolverKey?: string }) {
    const [recipient, setRecipient] = React.useState('')
    return (
      <>
        <AddressField
          resolveName={resolveNameMock}
          resolverKey={resolverKey}
          onChange={(event, data) => {
            onChangeMock(event, data)
            setRecipient(data.error ? '' : data.value)
          }}
        />
        <button disabled={!recipient}>Send</button>
      </>
    )
  }

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    lookup = deferred<string>()
    resolveNameMock = jest
      .fn()
      .mockResolvedValueOnce(address)
      .mockReturnValue(lookup.promise)
    onChangeMock = jest.fn()
    screen = render(<Parent />, { legacyRoot: true })
    input = screen.getByRole('textbox')
    await user.type(input, 'alice.eth')
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    expect(screen.getByRole('button', { name: 'Send' })).toBeEnabled()
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })

  describe('and the resolver key changes', () => {
    beforeEach(() => {
      screen.rerender(<Parent resolverKey="sepolia" />)
    })

    it('should immediately disable sending and publish an empty pending recipient', () => {
      expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled()
      expect(onChangeMock).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ value: '', pending: true, error: undefined })
      )
    })

    describe('and the browser moves focus off the disabled input', () => {
      let focus: jest.SpyInstance
      let nativeFocus: () => void

      beforeEach(async () => {
        input.blur()
        nativeFocus = input.focus.bind(input)
        focus = jest.spyOn(input, 'focus').mockImplementation(() => {
          // jsdom allows focusing disabled inputs; real browsers do not.
          expect(input).not.toBeDisabled()
          nativeFocus()
        })
        await act(async () => {
          lookup.resolve(address)
          await lookup.promise
        })
      })

      it('should restore focus only after the input has been enabled in the DOM', () => {
        expect(focus).toHaveBeenCalledTimes(1)
        expect(input).toHaveFocus()
        expect(screen.getByRole('button', { name: 'Send' })).toBeEnabled()
      })
    })

    describe('and the new lookup fails', () => {
      beforeEach(async () => {
        await act(async () => {
          lookup.reject(new Error('RPC offline'))
          await lookup.promise.catch(() => undefined)
        })
      })

      it('should keep sending disabled and finish the pending notification with an error', () => {
        expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled()
        expect(onChangeMock).toHaveBeenLastCalledWith(
          expect.anything(),
          expect.objectContaining({
            pending: false,
            error: new Error(AddressFieldErrors.ERROR_RESOLVING_NAME)
          })
        )
      })
    })
  })

  describe('and the user edits the name', () => {
    beforeEach(async () => {
      await user.type(input, 'new')
    })

    it('should invalidate once before the next debounce without publishing each keystroke', () => {
      expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled()
      expect(onChangeMock).toHaveBeenCalledTimes(2)
      expect(onChangeMock).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ value: '', pending: true })
      )
      expect(resolveNameMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('and the user clears the input', () => {
    beforeEach(async () => {
      await user.clear(input)
      screen.rerender(<Parent resolverKey="sepolia" />)
      await act(async () => {
        jest.advanceTimersByTime(800)
      })
    })

    it('should clear the parent immediately without resolving an empty input on a key change', () => {
      expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled()
      expect(onChangeMock).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ value: '', pending: false, error: undefined })
      )
      expect(resolveNameMock).toHaveBeenCalledTimes(1)
      expect(input).not.toBeDisabled()
      expect(
        screen.queryByText('This is not a valid name or address')
      ).not.toBeInTheDocument()
    })
  })
})

describe('when a recipient is prefilled before the first edit', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    resolveNameMock = jest.fn()
    onChangeMock = jest.fn()
    screen = renderAddressField({
      value: address,
      resolveName: resolveNameMock,
      onChange: onChangeMock
    })
    await user.type(screen.getByRole('textbox'), 'a')
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should invalidate the prefilled recipient immediately before validating the edit', () => {
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ value: '', pending: true })
    )
    expect(resolveNameMock).not.toHaveBeenCalled()
  })
})

describe.each(['disabled', 'loading'] as const)(
  'when the parent suppresses focus through %s during resolution',
  (externalProp) => {
    describe.each([
      { outcome: 'success', releaseEarly: false },
      { outcome: 'rejection', releaseEarly: false },
      { outcome: 'success', releaseEarly: true },
      { outcome: 'rejection', releaseEarly: true }
    ] as const)(
      'and the lookup ends with $outcome (external state removed before completion: $releaseEarly)',
      ({ outcome, releaseEarly }) => {
        let user: ReturnType<typeof userEvent.setup>
        let lookup: Deferred<string>
        let input: HTMLElement
        let focus: jest.SpyInstance

        beforeEach(async () => {
          jest.useFakeTimers()
          user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
          lookup = deferred<string>()
          resolveNameMock = jest.fn().mockReturnValueOnce(lookup.promise)
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
          // Model the browser moving focus to the body when the input is disabled.
          input.blur()
          focus = jest.spyOn(input, 'focus')
          screen.rerender(
            <AddressField
              resolveName={resolveNameMock}
              onChange={onChangeMock}
              {...{ [externalProp]: true }}
            />
          )
          if (releaseEarly) {
            screen.rerender(
              <AddressField
                resolveName={resolveNameMock}
                onChange={onChangeMock}
                {...{ [externalProp]: false }}
              />
            )
          }
          await act(async () => {
            if (outcome === 'success') lookup.resolve(address)
            else lookup.reject(new Error('Resolver unavailable'))
            await lookup.promise.catch(() => undefined)
          })
        })

        afterEach(() => {
          jest.useRealTimers()
          jest.restoreAllMocks()
          jest.resetAllMocks()
        })

        describe('and the parent has removed its external state', () => {
          beforeEach(() => {
            if (releaseEarly) return
            screen.rerender(
              <AddressField
                resolveName={resolveNameMock}
                onChange={onChangeMock}
                {...{ [externalProp]: false }}
              />
            )
          })

          it('should leave focus unchanged instead of restoring an obsolete focus request', () => {
            expect(focus).not.toHaveBeenCalled()
            expect(input).not.toHaveFocus()
            expect(input).not.toBeDisabled()
          })
        })
      }
    )
  }
)

describe.each(['alice.eth', '0x89805E5f0698Cb4dB57f0E389f2a75259f78CC22'])(
  'when the consumer blurs the input after resolving %s',
  (value) => {
    let user: ReturnType<typeof userEvent.setup>
    let input: HTMLInputElement
    let onChange: jest.Mock
    let resolveName: jest.Mock
    let result: RenderResult

    beforeEach(async () => {
      jest.useFakeTimers()
      user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
      resolveName = jest.fn().mockResolvedValue(address)
      onChange = jest.fn((event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.blur()
      })
      result = render(
        <AddressField resolveName={resolveName} onChange={onChange} />
      )
      input = result.getByRole('textbox') as HTMLInputElement
      await user.type(input, value)
      await act(async () => {
        jest.advanceTimersByTime(800)
      })
    })

    afterEach(() => {
      jest.useRealTimers()
      jest.resetAllMocks()
    })

    it('should respect the consumer blur after the result is committed', () => {
      expect(input).not.toHaveFocus()
    })

    it('should notify the consumer exactly once with the resolved address', () => {
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ value: address, pending: false })
      )
    })
  }
)

describe('when the browser drops focus during a pending lookup', () => {
  let user: ReturnType<typeof userEvent.setup>
  let lookup: Deferred<string>
  let input: HTMLInputElement
  let onChange: jest.Mock
  let result: RenderResult
  let enabledAtNotification: boolean
  let focusedAtNotification: boolean

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    lookup = deferred<string>()
    enabledAtNotification = false
    focusedAtNotification = false
    onChange = jest.fn((event: React.ChangeEvent<HTMLInputElement>) => {
      enabledAtNotification = !event.target.disabled
      focusedAtNotification = document.activeElement === event.target
      event.target.blur()
    })
    result = render(
      <AddressField resolveName={() => lookup.promise} onChange={onChange} />
    )
    input = result.getByRole('textbox') as HTMLInputElement
    await user.type(input, 'alice.eth')
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    // jsdom retains focus on disabled inputs, unlike the browser.
    input.blur()
    await act(async () => {
      lookup.resolve(address)
      await lookup.promise
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should restore the enabled input before notifying the consumer', () => {
    expect(enabledAtNotification).toBe(true)
    expect(focusedAtNotification).toBe(true)
  })

  it('should preserve the consumer blur through subsequent renders', () => {
    result.rerender(
      <AddressField resolveName={() => lookup.promise} onChange={onChange} />
    )
    expect(input).not.toHaveFocus()
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})

describe('when a completion callback throws', () => {
  let callbackError: Error
  let result: RenderResult
  let onChange: jest.Mock
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(async () => {
    jest.useFakeTimers()
    callbackError = new Error('Consumer failure')
    onChange = jest.fn(() => {
      throw callbackError
    })
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    result = render(
      <AddressField resolveName={jest.fn()} onChange={onChange} />
    )
    await user.type(result.getByRole('textbox'), address)
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should keep the field mounted and report the consumer error asynchronously', () => {
    expect(result.getByRole('textbox')).toBeEnabled()
    expect(() => jest.runOnlyPendingTimers()).toThrow(callbackError)
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})

describe('when a resolver throws synchronously during a context refresh', () => {
  let result: RenderResult
  let onChange: jest.Mock
  let resolver: jest.Mock
  let user: ReturnType<typeof userEvent.setup>
  let errorWasCommitted: boolean

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    errorWasCommitted = false
    resolver = jest
      .fn()
      .mockResolvedValueOnce(address)
      .mockImplementationOnce(() => {
        throw new Error('Synchronous resolver failure')
      })
    onChange = jest.fn((_event, data) => {
      if (data.error) {
        errorWasCommitted = !!result.queryByText(
          'This is not a valid name or address'
        )
      }
    })
    result = render(
      <AddressField
        resolveName={resolver}
        resolverKey="first"
        onChange={onChange}
      />
    )
    await user.type(result.getByRole('textbox'), 'alice.eth')
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    result.rerender(
      <AddressField
        resolveName={resolver}
        resolverKey="second"
        onChange={onChange}
      />
    )
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should commit the error display before notifying the consumer', () => {
    expect(errorWasCommitted).toBe(true)
    expect(onChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        error: new Error(AddressFieldErrors.ERROR_RESOLVING_NAME)
      })
    )
  })
})

describe('when a completed lookup is superseded before its result commits', () => {
  let result: RenderResult
  let lookup: Deferred<string>
  let nextLookup: Deferred<string>
  let resolver: jest.Mock
  let onChange: jest.Mock
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    lookup = deferred<string>()
    nextLookup = deferred<string>()
    resolver = jest
      .fn()
      .mockReturnValueOnce(lookup.promise)
      .mockReturnValueOnce(nextLookup.promise)
    onChange = jest.fn()
    result = render(
      <AddressField
        resolveName={resolver}
        resolverKey="first"
        onChange={onChange}
      />
    )
    await user.type(result.getByRole('textbox'), 'alice.eth')
    await act(async () => {
      jest.advanceTimersByTime(800)
    })
    await act(async () => {
      lookup.resolve(address)
      await lookup.promise
      result.rerender(
        <AddressField
          resolveName={resolver}
          resolverKey="second"
          onChange={onChange}
        />
      )
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('should not invalidate a recipient that was never published', () => {
    expect(onChange).not.toHaveBeenCalled()
    expect(resolver).toHaveBeenCalledTimes(2)
  })
})
