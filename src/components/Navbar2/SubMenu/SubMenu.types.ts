import { Navbar2I18N, Navbar2Pages } from '../Navbar2.types'

export type SubMenuProps = {
  selectedMenu: Navbar2Pages | boolean
  i18n: Navbar2I18N
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    show: boolean,
    section?: Navbar2Pages
  ) => void
  onClickMenuOption?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    eventTracking: string
  ) => void
  isMobile?: boolean
}
