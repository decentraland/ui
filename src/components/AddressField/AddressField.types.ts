import { FieldProps } from '../Field/Field'

export type Props = FieldProps & {
  fieldClassName?: string
  i18n?: { errorMessage: string }
  resolveName: (address: string) => Promise<string | undefined>
}

export enum AddressFieldErrors {
  INVALID_ADDRESS_OR_NAME = 'Invalid address or name',
  ERROR_RESOLVING_NAME = 'Error resolving name'
}
