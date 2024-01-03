export type SubMenuItemProps = {
  title: string
  description: string
  href: string
  eventTrackingName: string
  isExternal?: boolean
  className?: string
  onClickMenuOption?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    eventTrackingName: string
  ) => void
}
