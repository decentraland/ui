export type SubMenuItemProps = {
  title: string
  description: string
  href: string
  eventTrackingName: string
  isExternal?: boolean
  className?: string
  onClickMenuOption?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    options: { eventTrackingName: string; url?: string; isExternal?: boolean }
  ) => void
}
