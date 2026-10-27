import React from 'react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import classNames from 'classnames'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input'
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup'
import { Field } from '../Field/Field'
import { shorten, isValid } from './utils'
import {
  AddressFieldChangeData,
  AddressFieldErrors,
  Props
} from './AddressField.types'
import './AddressField.css'

// Invalidate semantic resolver changes before paint, without a layout-effect warning during SSR.
const useResolverEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export default function AddressField<
  Data extends InputOnChangeData | AddressFieldChangeData = InputOnChangeData
>(props: Props<Data>) {
  const {
    className,
    fieldClassName,
    i18n,
    resolveName,
    resolverKey,
    onChange,
    ...otherProps
  } = props
  const [inputValue, setInputValue] = useState(props.value || '')
  const [address, setAddress] = useState('')
  const timeout = useRef<NodeJS.Timeout>()
  const requestId = useRef(0)
  const previousResolverKey = useRef(resolverKey)
  const resolveNameRef = useRef(resolveName)
  const lastChange = useRef<{
    event: React.ChangeEvent<HTMLInputElement>
    data: InputOnChangeData
  }>()
  const onChangeRef =
    useRef<Props<InputOnChangeData | AddressFieldChangeData>['onChange']>(
      onChange
    )
  const [valid, setValid] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>()

  const resolveInput = useCallback(
    async (
      evt: React.ChangeEvent<HTMLInputElement>,
      data: InputOnChangeData,
      focus = true
    ) => {
      const currentRequest = ++requestId.current
      let address = data.value
      let error: Error | undefined

      if (isValid(data.value)) {
        setValid(true)
      } else {
        // If address is not valid try to resolve it as a name
        setLoading(true)
        try {
          const resolvedAddress = await resolveNameRef.current(data.value)
          if (currentRequest !== requestId.current) return
          if (resolvedAddress) {
            setValid(true)
            setAddress(resolvedAddress)
            address = resolvedAddress
          } else {
            setValid(false)
            error = new Error(AddressFieldErrors.INVALID_ADDRESS_OR_NAME)
          }
        } catch (e) {
          if (currentRequest !== requestId.current) return
          error = new Error(AddressFieldErrors.ERROR_RESOLVING_NAME)
          setValid(false)
        }
        setLoading(false)
      }

      if (focus) evt.target.focus()

      if (onChangeRef.current) {
        onChangeRef.current(evt, { ...data, value: address, error })
      }
    },
    []
  )

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      lastChange.current = { event: evt, data }
      requestId.current++
      setLoading(false)
      setInputValue(data.value)
      setValid(undefined)
      setAddress('')
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        timeout.current = undefined
        void resolveInput(evt, data)
      }, 800)
    },
    [resolveInput]
  )

  useResolverEffect(() => {
    resolveNameRef.current = resolveName
    onChangeRef.current = onChange
    if (Object.is(previousResolverKey.current, resolverKey)) return
    previousResolverKey.current = resolverKey

    const change = lastChange.current
    if (!change || isValid(change.data.value)) return

    requestId.current++
    setAddress('')
    setValid(undefined)
    setLoading(false)
    // An existing debounce keeps its deadline and reads the latest resolver.
    // Otherwise refresh immediately, including previously settled ENS names.
    if (timeout.current === undefined) {
      void resolveInput(change.event, change.data, false)
    }
  }, [onChange, resolveInput, resolveName, resolverKey])

  useResolverEffect(() => {
    return () => {
      clearTimeout(timeout.current)
      requestId.current++
    }
  }, [])

  const additionalProps = valid
    ? {
        icon: (
          <Icon
            color="green"
            data-testid="check-icon"
            size="large"
            name="check circle"
          />
        )
      }
    : {}

  return (
    <div className={classNames('dui-address-field', className)}>
      {address && (
        <Popup
          position="top center"
          className="dui-address-field__address-popup"
          on="hover"
          content={address}
          trigger={
            <span
              data-testid="resolved-address"
              className="dui-address-field__address"
            >
              {shorten(address)}
            </span>
          }
        />
      )}
      <Field
        {...otherProps}
        type="text"
        placeholder={props.placeholder ?? 'Address or name'}
        value={inputValue || ''}
        message={
          (valid === false
            ? i18n?.errorMessage || 'This is not a valid name or address'
            : undefined) || props.message
        }
        error={valid === false || props.error}
        loading={props.loading || loading}
        disabled={props.disabled || loading}
        input={{ autoComplete: 'off', name: 'address', id: 'address' }}
        onChange={handleChange}
        className={classNames(fieldClassName, {
          'dui-address-field__input--with-address': !!address
        })}
        {...additionalProps}
      ></Field>
    </div>
  )
}
