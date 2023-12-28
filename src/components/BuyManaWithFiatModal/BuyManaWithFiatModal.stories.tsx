import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Network } from '@dcl/schemas'
import { BuyManaWithFiatModal } from '../BuyManaWithFiatModal/BuyManaWithFiatModal'
import { Header } from '../Header/Header'
import { FeedbackModal, TransactionStatus } from './FeedbackModal'
import { NetworkGatewayType } from './Network'
import './BuyManaWithFiatModal.stories.css'

const lipsum = (
  <>
    <Header>Lorem Ipsum</Header>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in
      tincidunt lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed ornare rutrum lorem vehicula finibus. Donec vitae lorem consequat,
      suscipit nibh sit amet, euismod nunc. Sed gravida faucibus nulla vitae
      luctus. Aliquam libero lacus, faucibus ac neque ut, hendrerit pulvinar
      quam. Nunc porta porttitor nulla et dignissim. Aenean lobortis libero
      aliquet dolor pulvinar dapibus. Sed tristique scelerisque nulla, in
      feugiat neque lacinia in. Cras vulputate turpis in orci interdum accumsan.
    </p>
    <p>
      Phasellus sit amet eleifend sapien, vel commodo nibh. Morbi mi lectus,
      vulputate eget turpis nec, aliquam efficitur lacus. Morbi gravida nisi et
      purus facilisis, at molestie neque vulputate. Sed in nulla mollis justo
      aliquam egestas. Aliquam gravida porta augue, et lobortis ante tincidunt
      ut. Nam varius lorem suscipit dolor malesuada finibus. Quisque ullamcorper
      purus ut tincidunt vehicula. Sed hendrerit porttitor lacinia. Fusce eget
      arcu augue. Quisque ullamcorper imperdiet libero, sed interdum augue
      congue eu. Fusce finibus scelerisque odio, id facilisis ante sagittis sit
      amet. Nulla vulputate lobortis tellus in dapibus. Suspendisse non tempus
      nulla. Nulla egestas malesuada interdum. Aliquam malesuada placerat nisl
      nec ultrices.
    </p>
    <p>
      Duis a viverra ipsum, in pellentesque est. Nullam interdum vehicula massa
      sed porttitor. Ut condimentum lacinia iaculis. Pellentesque porta euismod
      nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
      vitae mattis ipsum, a bibendum nisi. Sed nec ante ultricies, pretium nulla
      sit amet, congue sem. Nulla at sodales enim. Nam a dignissim tortor.
      Quisque feugiat est nec tortor eleifend ornare nec vel velit. Praesent
      rhoncus nisl ut convallis posuere. Nam sollicitudin eros sem, a
      consectetur sem interdum non. Phasellus ac dolor eget lacus feugiat
      ullamcorper.
    </p>
  </>
)

