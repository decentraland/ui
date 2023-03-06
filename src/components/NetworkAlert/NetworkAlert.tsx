import * as React from 'react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import { Button } from '../Button/Button'
import { Header } from '../Header/Header'
import { Props } from './NetworkAlert.types'
import './NetworkAlert.css'

export class NetworkAlert extends React.PureComponent<Props> {
  static defaultProps = {
    i18n: {
      title:
        'Your wallet is connected to a partially supported network (Polygon)',
      content: (
        <span>
          Switch to Ethereum Mainnet if you want to use all the features of this
          app. <a href="">Learn more</a>
        </span>
      ),
      action: 'Switch Network'
    }
  }

  render() {
    const { i18n, onSwitchNetwork } = this.props
    const { title, content, action } = i18n

    return (
      <div className="NetworkAlert" aria-live="polite">
        <div className="center">
          <div className="description">
            <Icon
              className="warning-icon"
              name="warning sign"
              size="big"
              color="yellow"
            />
            <div>
              <Header as="h4" className="title">
                {title}
              </Header>
              <p>{content}</p>
            </div>
          </div>
          <div className="action">
            <Button inverted onClick={onSwitchNetwork}>
              {action}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
