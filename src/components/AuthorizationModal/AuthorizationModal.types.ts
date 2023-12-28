import { Step } from '../MultiStep/MultiStep.types'

export enum AuthorizationStepStatus {
  LOADING_INFO = 'loading_info',
  PENDING = 'pending',
  WAITING = 'waiting',
  PROCESSING = 'processing',
  ALLOWANCE_AMOUNT_ERROR = 'allowance_amount_error',
  ERROR = 'error',
  DONE = 'done'
}

export enum AuthorizationStepAction {
  REVOKE = 'revoke',
  GRANT = 'grant',
  CONFIRM = 'confirm'
}

export type AuthorizationStep = Step & {
  status: AuthorizationStepStatus
  actionType: AuthorizationStepAction
}

export type Props = {
  currentStep: number
  header: string
  steps: AuthorizationStep[]
  onClose: () => void
}
