import * as React from 'react'
import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import './AvatarFace.css'

export type AvatarFaceProps = {
  avatar?: Avatar
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'responsive'
  inline?: boolean
}

export class AvatarFace extends React.PureComponent<AvatarFaceProps> {
  static defaultProps: Partial<AvatarFaceProps> = {
    size: 'medium'
  }

  render(): JSX.Element {
    const { avatar, size, inline } = this.props
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

    return <div className={classes.join(' ')}>{face}</div>
  }
}
