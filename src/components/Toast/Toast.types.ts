export enum ToastType {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export type Props = {
  type?: ToastType
  title: string | JSX.Element
  body: string | JSX.Element
  closable?: boolean
  timeout?: number
  onClose?: () => void
}
