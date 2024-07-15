export type SmartBadgeProps =
  | {
      clickable?: false
      i18n?: {
        title: string
      }
    }
  | {
      clickable: true
      i18n?: {
        title: string
      }
    }
