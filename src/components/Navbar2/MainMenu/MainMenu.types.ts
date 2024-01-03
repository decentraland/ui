import { Navbar2MenuI18nProps, Navbar2Pages } from '../Navbar2.types'

export type MainMenuProps = {
  activePage: Navbar2Pages | string
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    show: boolean,
    section?: Navbar2Pages
  ) => void
  i18n: Navbar2MenuI18nProps
  isMobile?: boolean
}
