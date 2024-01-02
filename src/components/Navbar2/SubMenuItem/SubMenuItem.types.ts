export type SubMenuItemProps = {
  title: string
  description: string
  href: string
  eventTracking: string
  isExternal?: boolean
  className?: string
  onClickMenuOption?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    eventTracking: string
  ) => void
}
