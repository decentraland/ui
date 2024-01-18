import React from 'react'
import { CommunityBubbleProps } from './CommunityBubble.props'
import './CommunityBubble.css'
import classNames from 'classnames'

export const CommunityBubble = (props: CommunityBubbleProps) => {
  return (
    <a
      className={classNames('dui-community-bubble', props.className)}
      href="https://decentraland.org/discord"
      target="about:blank"
    >
      <i className="dui-community-bubble__icon" />
      <p className="dui-community-bubble__text">
        <span>{props.i18n?.title ?? 'Need Guidance?'}</span>
        <span className="dui-community-bubble__text--bold">
          {props.i18n?.subtitle ?? 'ASK THE COMMUNITY'}
        </span>
      </p>
    </a>
  )
}
