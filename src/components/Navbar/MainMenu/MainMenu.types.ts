import { NavbarMenuI18nProps, NavbarPages } from '../Navbar.types'

export type MainMenuProps = {
  activePage: NavbarPages | string
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    show: boolean,
    section?: NavbarPages
  ) => void
  i18n: NavbarMenuI18nProps
  isMobile?: boolean
}
