import * as React from 'react'
import { Avatar } from '../../types/avatar'
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

  render() {
    const { avatar, size, inline } = this.props
    const classes = ['dcl', 'avatar-face', size]
    let face
    if (avatar) {
      classes.push('avatar-color-' + avatar.ethAddress[2])
      face = <img src={avatar.avatar.snapshots.face} title={avatar.name || 'guest'} alt="" />
    } else {
      face = <div className="guest-face" />
    }
    if (inline) {
      classes.push('inline')
    }

    return <div className={classes.join(' ')}>{face}</div>
  }
}
