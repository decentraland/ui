import React from 'react'
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input'
import { FieldProps } from '../Field/Field'

// Unlike Omit, key remapping preserves named properties on types with an index signature.
type Without<T, K extends PropertyKey> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

export type AddressFieldChangeData = Without<InputOnChangeData, 'error'> & {
  error?: Error
  /** True when a previously emitted recipient is invalidated; value is empty until resolution completes. */
  pending?: boolean
}

/**
 * The component emits AddressFieldChangeData. The legacy InputOnChangeData
 * signature is the default Props payload for source compatibility, including
 * inline callbacks. Its boolean error annotation does not describe runtime
 * errors. New handlers should use AddressFieldChangeData explicitly.
 * Bivariance permits the implementation to deliver the actual runtime payload.
 */
export type AddressFieldChangeHandler<
  D extends InputOnChangeData | AddressFieldChangeData = AddressFieldChangeData
> = {
  onChange(event: React.ChangeEvent<HTMLInputElement>, data: D): void
}['onChange']

export type Props<
  D extends InputOnChangeData | AddressFieldChangeData = InputOnChangeData
> = Without<FieldProps, 'onChange'> & {
  onChange?: AddressFieldChangeHandler<D>
  fieldClassName?: string
  i18n?: { errorMessage: string }
  /** Resolve a name. Inline callbacks are supported; use resolverKey to signal a change of resolver semantics. */
  resolveName: (address: string) => Promise<string | undefined>
  /** Change this key when the chain or resolver configuration changes to refresh the entered name.
   * A previously emitted recipient is invalidated with value: empty string and pending: true during refresh.
   */
  resolverKey?: string | number
}

export enum AddressFieldErrors {
  INVALID_ADDRESS_OR_NAME = 'Invalid address or name',
  ERROR_RESOLVING_NAME = 'Error resolving name'
}
