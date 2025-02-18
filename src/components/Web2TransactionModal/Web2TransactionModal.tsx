import React from 'react'
import { ChainId, getChainName, Network } from '@dcl/schemas'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { ModalNavigation } from '../ModalNavigation/ModalNavigation'
import { Message } from '../Message/Message'
import './Web2TransactionModal.css'
import { getNetwork } from '@dcl/schemas/dist/dapps/chain-id'

export type Web2TransactionModalProps = {
  isBalanceEnough: boolean
  /* The transaction cost in ether */
  transactionCostAmount: string
  /* The user balance in ether */
  userBalanceAmount: string
  chainId: ChainId
  isOpen?: boolean
  onAccept: () => void
  onClose: () => void
  onReject: () => void
  i18n?: {
    title?: React.ReactNode
    description?: (networkName: React.ReactNode) => string
    gasExplanation?: React.ReactNode
    transactionCostTitle?: React.ReactNode
    userBalanceTitle?: React.ReactNode
    balanceNotEnoughTitle?: React.ReactNode
    balanceNotEnoughContent?: React.ReactNode
    accept?: React.ReactNode
    reject?: React.ReactNode
  }
}

export const Web2TransactionModal = (props: Web2TransactionModalProps) => {
  const {
    chainId,
    onAccept,
    onClose,
    onReject,
    i18n,
    isOpen,
    isBalanceEnough,
    transactionCostAmount,
    userBalanceAmount
  } = props

  // Build the internationalized strings
  const title = i18n?.title || 'Confirm Transaction'
  const description =
    i18n?.description ||
    ((networkName) => (
      <>
        You are about to perform a transaction on the <b>{networkName}</b>{' '}
        network.
      </>
    ))
  const gasExplanation = i18n?.gasExplanation || (
    <>
      Network transactions require gas, paid in the network's native currency.
      For more information about gas, click{' '}
      <a href="https://www.coinbase.com/es-la/learn/crypto-basics/what-are-gas-fees#:~:text=Gas%20fees%20are%20transaction%20costs,during%20periods%20of%20network%20congestion">
        here
      </a>
      .
    </>
  )
  const balanceNotEnoughTitle =
    i18n?.balanceNotEnoughTitle ?? 'Insufficient Balance'
  const balanceNotEnoughContent =
    i18n?.balanceNotEnoughContent ??
    'Your balance may be insufficient to cover this transaction. If the transaction cannot be completed, please add more of the necessary currency to your account and try again.'
  const transactionCostTitle =
    i18n?.transactionCostTitle ?? 'Estimated Gas Fee:'
  const userBalanceTitle = i18n?.userBalanceTitle ?? 'Your Balance:'
  const accept = i18n?.accept ?? 'Continue'
  const reject = i18n?.reject ?? 'Cancel'

  const networkName = getChainName(chainId)
  return (
    <Modal size="small" open={isOpen} onClose={onClose}>
      <ModalNavigation title={title} />
      <Modal.Content className="dcl web2-transaction-modal-content-container">
        <div className="dcl web2-transaction-modal-content">
          <p>{description(networkName)}</p>
          <p>{gasExplanation}</p>
          <div className="dcl web2-transaction-modal-content-transaction-cost">
            <div className="dcl web2-transaction-modal-content-transaction-cost-row">
              <div>{transactionCostTitle}</div>
              <div>
                {transactionCostAmount}{' '}
                {getNetwork(chainId) === Network.ETHEREUM ? 'ETH' : 'MATIC'}
              </div>
            </div>
            <div className="dcl web2-transaction-modal-content-transaction-cost-row">
              <div>{userBalanceTitle}</div>
              <div>
                {userBalanceAmount}{' '}
                {getNetwork(chainId) === Network.ETHEREUM ? 'ETH' : 'MATIC'}
              </div>
            </div>
          </div>
          {!isBalanceEnough && (
            <Message
              size="tiny"
              visible
              content={balanceNotEnoughContent}
              header={balanceNotEnoughTitle}
              warning
            />
          )}
        </div>
      </Modal.Content>
      <Modal.Actions className="dcl web2-transaction-modal-actions">
        <Button onClick={onReject}>{reject}</Button>
        <Button primary onClick={onAccept}>
          {accept}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
