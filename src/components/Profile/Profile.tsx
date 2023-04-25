import * as React from 'react'
import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import { Logo } from '../Logo/Logo'
import { Popup } from '../Popup/Popup'
import { AvatarFace } from '../AvatarFace/AvatarFace'
import { Blockie } from '../Blockie/Blockie'
import './Profile.css'

type Props<T extends React.ElementType> = {
  address: string
  avatar?: Avatar | null
  textOnly?: boolean
  imageOnly?: boolean
  hasPopup?: boolean
  inline?: boolean
  sliceAddressBy?: number
  size?: 'normal' | 'large' | 'huge' | 'massive'
  isDecentraland?: boolean
  as?: T
}

export type ProfileProps<T extends React.ElementType> = Props<T> &
  Omit<React.ComponentPropsWithRef<T>, keyof Props<T>>

export const Profile = function <T extends React.ElementType>(
  props: ProfileProps<T>
) {
  const {
    address,
    avatar,
    textOnly,
    imageOnly,
    hasPopup,
    inline = true,
    size = 'normal',
    sliceAddressBy = 6,
    isDecentraland,
    as = React.Fragment,
    ...rest
  } = props

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
    return <>{name}</>
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
