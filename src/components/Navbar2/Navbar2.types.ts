import React from 'react'
import { UserMenuI18N, UserMenuProps } from '../UserMenu/UserMenu.types'

export type SubMenui18nProps = {
  main: string
  column1Title: string
  column1: {
    title: string
    description: string
    url: string
    eventTracking: string
    isExternal?: boolean
  }[]
  column2Title: string
  column2: {
    title: string
    description: string
    url: string
    eventTracking: string
    isExternal?: boolean
  }[]
  column3Title: string
  column3: {
    title: string
    description: string
    url: string
    eventTracking: string
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

export type Navbar2Props = Omit<UserMenuProps, 'i18n'> & {
  i18nNavbar?: Navbar2I18N
  i18nUserMenu?: UserMenuI18N
  activePage: Navbar2Pages | string
  className?: string
}
