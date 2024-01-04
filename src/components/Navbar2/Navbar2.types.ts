import { UserMenuI18N, UserMenuProps } from '../UserMenu/UserMenu.types'

export enum Navbar2Pages {
  MARKETPLACE = 'marketplace',
  CREATE = 'create',
  EXPLORE = 'explore',
  LEARN = 'learn',
  GOVERNANCE = 'governance'
}

export type Navbar2MenuI18nProps = Record<Navbar2Pages, Navbar2Pages>

export type Navbar2SubMenuItemsProps = {
  column1Title?: string
  column1: {
    title: string
    description: string
    url: string
    eventTrackingName: string
    isExternal?: boolean
  }[]
  column2Title?: string
  column2: {
    title: string
    description: string
    url: string
    eventTrackingName: string
    isExternal?: boolean
  }[]
  column3Title?: string
  column3?: {
    title: string
    description: string
    url: string
    eventTrackingName: string
    isExternal?: boolean
  }[]
}

export type Navbar2SubmenuProps = {
  marketplace: Navbar2SubMenuItemsProps
  create: Navbar2SubMenuItemsProps
  explore: Navbar2SubMenuItemsProps
  learn: Navbar2SubMenuItemsProps
  governance: Navbar2SubMenuItemsProps
}

export type Navbar2Props = Omit<UserMenuProps, 'i18n'> & {
  i18nNavbar?: Navbar2MenuI18nProps
  submenuItems?: Navbar2SubmenuProps
  i18nUserMenu?: UserMenuI18N
  activePage: Navbar2Pages | string
  className?: string
  isFullScreen?: boolean
  onClickNavbarItem?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    options: { eventTrackingName: string; url?: string; isExternal?: boolean }
  ) => void
}
