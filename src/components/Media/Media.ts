import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}

const NotMobile = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

const useIsDesktop = (): boolean => useMediaQuery({ minWidth: 992 })

const useIsTablet = (): boolean =>
  useMediaQuery({ minWidth: 768, maxWidth: 991 })

const useIsMobile = (): boolean => useMediaQuery({ maxWidth: 767 })

const useIsNotMobile = (): boolean => useMediaQuery({ minWidth: 768 })

export {
  Desktop,
  Tablet,
  Mobile,
  NotMobile,
  useIsDesktop,
  useIsTablet,
  useIsMobile,
  useIsNotMobile
}