storiesOf('BuyManaWithFiatModal', module)
  .add('BuyManaWithFiat options with default values', () => (
    <div className="BuyManaWithFiatModal-story">
      {lipsum}
      <BuyManaWithFiatModal
        open
        networks={[
          {
            type: Network.MATIC,
            gateways: [
              {
                type: NetworkGatewayType.TRANSAK,
                learnMoreLink: 'https://transak.com/',
                onContinue: () => undefined
              }
            ]
          },
          {
            type: Network.ETHEREUM,
            gateways: [
              {
                type: NetworkGatewayType.MOON_PAY,
                onContinue: () => undefined
              },
              {
                type: NetworkGatewayType.TRANSAK,
                onContinue: () => undefined
              }
            ]
          }
        ]}
        onClose={() => undefined}
        onInfo={() => undefined}
      />
    </div>
  ))
  .add('BuyManaWithFiat options with custom texts', () => (
    <div className="BuyManaWithFiatModal-story">
      {lipsum}
      <BuyManaWithFiatModal
        open
        i18n={{
          title: 'Title of the modal',
          subtitle: 'Subtitle of the modal',
          error: 'Could not render the modal'
        }}
        networks={[
          {
            type: Network.MATIC,
            i18n: {
              cta: 'Call to action',
              ctaSubtitle: 'The subtitle of the CTA',
              title: 'Title of the network',
              error: 'Could not render the network'
            },
            message: 'This is a custom message',
            gateways: [
              {
                type: NetworkGatewayType.TRANSAK,
                i18n: {
                  title: 'Title of the gateway',
                  subtitle: 'Subtitle of the gateway',
                  continueButtonText: 'Continue with gateway',
                  learnMoreText: 'Learn more about the gateway'
                },
                onContinue: () => undefined
              }
            ]
          },
          {
            type: Network.ETHEREUM,
            gateways: [
              {
                type: NetworkGatewayType.MOON_PAY,
                onContinue: () => undefined
              },
              {
                type: NetworkGatewayType.TRANSAK,
                onContinue: () => undefined
              }
            ]
          }
        ]}
        onClose={() => undefined}
        onInfo={() => undefined}
      />
    </div>
  ))
  .add(
    'BuyManaWithFiat with Polygon already selected and only one gateway',
    () => (
      <div className="BuyManaWithFiatModal-story">
        {lipsum}
        <BuyManaWithFiatModal
          open
          networks={[
            {
              type: Network.MATIC,
              gateways: [
                {
                  type: NetworkGatewayType.TRANSAK,
                  learnMoreLink: 'https://transak.com/',
                  onContinue: () => undefined
                }
              ]
            }
          ]}
          onClose={() => undefined}
          onInfo={() => undefined}
        />
      </div>
    )
  )
  .add('BuyManaWithFiat with Ethereum already selected', () => (
    <div className="BuyManaWithFiatModal-story">
      {lipsum}
      <BuyManaWithFiatModal
        open
        networks={[
          {
            type: Network.ETHEREUM,
            gateways: [
              {
                type: NetworkGatewayType.MOON_PAY,
                learnMoreLink: 'https://moonpay.com/',
                onContinue: () => undefined
              },
              {
                type: NetworkGatewayType.TRANSAK,
                learnMoreLink: 'https://transak.com/',
                onContinue: () => undefined
              }
            ]
          }
        ]}
        onClose={() => undefined}
        onInfo={() => undefined}
      />
    </div>
  ))
  .add(
    'BuyManaWithFiat success modal without link to transaction explorer',
    () => (
      <div className="BuyManaWithFiatModal-story">
        {lipsum}
        <FeedbackModal
          open
          status={TransactionStatus.SUCCESS}
          onClose={() => undefined}
          onInfo={() => undefined}
        />
      </div>
    )
  )
  .add(
    'BuyManaWithFiat success modal with link to transaction explorer',
    () => (
      <div className="BuyManaWithFiatModal-story">
        {lipsum}
        <FeedbackModal
          open
          status={TransactionStatus.SUCCESS}
          transactionUrl="https://goerli.etherscan.io/tx/0xb4a0b25c6e9ef69ba4f643a40bba2e1ec220a68c7404bfb705ba04d34b52acfaa"
          onClose={() => undefined}
          onInfo={() => undefined}
        />
      </div>
    )
  )
  .add('BuyManaWithFiat pending tx in Moon Pay', () => (
    <div className="BuyManaWithFiatModal-story">
      {lipsum}
      <FeedbackModal
        open
        status={TransactionStatus.PENDING}
        goToUrl="https://buy-sandbox.moonpay.com/transaction_receipt?transactionId=0a1cbb99-1b3c-4106-9d88-318ef2201123"
        i18n={{
          title: 'Buy Ethereum MANA',
          statusTitle: 'The transaction is processing',
          description:
            'Wait a few minutes while the transaction is being processed',
          goToText: 'Go to MoonPay tab'
        }}
        selectedNetwork={Network.ETHEREUM}
        selectedGateway={NetworkGatewayType.MOON_PAY}
        onClose={() => undefined}
        onInfo={() => undefined}
      />
    </div>
  ))
  .add('BuyManaWithFiat tx failed in Moon Pay', () => (
    <div className="BuyManaWithFiatModal-story">
      {lipsum}
      <FeedbackModal
        open
        status={TransactionStatus.FAILURE}
        goToUrl="https://buy-sandbox.moonpay.com/transaction_receipt?transactionId=0a1cbb99-1b3c-4106-9d88-318ef2201123"
        i18n={{
          title: 'Buy Ethereum MANA',
          statusTitle: 'The transaction failed',
          description:
            'You can try again with Moon Pay or select other provider',
          goToText: 'Go to MoonPay tab',
          cta: 'Try again',
          secondaryCta: 'Select other provider'
        }}
        selectedNetwork={Network.ETHEREUM}
        selectedGateway={NetworkGatewayType.MOON_PAY}
        onClose={() => undefined}
        onInfo={() => undefined}
        onClickCta={() => undefined}
        onClickSecondaryCta={() => undefined}
      />
    </div>
  ))
  .add('BuyManaWithFiat persisent message', () => (
    <div className="BuyManaWithFiatModal-story">
      {lipsum}
      <BuyManaWithFiatModal
        open
        message="This is a custom persistent message"
        onClose={() => undefined}
        onInfo={() => undefined}
        networks={[
          { type: Network.MATIC, gateways: [] },
          { type: Network.ETHEREUM, gateways: [] }
        ]}
      />
    </div>
  ))
  .add('BuyManaWithFiat error', () => (
    <div className="BuyManaWithFiatModal-story">
      {lipsum}
      <BuyManaWithFiatModal
        open
        hasError
        onClose={() => undefined}
        onInfo={() => undefined}
        networks={[
          { type: Network.MATIC, gateways: [] },
          { type: Network.ETHEREUM, gateways: [] }
        ]}
      />
    </div>
  ))
  .add('Loading', () => (
    <div className="BuyManaWithFiatModal-story">
      {lipsum}
      <BuyManaWithFiatModal
        open
        loading
        onClose={() => undefined}
        onInfo={() => undefined}
        networks={[
          { type: Network.MATIC, gateways: [] },
          { type: Network.ETHEREUM, gateways: [] }
        ]}
      />
    </div>
  ))
  .add('Full example', () => (
    <div className="BuyManaWithFiatModal-story">
      {lipsum}
      <BuyManaWithFiatModal
        open
        message="This is a custom persistent message"
        hasError
        loading
        onClose={() => undefined}
        onInfo={() => undefined}
        networks={[
          { type: Network.MATIC, gateways: [] },
          { type: Network.ETHEREUM, gateways: [] }
        ]}
      />
    </div>
  ))
