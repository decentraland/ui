import { Navbar2Pages } from '../Navbar2.types'

export type SubMenuProps = {
  selectedMenu: Navbar2Pages | boolean
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    show: boolean,
    section?: Navbar2Pages
  ) => void
  onClickMenuOption: (e: React.MouseEvent, section: string) => void
  isMobile?: boolean
}
