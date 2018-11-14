import * as React from 'react'
import './LanguageIcon.css'

export type Locale = 'en' | 'es' | 'fr' | 'ja' | 'zh' | 'ko'

export type LanguageIconProps = {
  locale: Locale
  label?: React.ReactNode
}

export class LanguageIcon extends React.PureComponent<LanguageIconProps> {
  renderIcon() {
    return <i className={`dcl language-icon ${this.props.locale}`} />
  }

  render() {
    return this.props.label ? (
      <div className="dcl language-icon-wrapper">
        {this.renderIcon()}
        <div className="language-icon-label">{this.props.label}</div>
      </div>
    ) : (
      this.renderIcon()
    )
  }
}
