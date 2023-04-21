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

class Name<T extends React.ElementType> extends React.PureComponent<
  WrappedAsProps<T>
> {
  static defaultProps = {
    as: React.Fragment
  }

  render() {
    const { as: Wrapper, children, ...rest } = this.props
    return (
      <Wrapper {...rest}>
        <span className="name">{children}</span>
      </Wrapper>
    )
  }
}

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

    if (isDecentraland) {
      const Wrapper = as
      return (
        <span
          className={`Profile decentraland ${size} ${inline ? 'inline' : ''}`}
          title={address}
        >
          <Wrapper {...rest}>
            <Logo />
          </Wrapper>
          {imageOnly ? null : (
            <Name as={as} {...rest}>
              Decentraland
            </Name>
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
                <AvatarFace
                  size="tiny"
                  inline={inline}
                  avatar={avatar}
                  as={as}
                  {...rest}
                />
                {imageOnly ? null : (
                  <Name as={as} {...rest}>
                    {name}
                  </Name>
                )}
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
                  as={as}
                  {...rest}
                />
                {imageOnly ? null : (
                  <Name as={as} {...rest}>
                    {name}
                  </Name>
                )}
              </span>
            )
          }
        />
      )
    }
  }
}
