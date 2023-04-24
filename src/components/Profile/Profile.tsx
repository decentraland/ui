import * as React from 'react'
import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import { WrappedAsProps } from '../../types/as'
import { Logo } from '../Logo/Logo'
import { Popup } from '../Popup/Popup'
import { AvatarFace } from '../AvatarFace/AvatarFace'
import { Blockie } from '../Blockie/Blockie'
import './Profile.css'

export type ProfileProps<T extends React.ElementType = typeof React.Fragment> =
  {
    address: string
    avatar?: Avatar | null
    textOnly?: boolean
    imageOnly?: boolean
    hasPopup?: boolean
    inline?: boolean
    sliceAddressBy?: number
    size?: 'normal' | 'large' | 'huge' | 'massive'
    isDecentraland?: boolean
  } & WrappedAsProps<T>

export class Profile<T extends React.ElementType> extends React.PureComponent<
  ProfileProps<T>
> {
  static defaultProps = {
    inline: true,
    sliceAddressBy: 6,
    size: 'normal',
    as: React.Fragment
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
      sliceAddressBy,
      isDecentraland,
      as,
      ...rest
    } = this.props

    const sliceLimit = Math.max(Math.min(sliceAddressBy, 42), 6)
    const name = (avatar && avatar.name) || address.slice(0, sliceLimit)
    const Wrapper = as

    if (isDecentraland) {
      return (
        <span
          className={`Profile decentraland ${size} ${inline ? 'inline' : ''}`}
          title={address}
        >
          <Wrapper {...rest}>
            <Logo />
          </Wrapper>
          {imageOnly ? null : (
            <Wrapper {...rest}>
              <span className="name">Decentraland</span>
            </Wrapper>
          )}
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
                <Wrapper {...rest}>
                  <AvatarFace size="tiny" inline={inline} avatar={avatar} />
                </Wrapper>
                {imageOnly ? null : (
                  <Wrapper {...rest}>
                    <span className="name">{name}</span>
                  </Wrapper>
                )}
              </span>
            ) : (
              <span
                className={`Profile blockie ${size} ${inline ? 'inline' : ''}`}
                title={address}
              >
                <Wrapper {...rest}>
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
                    as={as}
                    {...rest}
                  />
                </Wrapper>
                {imageOnly ? null : (
                  <Wrapper {...rest}>
                    <span className="name">{name}</span>
                  </Wrapper>
                )}
              </span>
            )
          }
        />
      )
    }
  }
}
