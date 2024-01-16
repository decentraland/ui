import { NavbarPages } from '../Navbar.types'

export type MenuItemProps = {
  activePage: NavbarPages | string
  section: NavbarPages
  title: React.ReactNode
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    show: boolean,
    section?: NavbarPages
  ) => void
  isMobile?: boolean
}
