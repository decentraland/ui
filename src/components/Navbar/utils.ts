import { config } from '../../config'
import { NavbarPages } from './Navbar.types'

export const getNavbarPagesUrls = () => {
  return {
    [NavbarPages.MARKETPLACE]: config.get('MARKETPLACE_URL'),
    [NavbarPages.CREATE]: config.get('LANDING_CREATORS_URL'),
    [NavbarPages.EXPLORE]: config.get('EVENTS_URL'),
    [NavbarPages.LEARN]: config.get('DOCS_URL'),
    [NavbarPages.GOVERNANCE]: config.get('GOVERNANCE_URL')
  }
}

export type NavbarExtraButton = {
  text: string
  link: string
  visible: boolean
  textColor?: `#${string}`
  backgroundColor?: `#${string}`
  id?: string
  ttl: number
}

export type LocalStorageNavbarExtraButton = {
  button: NavbarExtraButton
  expiresAt: number
}

export const getExtraButton = async () => {
  const cachedExtraButton = localStorage.getItem('navbarExtraButton')
  if (cachedExtraButton) {
    try {
      const parsed = JSON.parse(
        cachedExtraButton
      ) as LocalStorageNavbarExtraButton
      if (parsed.expiresAt > Date.now()) {
        return parsed.button
      }
    } catch (error) {
      // error parsing cached data, ignore and fetch from Contentful
    }
  }
  try {
    const SPACE_ID = config.get('CONTENTFUL_SPACE_ID')
    const ENV = config.get('CONTENTFUL_ENV')
    const ACCESS_TOKEN = config.get('CONTENTFUL_NAVBAR_ACCESS_TOKEN')
    const ENTRY_ID = config.get('CONTENTFUL_NAVBAR_ENTRY_ID')
    const CONTENTFUL_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENV}/entries/${ENTRY_ID}?access_token=${ACCESS_TOKEN}`
    const response = await fetch(CONTENTFUL_URL)
    const entry = await response.json()
    const button = entry.fields as NavbarExtraButton
    localStorage.setItem(
      'navbarExtraButton',
      JSON.stringify({ button, expiresAt: Date.now() + button.ttl * 1000 })
    )
    return button
  } catch (error) {
    console.error(error)
    return null
  }
}
