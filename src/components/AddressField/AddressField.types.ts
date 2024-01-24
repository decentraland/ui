import { FieldProps } from '../Field/Field'

export type Props = FieldProps & {
  fieldClassName?: string
  i18n?: { errorMessage: string }
  resolveName: (address: string) => Promise<string | undefined>
}
