import * as React from 'react'
import './LanguageDropdown.css'
import { Dropdown, LanguageIconProps, DropdownProps, Locale } from '../..'
import { LanguageIcon } from '../LanguageIcon/LanguageIcon'

export type LanguageDropdownI18N = {
  en: React.ReactNode
  es: React.ReactNode
  fr: React.ReactNode
  ja: React.ReactNode
  zh: React.ReactNode
  ko: React.ReactNode
}

export type LanguageDropdownProps = Partial<LanguageIconProps> & {
  locales?: Locale[]
  onChange?: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => void
  direction?: 'left' | 'right'
  upward?: boolean
  i18n?: LanguageDropdownI18N
}

export class LanguageDropdown extends React.PureComponent<
  LanguageDropdownProps
> {
  static defaultProps: Partial<LanguageDropdownProps> = {
    onChange: () => {},
    direction: 'left',
    upward: false,
    locales: ['en'],
    i18n: {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      ja: 'Japanese',
      zh: 'Chinese',
      ko: 'Korean'
    }
  }

  renderOption = (locale: Locale): any => {
    const { i18n } = this.props
    return <LanguageIcon locale={locale} label={i18n[locale]} />
  }

  render() {
    const { locale, locales, direction, upward, onChange } = this.props
    return (
      <Dropdown
        className="dcl language-dropdown"
        direction={direction}
        upward={upward}
        defaultValue="en"
        value={locale}
        options={locales.map(key => ({
          key,
          value: key,
          text: this.renderOption(key as Locale)
        }))}
        onChange={onChange}
      />
    )
  }
}
