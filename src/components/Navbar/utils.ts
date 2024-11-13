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
}

export const getExtraButton = async () => {
  try {
    const SPACE_ID = 'ea2ybdmmn1kv'
    const ENV = 'master'
    const ACCESS_TOKEN = '9dieh3AHS6uwb_YNMjxlO6FCibAFFJVdg2YzA5t6U-Y'
    const ENTRY_ID = '18g1DzIyBxvu0steSwKyQr'
    const CONTENTFUL_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENV}/entries/${ENTRY_ID}?access_token=${ACCESS_TOKEN}`
    const response = await fetch(CONTENTFUL_URL)
    const entry = await response.json()
    const button = entry.fields as NavbarExtraButton
    console.log('button', button)
    return button
  } catch (error) {
    console.error(error)
    return null
  }
}
