import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Locale } from '../Language/Language'
import { LanguageDropdown, LanguageDropdownProps } from './LanguageDropdown'

function renderLanguageDropdown(props: Partial<LanguageDropdownProps> = {}) {
  return render(
    <LanguageDropdown
      onChange={jest.fn()}
      locale="es"
      locales={['es', 'en', 'zh']}
      {...props}
    />
  )
}

it('should show locale as selected value', () => {
  const screen = renderLanguageDropdown({ locale: 'es' })
  expect(screen.getByRole('option', { name: 'Spanish' })).toBeChecked()
})

it('should show all locales as options with correct names', () => {
  const locales: Locale[] = ['es', 'en', 'zh']
  const i18nLocales = {
    es: 'Spanish lang',
    en: 'English lang',
    zh: 'Chinese lang',
    fr: 'French lang',
    ja: 'Japanese lang',
    ko: 'Korean lang'
  }
  const screen = renderLanguageDropdown({ locales, i18n: i18nLocales })
  locales.forEach((locale) => {
    expect(
      screen.getByRole('option', { name: i18nLocales[locale] })
    ).toBeInTheDocument()
  })
})

describe('when an option is selected from the dropdown', () => {
  it('should call onChange callback', async () => {
    const onChangeMock = jest.fn()
    const screen = renderLanguageDropdown({ onChange: onChangeMock })
    await userEvent.click(screen.getByRole('option', { name: 'English' }))
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ value: 'en' })
    )
  })
})
