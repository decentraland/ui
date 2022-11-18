import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Network } from '@dcl/schemas'
import { Header } from '../Header/Header'
import { BuyManaWithFiatModal } from '../BuyManaWithFiatModal/BuyManaWithFiatModal'
import { NetworkGatewayType } from './Network'
import './BuyManaWithFiatModal.stories.css'
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
  .addDecorator(centered)
  .add('BuyWithFiat options with default values', () => (
    <div className="BuyManaWithFiatModal-story">
      {lipsum}
      <BuyManaWithFiatModal
        open
        networks={[
          {
            type: Network.MATIC,
            gateways: [
              {
                type: NetworkGatewayType.MOON_PAY,
                disabled: true,
                onContinue: () => undefined
              },
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
  .add('BuyWithFiat options with custom texts', () => (
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
              },
              {
                type: NetworkGatewayType.MOON_PAY,
                disabled: true,
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
  .add('BuyWithFiat options with only one network', () => (
    <div className="BuyManaWithFiatModal-story">
      {lipsum}
      <BuyManaWithFiatModal
        open
        networks={[
          {
            type: Network.MATIC,
            gateways: [
              {
                type: NetworkGatewayType.MOON_PAY,
                disabled: true,
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
  .add('BuyWithFiat persisent message', () => (
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
  .add('BuyWithFiat error', () => (
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
