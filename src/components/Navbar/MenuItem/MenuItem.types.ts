import { Navbar2Pages } from '../Navbar.types'

export type MenuItemProps = {
  activePage: Navbar2Pages | string
  section: Navbar2Pages
  title: React.ReactNode
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    show: boolean,
    section?: Navbar2Pages
  ) => void
  isMobile?: boolean
}
