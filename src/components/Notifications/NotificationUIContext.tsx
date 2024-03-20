import React from 'react'

type NotificationUIContext = {
  ProfileCmp: (props: { address: string }) => JSX.Element
}

const defaultContext = {
  ProfileCmp: (props: { address: string }) => <div>{props.address}</div>
}

const NotificationUIContext =
  React.createContext<NotificationUIContext>(defaultContext)

export const NotificationUIContextProvider = NotificationUIContext.Provider

export const useNotificationUI = () => React.useContext(NotificationUIContext)
