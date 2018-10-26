import * as React from 'react'
import {
  Container,
  Locale,
  LanguageDropdown,
  LanguageDropdownI18N,
  LanguageDropdownProps
} from '../..'
import './Footer.css'

export type LinksI18N = {
  home: string
  privacyPolicy: string
  contentPolicy: string
  termsAndConditions: string
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
        privacyPolicy: 'Privacy Policy',
        contentPolicy: 'Content Policy',
        termsAndConditions: 'Terms & Conditions'
      }
    }
  }

  render() {
    const { locale, locales, onChange, i18n } = this.props

    return (
      <Container className="dcl footer">
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
            <a href="https://decentraland.org/privacy">
              {i18n.links.privacyPolicy}
            </a>
            <a href="https://decentraland.org/content">
              {i18n.links.contentPolicy}
            </a>
            <a href="https://decentraland.org/terms">
              {i18n.links.termsAndConditions}
            </a>
          </div>
        </div>
        <div className="social-links">
          <a href="https://discordapp.com/invite/9EcuFgC">
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
        <div className="copyright">© 2018 Decentraland</div>
      </Container>
    )
  }
}
