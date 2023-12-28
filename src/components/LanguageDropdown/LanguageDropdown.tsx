import * as React from 'react'
import { DropdownProps, Dropdown } from '../Dropdown/Dropdown'
import { LanguageIcon, LanguageIconProps } from '../LanguageIcon/LanguageIcon'
import { Locale } from '../Language/Language'
import './LanguageDropdown.css'

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

export class LanguageDropdown extends React.PureComponent<LanguageDropdownProps> {
  static defaultProps: Partial<LanguageDropdownProps> = {
    onChange: () => undefined,
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

  renderOption = (locale: Locale): JSX.Element => {
    const { i18n } = this.props
    return <LanguageIcon locale={locale} label={i18n[locale]} />
  }

  render(): JSX.Element {
    const { locale, locales, direction, upward, onChange } = this.props
    return (
      <Dropdown
        className="dcl language-dropdown"
        direction={direction}
        upward={upward}
        defaultValue={locale == null ? 'en' : undefined}
        value={locale}
        options={locales.map((key) => ({
          key,
          value: key,
          text: this.renderOption(key as Locale)
        }))}
        onChange={onChange}
      />
    )
  }
}
