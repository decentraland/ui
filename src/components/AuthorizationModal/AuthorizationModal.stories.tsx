import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { AuthorizationModal } from './AuthorizationModal'
import { AuthorizationStep } from './AuthorizationModal.types'
import { AuthorizationStepStatus } from './AuthorizationModal.types'
import { AuthorizationStepAction } from './AuthorizationModal.types'

const steps: AuthorizationStep[] = [
  {
    title: 'Revoke',
    onActionClick: () => console.log('revoke'),
    message: (
      <span className="authorization-error">This is a big error message</span>
    ),
    status: AuthorizationStepStatus.ERROR,
    actionType: AuthorizationStepAction.REVOKE,
    action: 'Revoke'
  }
]

storiesOf('AuthorizationModal', module).add('Basic with error', () => (
  <AuthorizationModal
    header="Authorization action"
    currentStep={0}
    steps={steps}
    onClose={() => console.log('Close')}
  />
))
