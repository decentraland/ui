import { Navbar2Pages } from '../Navbar2.types'

export type MainMenuProps = {
  activePage: Navbar2Pages | string
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    show: boolean,
    section?: Navbar2Pages
  ) => void
  isMobile?: boolean
}
