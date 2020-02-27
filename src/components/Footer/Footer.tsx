import * as React from 'react'
import { Container } from '../Container/Container'
import { LanguageDropdownI18N, LanguageDropdownProps, LanguageDropdown } from '../LanguageDropdown/LanguageDropdown'
import { Locale } from '../Language/Language'
import './Footer.css'

export type LinksI18N = {
  home: React.ReactNode
  privacy: React.ReactNode
  terms: React.ReactNode
  content: React.ReactNode
  ethics: React.ReactNode
}

export type FooterI18N = {
  dropdown: LanguageDropdownI18N
  links: LinksI18N
}

export type FooterProps = {
  locale?: Locale
  locales?: Locale[]
  i18n?: FooterI18N
  onChange?: LanguageDropdownProps['onChange']
  isFullscreen?: boolean
  className?: string
}

export class Footer extends React.PureComponent<FooterProps> {
  static defaultProps: Partial<FooterProps> = {
    i18n: {
      dropdown: {
        en: 'English',
        es: 'Spanish',
        fr: 'French',
        ja: 'Japanese',
        zh: 'Chinese',
        ko: 'Korean'
      },
      links: {
        home: 'Home',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        content: 'Content Policy',
        ethics: 'Code of Ethics'
      }
    }
  }

  render() {
    const {
      locale,
      locales,
      onChange,
      i18n,
      isFullscreen,
      className
    } = this.props

    let classes = 'dcl footer'
    if (isFullscreen) {
      classes += ' fullscreen'
    }
    if (className) {
      classes += ' ' + className
    }

    return (
      <Container className={classes}>
        <div className="main-footer">
          <LanguageDropdown
            locale={locale}
            locales={locales}
            onChange={onChange}
            upward
            direction="right"
            i18n={i18n.dropdown}
          />
          <div className="links">
            <a href="https://decentraland.org">{i18n.links.home}</a>
            <a href="https://decentraland.org/privacy">{i18n.links.privacy}</a>
            <a href="https://decentraland.org/terms">{i18n.links.terms}</a>
            <a href="https://decentraland.org/content">{i18n.links.content}</a>
            <a href="https://decentraland.org/ethics">{i18n.links.ethics}</a>
          </div>
        </div>
        <div className="secondary-footer">
          <div className="social-links">
            <a href="https://dcl.gg/discord">
              <i className="social-icon discord" />
            </a>
            <a href="https://reddit.com/r/decentraland">
              <i className="social-icon reddit" />
            </a>
            <a href="https://github.com/decentraland">
              <i className="social-icon github" />
            </a>
            <a href="https://twitter.com/decentraland">
              <i className="social-icon twitter" />
            </a>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} Decentraland
          </div>
        </div>
      </Container>
    )
  }
}
