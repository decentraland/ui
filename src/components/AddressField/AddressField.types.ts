import { FieldProps } from '../Field/Field'

export type Props = FieldProps & {
  fieldClassName?: string
  i18n?: { errorMessage: string }
  /** Keep stable (for example with useCallback). A changed resolver replaces an
   * in-flight lookup; repeated changes faster than resolution can delay completion.
   */
  resolveName: (address: string) => Promise<string | undefined>
}

export enum AddressFieldErrors {
  INVALID_ADDRESS_OR_NAME = 'Invalid address or name',
  ERROR_RESOLVING_NAME = 'Error resolving name'
}
