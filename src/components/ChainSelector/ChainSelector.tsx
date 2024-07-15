import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button'
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent'
import classNames from 'classnames'
import { ChainId, getChainName } from '@dcl/schemas'
import { useTabletAndBelowMediaQuery } from '../Media'
import { Modal } from '../Modal/Modal'
import { ModalNavigation } from '../ModalNavigation/ModalNavigation'
import { ChainSelectorProps } from './ChainSelector.props'
import './ChainSelector.css'

const ChainNameIconMap = {
  [ChainId.ETHEREUM_MAINNET]: 'ethereum',
  [ChainId.ETHEREUM_SEPOLIA]: 'ethereum',
  [ChainId.MATIC_MAINNET]: 'polygon',
  [ChainId.MATIC_MUMBAI]: 'polygon',
  [ChainId.MATIC_AMOY]: 'polygon',
  [ChainId.ARBITRUM_MAINNET]: 'arbitrum',
  [ChainId.OPTIMISM_MAINNET]: 'optimism',
  [ChainId.FANTOM_MAINNET]: 'fantom',
  [ChainId.BSC_MAINNET]: 'bsc',
  [ChainId.AVALANCHE_MAINNET]: 'avalanche'
}

export const ChainSelector = (props: ChainSelectorProps) => {
  const { chains, selectedChain, chainBeingConfirmed, i18n, onSelectChain } =
    props

  const chainBeingConfirmedRef = useRef(chainBeingConfirmed)
  const isMobileOrTablet = useTabletAndBelowMediaQuery()

  // This effect is used to close the modal when the chain being confirmed changes
  useEffect(() => {
    if (selectedChain && selectedChain === chainBeingConfirmedRef.current) {
      chainBeingConfirmedRef.current = undefined
      setShowModal(false)
    }
  }, [selectedChain])

  const [showModal, setShowModal] = useState(false)

  const title: React.ReactNode = i18n?.title || 'Select Network'

  const onButtonClick = useCallback(() => {
    setShowModal(!showModal)
  }, [])

  const onSelectChainHandler = useCallback((chainId: ChainId) => {
    onSelectChain(chainId)
    chainBeingConfirmedRef.current = chainId
  }, [])

  return (
    <>
      <Button className="dui-chain-selector__button" onClick={onButtonClick}>
        <div
          className={classNames(
            'dui-chain-icon',
            ChainNameIconMap[selectedChain]
          )}
        />
        {!isMobileOrTablet
          ? selectedChain === ChainId.ETHEREUM_MAINNET
            ? 'Ethereum'
            : getChainName(selectedChain)
          : null}
      </Button>
      <Modal
        open={showModal}
        className="dui-chain-selector__modal"
        onClose={() => setShowModal(false)}
      >
        <ModalNavigation title={title} onClose={() => setShowModal(false)} />
        <ModalContent>
          <ul className="dui-chain-selector__list">
            {chains.map((chain) => {
              const chainName =
                chain === ChainId.ETHEREUM_MAINNET
                  ? 'Ethereum'
                  : getChainName(chain)
              return (
                <button
                  key={chain}
                  className={classNames('dui-chain-selector__element', {
                    'dui-chain-selector__element-selected':
                      chain === selectedChain
                  })}
                  onClick={() => onSelectChainHandler(chain)}
                >
                  <div
                    className={classNames(
                      'dui-chain-icon',
                      ChainNameIconMap[chain]
                    )}
                  />
                  {chainName}
                  {selectedChain === chain ? (
                    <>
                      <div className="selector__button-connected">
                        {i18n.connected}
                      </div>
                      <div className="selector__button-connected-circle" />
                    </>
                  ) : chainBeingConfirmed && chain === chainBeingConfirmed ? (
                    <>
                      <div className="selector__button-connected">
                        {i18n.confirmInWallet}
                      </div>
                      <div className="selector__button-confirm-circle" />
                    </>
                  ) : null}
                </button>
              )
            })}
          </ul>
        </ModalContent>
      </Modal>
    </>
  )
}
