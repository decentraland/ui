import { NavbarSubmenuProps, NavbarPages } from '../Navbar.types'

export type SubMenuProps = {
  selectedMenu: NavbarPages | boolean
  submenus: NavbarSubmenuProps
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    show: boolean,
    section?: NavbarPages
  ) => void
  onClickMenuOption?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    options: { eventTrackingName: string; url?: string; isExternal?: boolean }
  ) => void
  isMobile?: boolean
}
