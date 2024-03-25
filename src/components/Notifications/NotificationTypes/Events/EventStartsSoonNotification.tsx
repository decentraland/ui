import React, { useEffect, useState } from 'react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'

import {
  CommonNotificationProps,
  EventsStartsSoonNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import EventStartsSoon from '../../../Icons/Notifications/EventStartsSoon'

let interval: NodeJS.Timeout

function Countdown({ startDate }: { startDate: string }) {
  const [minutes, setMinutes] = useState(undefined)
  const [seconds, setSeconds] = useState(undefined)

  useEffect(() => {
    interval = setInterval(() => {
      const eventStartDate = new Date(startDate).getTime()
      const distance = eventStartDate - Date.now()
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setMinutes(minutes)
      setSeconds(seconds)
      if (distance < 0) {
        setMinutes(0)
        setSeconds(0)
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [setMinutes, setSeconds])

  const minutesString =
    minutes !== undefined
      ? minutes.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })
      : '--'
  const secondsString =
    seconds !== undefined
      ? seconds.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })
      : '--'

  return (
    <div className="notification-item__countdown">
      <Icon name="clock outline" />
      {`${minutesString}:${secondsString}`}
    </div>
  )
}

const i18N = {
  en: {
    description: (
      metadata: EventsStartsSoonNotification['metadata']
    ): React.ReactNode =>
      new Date(metadata.startsAt).getTime() > Date.now() ? (
        <>
          The event <a href={metadata.link}>{metadata.name}</a> is about to
          start in <Countdown startDate={metadata.startsAt} />
        </>
      ) : (
        <>
          The event <a href={metadata.link}>{metadata.name}</a> starts in an
          hour
        </>
      ),
    title: 'Event starts soon'
  },
  es: {
    description: (
      metadata: EventsStartsSoonNotification['metadata']
    ): React.ReactNode =>
      new Date(metadata.startsAt).getTime() > Date.now() ? (
        <>
          El evento <a href={metadata.link}>{metadata.name}</a> esta por empezar
          en <Countdown startDate={metadata.startsAt} />
        </>
      ) : (
        <>
          El evento <a href={metadata.link}>{metadata.name}</a> empieza en una
          hora
        </>
      ),
    title: 'Evento empieza pronto'
  },
  zh: {
    description: (
      metadata: EventsStartsSoonNotification['metadata']
    ): React.ReactNode =>
      new Date(metadata.startsAt).getTime() > Date.now() ? (
        <>
          事件 <a href={metadata.link}>{metadata.name}</a> 即将开始 在{' '}
          <Countdown startDate={metadata.startsAt} />
        </>
      ) : (
        <>
          事件 <a href={metadata.link}>{metadata.name}</a> 从一个开始 小时
        </>
      ),
    title: '事件即将开始'
  }
}

const EventsStartsSoonNotification = ({
  notification,
  locale
}: CommonNotificationProps<EventsStartsSoonNotification>) => (
  <NotificationItem
    image={{ image: <EventStartsSoon width="48" height="48" /> }}
    timestamp={notification.timestamp}
    isNew={!notification.read}
    locale={locale}
  >
    <p className="dcl notification-item__content-title">{i18N[locale].title}</p>
    <a href={notification.metadata.link}>
      <p className="dcl notification-item__content-description">
        {i18N[locale].description(notification.metadata)}
      </p>
    </a>
  </NotificationItem>
)

export default EventsStartsSoonNotification
