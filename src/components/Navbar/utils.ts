import { config } from '../../config'
import { NavbarPages } from './Navbar.types'

export const NavbarPagesUrl = (navPage: NavbarPages) => {
  switch (navPage) {
    case NavbarPages.MARKETPLACE:
      return config.get('MARKETPLACE_URL')
    case NavbarPages.CREATE:
      return config.get('LANDING_CREATORS_URL')
    case NavbarPages.EXPLORE:
      return config.get('EVENTS_URL')
    case NavbarPages.LEARN:
      return config.get('DOCS_ABOUT_URL')
    case NavbarPages.GOVERNANCE:
      return config.get('GOVERNANCE_URL')
    default:
      return ''
  }
}
