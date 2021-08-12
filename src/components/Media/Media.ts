import { useMediaQuery } from 'react-responsive'

const useDesktopMediaQuery = (): boolean => useMediaQuery({ minWidth: 992 })

const useTabletMediaQuery = (): boolean =>
  useMediaQuery({ minWidth: 768, maxWidth: 991 })

const useTabletAndBelowMediaQuery = (): boolean =>
  useMediaQuery({ maxWidth: 991 })

const useMobileMediaQuery = (): boolean => useMediaQuery({ maxWidth: 767 })

const useNotMobileMediaQuery = (): boolean => useMediaQuery({ minWidth: 768 })

/**
 * Renders a component if the screen suits the desktop size.
 */
const Desktop = ({ children }) => {
  const isDesktop = useDesktopMediaQuery()
  return isDesktop ? children : null
}

/**
 * Renders a component if the screen suits the tablet size.
 */
const Tablet = ({ children }) => {
  const isTablet = useTabletMediaQuery()
  return isTablet ? children : null
}

/**
 * Renders a component if the screen suits the tablet or mobile size.
 */
const TabletAndBelow = ({ children }) => {
  const isTablet = useTabletAndBelowMediaQuery()
  return isTablet ? children : null
}

/**
 * Renders a component if the screen suits the mobile size.
 */
const Mobile = ({ children }) => {
  const isMobile = useMobileMediaQuery()
  return isMobile ? children : null
}

/**
 * Renders a component if the screen doesn't have the size of a mobile device.
 */
const NotMobile = ({ children }) => {
  const isNotMobile = useNotMobileMediaQuery()
  return isNotMobile ? children : null
}

export {
  Desktop,
  Tablet,
  TabletAndBelow,
  Mobile,
  NotMobile,
  useDesktopMediaQuery,
  useTabletMediaQuery,
  useTabletAndBelowMediaQuery,
  useMobileMediaQuery,
  useNotMobileMediaQuery
}
