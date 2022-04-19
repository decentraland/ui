import * as React from 'react'
import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import { Logo } from '../Logo/Logo'
import { Popup } from '../Popup/Popup'
import { AvatarFace } from '../AvatarFace/AvatarFace'
import { Blockie } from '../Blockie/Blockie'
import './Profile.css'

export type ProfileProps = {
  address: string
  avatar?: Avatar | null
  textOnly?: boolean
  imageOnly?: boolean
  hasPopup?: boolean
  inline?: boolean
  size?: 'normal' | 'large' | 'huge' | 'massive'
  isDecentraland?: boolean
}

export class Profile extends React.PureComponent<ProfileProps> {
  static defaultProps = {
    inline: true,
    size: 'normal'
  }

  render(): React.ReactNode {
    const {
      address,
      avatar,
      textOnly,
      imageOnly,
      hasPopup,
      inline,
      size,
      isDecentraland
    } = this.props
    const name = (avatar && avatar.name) || address.slice(0, 6)

    if (isDecentraland) {
      return (
        <span
          className={`Profile decentraland ${size} ${inline ? 'inline' : ''}`}
          title={address}
        >
          <Logo />
          {imageOnly ? null : <span className="name">Decentraland</span>}
        </span>
      )
    }

    if (textOnly) {
      return name
    } else {
      return (
        <Popup
          content={name}
          disabled={!hasPopup}
          position="top center"
          trigger={
            avatar ? (
              <span
                className={`Profile avatar ${size} ${inline ? 'inline' : ''}`}
                title={address}
              >
                <AvatarFace size="tiny" inline={inline} avatar={avatar} />
                {imageOnly ? null : <span className="name">{name}</span>}
              </span>
            ) : (
              <span
                className={`Profile blockie ${size} ${inline ? 'inline' : ''}`}
                title={address}
              >
                <Blockie
                  seed={address}
                  scale={
                    size === 'large'
                      ? 5
                      : size === 'huge'
                      ? 7
                      : size === 'massive'
                      ? 21
                      : 3
                  }
                />
                {imageOnly ? null : <span className="name">{name}</span>}
              </span>
            )
          }
        />
      )
    }
  }
}
