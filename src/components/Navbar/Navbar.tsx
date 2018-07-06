import * as React from 'react'
import { Header, Icon, Menu, Responsive, Sidebar } from 'semantic-ui-react'
import { Blockie, Logo, Mana } from '../..'
import './Navbar.css'

type Props = {
  mana?: number
  address?: string
  logo?: React.ReactNode
  activePage?: React.ReactNode
  menuItems?: React.ReactNode
  connectingMenuItem?: React.ReactNode
  accountMenuItems?: React.ReactNode
  signInMenuItem?: React.ReactNode
  isConnected?: boolean
  isConnecting?: boolean
  isModal?: boolean
  onClickAccount?: () => void
  onClickLogo?: () => void
  onBack?: () => void
}

type State = {
  toggle: boolean
}

export class Navbar extends React.PureComponent<Props, State> {
  static defaultProps = {
    mana: null,
    address: null,
    logo: <Logo />,
    activePage: null,
    menuItems: null,
    accountMenuItems: null,
    connectingMenuItem: null,
    signInMenuItem: null,
    isConnected: true,
    isConnecting: false,
    isModal: false,
    onAccountClick: () => {},
    onClickLogo: () => {},
    onBack: () => {}
  }
  public state = {
    toggle: false
  }
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }
  handleToggle = event => {
    this.setState({ toggle: !this.state.toggle })
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }
  handleDocumentClick = () => {
    this.setState({ toggle: false })
  }
  renderModal() {
    const { onBack } = this.props
    return (
      <div className="dcl navbar" role="navigation">
        <div className="dcl navbar-logo">
          <span className="dcl navbar-back" onClick={onBack}>
            <Icon name="chevron left" />
          </span>
        </div>
      </div>
    )
  }
  render() {
    const {
      logo,
      mana,
      address,
      activePage,
      menuItems,
      accountMenuItems,
      connectingMenuItem,
      signInMenuItem,
      isConnected,
      isConnecting,
      isModal,
      onClickAccount,
      onClickLogo
    } = this.props

    if (isModal) {
      return this.renderModal()
    }

    const hasMenu = !!menuItems

    return (
      <div className="dcl navbar" role="navigation">
        <Responsive
          minWidth={hasMenu ? Responsive.onlyTablet.minWidth : null}
          className="dcl navbar-logo"
          onClick={onClickLogo}
        >
          {logo}
        </Responsive>
        {hasMenu ? (
          <div className="dcl navbar-menu">
            <Responsive
              as={Menu}
              secondary
              stackable
              minWidth={Responsive.onlyTablet.minWidth}
            >
              {menuItems}
            </Responsive>
            <Responsive
              {...Responsive.onlyMobile}
              className="dcl navbar-hamburger-wrapper"
              onClick={this.handleToggle}
            >
              <Icon name="content" size="large" className="dcl hamburger" />
              <Header size="small" className="dcl active-page">
                {activePage}
              </Header>
            </Responsive>
            <Responsive {...Responsive.onlyMobile}>
              <Sidebar
                as={Menu}
                animation="overlay"
                width="wide"
                visible={this.state.toggle}
                vertical
              >
                {menuItems}
              </Sidebar>
            </Responsive>
          </div>
        ) : null}
        <div className="dcl navbar-account">
          {isConnected ? (
            <>
              {accountMenuItems ? (
                <Responsive
                  as={Menu}
                  secondary
                  className="dcl navbar-account-menu"
                  minWidth={Responsive.onlyTablet.minWidth}
                >
                  {accountMenuItems}
                </Responsive>
              ) : null}
              <span className="dcl account-wrapper" onClick={onClickAccount}>
                {mana != null ? (
                  <Mana size="small">{mana.toLocaleString()}</Mana>
                ) : null}
                {address != null ? <Blockie seed={address} /> : null}
              </span>
            </>
          ) : isConnecting ? (
            <Menu secondary>{connectingMenuItem}</Menu>
          ) : (
            <Menu secondary>{signInMenuItem}</Menu>
          )}
        </div>
      </div>
    )
  }
}
