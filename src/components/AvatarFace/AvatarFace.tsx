import * as React from 'react'
import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import './AvatarFace.css'
import { WrappedAsProps } from '../../types/as'

export type AvatarFaceProps<
  T extends React.ElementType = typeof React.Fragment
> = {
  avatar?: Avatar
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'responsive'
  inline?: boolean
} & WrappedAsProps<T>

export class AvatarFace<
  T extends React.ElementType
> extends React.PureComponent<AvatarFaceProps<T>> {
  static defaultProps: Partial<AvatarFaceProps> = {
    size: 'medium',
    as: React.Fragment
  }

  render(): JSX.Element {
    const { avatar, size, inline, as: Wrapper, ...rest } = this.props
    const classes = ['dcl', 'avatar-face', size]
    let face
    if (avatar) {
      face = <img src={avatar.avatar.snapshots.face256} alt="" />
    } else {
      face = <div className="guest-face" />
    }
    if (inline) {
      classes.push('inline')
    }

    return (
      <div className={classes.join(' ')}>
        <Wrapper {...rest}>{face}</Wrapper>
      </div>
    )
  }
}
