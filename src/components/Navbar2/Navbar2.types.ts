import React from 'react'

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
    discover: SubMenui18nProps
    learn: SubMenui18nProps
    vote: SubMenui18nProps
  }
  account: {
    signIn: React.ReactNode
    connecting: React.ReactNode
  }
}

export enum Navbar2Pages {
  MARKETPLACE = 'marketplace',
  CREATE = 'create',
  DISCOVER = 'discover',
  LEARN = 'learn',
  VOTE = 'vote',
}

export type ItemSubMenuProps = {
  title: string
  description: string
  href: string
  isExternal?: boolean
  className?: string
}

export type ColumnMenuProps = {
  children: React.ReactNode
  title?: string
  isExternal?: boolean
  className?: string
}

export type SubMenuProps = {
  selectedMenu: Navbar2Pages | boolean
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    section: Navbar2Pages,
    show: boolean
  ) => void
  onClickMenuOption: (e: React.MouseEvent, section: string) => void
}

export type RenderMenuItemProps = {
  activePage: Navbar2Pages | string
  section: Navbar2Pages
  title: React.ReactNode
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    section: Navbar2Pages,
    show: boolean
  ) => void
}

export type RenderLeftDesktopMenuProps = {
  activePage: Navbar2Pages | string
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    section: Navbar2Pages,
    show: boolean
  ) => void
}

export type renderLeftMenu = {
  leftMenu?: React.ReactNode
  leftMenuDecorator?: React.ComponentType<{ children: React.ReactNode }>
  activePage: Navbar2Pages | string
  onToggleShowSubMenu: (
    e: React.MouseEvent,
    section: Navbar2Pages,
    show: boolean
  ) => void
}

export type Navbar2Props = {
  mana?: number
  address?: string
  middleMenu?: React.ReactNode
  rightMenu?: React.ReactNode
  enableSubMenuSection?: boolean
  isConnected?: boolean
  isConnecting?: boolean
  isSignIn?: boolean
  isFullscreen?: boolean
  isOverlay?: boolean
  className?: string
  onSignIn?: () => void
  onClickAccount?: () => void
  leftMenu?: React.ReactNode
  leftMenuDecorator?: React.ComponentType<{ children: React.ReactNode }>
  activePage: Navbar2Pages | string
}
