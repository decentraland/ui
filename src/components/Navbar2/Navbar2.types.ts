import React from 'react'
import { UserMenuProps } from '../UserMenu/UserMenu.types'

export type SubMenui18nProps = {
  main: string
  column1Title: string
  column1: {
    title: string
    description: string
    url: string
    isExternal?: boolean
  }[]
  column2Title: string
  column2: {
    title: string
    description: string
    url: string
    isExternal?: boolean
  }[]
  column3Title: string
  column3: {
    title: string
    description: string
    url: string
    isExternal?: boolean
  }[]
}

export type Navbar2I18N = {
  menu: {
    marketplace: SubMenui18nProps
    create: SubMenui18nProps
    explore: SubMenui18nProps
    learn: SubMenui18nProps
    governance: SubMenui18nProps
  }
  account: {
    signIn: React.ReactNode
    connecting: React.ReactNode
  }
}

export enum Navbar2Pages {
  MARKETPLACE = 'marketplace',
  CREATE = 'create',
  EXPLORE = 'explore',
  LEARN = 'learn',
  GOVERNANCE = 'governance'
}

export type SubMenuItemProps = {
  title: string
  description: string
  href: string
  isExternal?: boolean
  className?: string
}

export type SubMenuColumnProps = {
  children: React.ReactNode
  title?: string
  isExternal?: boolean
  className?: string
}

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

export type MenuLeftDesktopProps = {
  activePage: Navbar2Pages | string
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    show: boolean,
    section?: Navbar2Pages
  ) => void
  isMobile?: boolean
}

export type Navbar2Props = UserMenuProps & {
  className?: string
  activePage: Navbar2Pages | string
}
