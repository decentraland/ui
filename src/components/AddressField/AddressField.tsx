import React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input'
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup'
import { Field } from '../Field/Field'
import { shorten, isValid } from './utils'
import { AddressFieldErrors, Props } from './AddressField.types'
import './AddressField.css'

export default function AddressField(props: Props) {
  const {
    className,
    fieldClassName,
    i18n,
    resolveName,
    onChange,
    ...otherProps
  } = props
  const [inputValue, setInputValue] = useState(props.value || '')
  const [address, setAddress] = useState('')
  const timeout = useRef<NodeJS.Timeout>()
  const [valid, setValid] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current)
    }
  }, [])

  const handleChange = useCallback(
    (evt, data: InputOnChangeData) => {
      setInputValue(data.value)
      setValid(undefined)
      setAddress('')
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(async () => {
        let address = data.value
        let error = undefined

        if (isValid(data.value)) {
          setValid(true)
        } else {
          // If address is not valid try to resolve it as a name
          setLoading(true)
          try {
            const resolvedAddress = await resolveName(data.value)
            if (resolvedAddress) {
              setValid(true)
              setAddress(resolvedAddress)
              address = resolvedAddress
            } else {
              setValid(false)
              error = new Error(AddressFieldErrors.INVALID_ADDRESS_OR_NAME)
            }
          } catch (e) {
            error = new Error(AddressFieldErrors.ERROR_RESOLVING_NAME)
            setValid(false)
          }
          setLoading(false)
        }

        evt.target.focus()

        if (onChange) {
          onChange(evt, { ...data, value: address, error })
        }
      }, 800)
    },
    [onChange]
  )

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
