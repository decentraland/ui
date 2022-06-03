import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Header } from '../Header/Header'
import { LoginModal, LoginModalOptionType } from '../LoginModal/LoginModal'
import './LoginModal.stories.css'

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

storiesOf('LoginModal', module)
  .addDecorator(centered)
  .add('Login options', () => (
    <div className="LoginModal-story">
      {lipsum}
      <LoginModal open onClose={() => undefined}>
        <LoginModal.Option type={LoginModalOptionType.METAMASK} />
        <LoginModal.Option type={LoginModalOptionType.DAPPER} />
        <LoginModal.Option type={LoginModalOptionType.COINBASE} />
        <LoginModal.Option type={LoginModalOptionType.SAMSUNG} />
        <LoginModal.Option type={LoginModalOptionType.FORTMATIC} />
        <LoginModal.Option type={LoginModalOptionType.WALLET_CONNECT} />
        <LoginModal.Option type={LoginModalOptionType.WALLET_LINK} />
      </LoginModal>
    </div>
  ))
  .add('Login persisent message', () => (
    <div className="LoginModal-story">
      {lipsum}
      <LoginModal
        open
        message="This is a custom persistent message"
        onClose={() => undefined}
      >
        <LoginModal.Option type={LoginModalOptionType.METAMASK} />
        <LoginModal.Option type={LoginModalOptionType.DAPPER} />
        <LoginModal.Option type={LoginModalOptionType.COINBASE} />
        <LoginModal.Option type={LoginModalOptionType.SAMSUNG} />
        <LoginModal.Option type={LoginModalOptionType.FORTMATIC} />
        <LoginModal.Option type={LoginModalOptionType.WALLET_CONNECT} />
        <LoginModal.Option type={LoginModalOptionType.WALLET_LINK} />
      </LoginModal>
    </div>
  ))
  .add('Login error', () => (
    <div className="LoginModal-story">
      {lipsum}
      <LoginModal open hasError onClose={() => undefined}>
        <LoginModal.Option type={LoginModalOptionType.METAMASK} />
        <LoginModal.Option type={LoginModalOptionType.DAPPER} />
        <LoginModal.Option type={LoginModalOptionType.COINBASE} />
        <LoginModal.Option type={LoginModalOptionType.SAMSUNG} />
        <LoginModal.Option type={LoginModalOptionType.FORTMATIC} />
        <LoginModal.Option type={LoginModalOptionType.WALLET_CONNECT} />
        <LoginModal.Option type={LoginModalOptionType.WALLET_LINK} />
      </LoginModal>
    </div>
  ))
  .add('Loading', () => (
    <div className="LoginModal-story">
      {lipsum}
      <LoginModal open loading onClose={() => undefined}>
        <LoginModal.Option type={LoginModalOptionType.METAMASK} />
        <LoginModal.Option type={LoginModalOptionType.DAPPER} />
        <LoginModal.Option type={LoginModalOptionType.SAMSUNG} />
        <LoginModal.Option type={LoginModalOptionType.FORTMATIC} />
        <LoginModal.Option type={LoginModalOptionType.WALLET_CONNECT} />
        <LoginModal.Option type={LoginModalOptionType.WALLET_LINK} />
      </LoginModal>
    </div>
  ))
  .add('Full example', () => (
    <div className="LoginModal-story">
      {lipsum}
      <LoginModal
        open
        message="This is a custom persistent message"
        hasError
        loading
        onClose={() => undefined}
      >
        <LoginModal.Option type={LoginModalOptionType.METAMASK} />
        <LoginModal.Option type={LoginModalOptionType.DAPPER} />
        <LoginModal.Option type={LoginModalOptionType.COINBASE} />
        <LoginModal.Option type={LoginModalOptionType.SAMSUNG} />
        <LoginModal.Option type={LoginModalOptionType.FORTMATIC} />
        <LoginModal.Option type={LoginModalOptionType.WALLET_CONNECT} />
        <LoginModal.Option type={LoginModalOptionType.WALLET_LINK} />
      </LoginModal>
    </div>
  ))
