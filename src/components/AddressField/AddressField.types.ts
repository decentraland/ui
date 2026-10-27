import React from 'react'
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input'
import { FieldProps } from '../Field/Field'

export type AddressFieldChangeData = Omit<InputOnChangeData, 'error'> & {
  value: string
  error?: Error
}

export type Props = Omit<FieldProps, 'onChange'> & {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: AddressFieldChangeData
  ) => void
  fieldClassName?: string
  i18n?: { errorMessage: string }
  /** Keep stable (for example with useCallback). A changed resolver replaces an
   * in-flight lookup once per input. Another change before completion reports
   * ERROR_RESOLVING_NAME and re-enables the field instead of accepting stale data.
   */
  resolveName: (address: string) => Promise<string | undefined>
}

export enum AddressFieldErrors {
  INVALID_ADDRESS_OR_NAME = 'Invalid address or name',
  ERROR_RESOLVING_NAME = 'Error resolving name'
}
