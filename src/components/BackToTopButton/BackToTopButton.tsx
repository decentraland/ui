import React, { useCallback, useState, useEffect } from 'react'
import classNames from 'classnames'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { useNotMobileMediaQuery } from '../Media'
import { Button } from '../Button/Button'
import { Props } from './BackToTopButton.types'
import './BackToTopButton.css'

const MIN_HEIGHT_SCROLL_BACK = 500
const DEFAULT_SCROLL_TO_OPTS = { top: 0, behavior: 'smooth' as ScrollBehavior }

const BackToTopButton = ({
  className,
  threshold = MIN_HEIGHT_SCROLL_BACK,
  scrollToOptions = DEFAULT_SCROLL_TO_OPTS,
  i18n
}: Props) => {
  const { title = 'Back to top' } = i18n || {}
  const isDesktop = useNotMobileMediaQuery()
  const [showButton, setShowButton] = useState(false)
  useEffect(() => {
    const scrollListener = () => {
      setShowButton(window.scrollY > threshold)
    }
    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [threshold])

  const handleBackToTop = useCallback(() => {
    window.scrollTo(scrollToOptions)
  }, [scrollToOptions])

  return showButton ? (
    <Button
      className={classNames(className, 'backToTop')}
      onClick={handleBackToTop}
    >
      <Icon name="arrow up" />
      {isDesktop ? title : null}
    </Button>
  ) : null
}

export default React.memo(BackToTopButton)
