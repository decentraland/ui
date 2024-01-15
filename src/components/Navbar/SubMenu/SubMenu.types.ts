import { Navbar2SubmenuProps, Navbar2Pages } from '../Navbar.types'

export type SubMenuProps = {
  selectedMenu: Navbar2Pages | boolean
  submenus: Navbar2SubmenuProps
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    show: boolean,
    section?: Navbar2Pages
  ) => void
  onClickMenuOption?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    options: { eventTrackingName: string; url?: string; isExternal?: boolean }
  ) => void
  isMobile?: boolean
}
