import { config } from '../../config'
import { NavbarPages } from './Navbar.types'

export const getNavbarPagesUrls = () => {
  return {
    [NavbarPages.MARKETPLACE]: config.get('MARKETPLACE_URL'),
    [NavbarPages.CREATE]: config.get('LANDING_CREATORS_URL'),
    [NavbarPages.EXPLORE]: config.get('EVENTS_URL'),
    [NavbarPages.LEARN]: config.get('DOCS_ABOUT_URL'),
    [NavbarPages.GOVERNANCE]: config.get('GOVERNANCE_URL')
  }
}
