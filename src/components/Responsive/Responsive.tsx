import * as React from 'react'
import {
  eventStack,
  getElementType,
  isBrowser
} from 'semantic-ui-react/dist/commonjs/lib'
import { ResponsiveProps } from './Responsive.types'

const isNil = (value) => value == null

const fitsMaxWidth = (
  width?: number | string,
  maxWidth?: number | string
): boolean => (isNil(maxWidth) ? true : width <= maxWidth)

const fitsMinWidth = (
  width?: number | string,
  minWidth?: number | string
): boolean => (isNil(minWidth) ? true : width >= minWidth)

const isVisible = (
  width,
  {
    maxWidth,
    minWidth
  }: { maxWidth?: number | string; minWidth?: number | string }
) => fitsMinWidth(width, minWidth) && fitsMaxWidth(width, maxWidth)

/**
 * Responsive can control visibility of content.
 *
 * @deprecated This component is deprecated and was removed from semantic ui.
 */
export default class Responsive extends React.Component<ResponsiveProps> {
  static readonly onlyMobile = { minWidth: 320, maxWidth: 767 }
  static readonly onlyTablet = { minWidth: 768, maxWidth: 991 }
  static readonly onlyComputer = { minWidth: 992 }
  static readonly onlyLargeScreen = { minWidth: 1200, maxWidth: 1919 }
  static readonly onlyWidescreen = { minWidth: 1920 }
  static defaultProps = {
    getWidth: () => (isBrowser() ? window.innerWidth : 0)
  }
  private ticking: boolean
  private frameId: number

  state = {
    visible: true
  }

  static getDerivedStateFromProps(props) {
    const width = props.getWidth()
    const visible = isVisible(width, props)

    return { visible }
  }

  componentDidMount() {
    const { fireOnMount } = this.props

    eventStack.sub('resize', this.handleResize, { target: 'window' })
    if (fireOnMount) this.handleUpdate()
  }

  componentWillUnmount() {
    eventStack.unsub('resize', this.handleResize, { target: 'window' })
    cancelAnimationFrame(this.frameId)
  }

  // ----------------------------------------
  // Event handlers
  // ----------------------------------------

  handleResize = (e) => {
    if (this.ticking) return

    this.ticking = true
    this.frameId = requestAnimationFrame(() => this.handleUpdate(e))
  }

  handleUpdate = (e?) => {
    this.ticking = false

    const { visible } = this.state
    const width = this.props.getWidth()
    const nextVisible = isVisible(width, this.props)

    if (visible !== nextVisible) this.setState({ visible: nextVisible })
    this.props.onUpdate?.(e, { ...this.props, width })
  }

  cleanProps = (props: ResponsiveProps) => {
    const newProps = { ...props }
    delete newProps['as']
    delete newProps['fireOnMount']
    delete newProps['getWidth']
    delete newProps['maxWidth']
    delete newProps['minWidth']
    delete newProps['onUpdate']
    return newProps
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  render() {
    const { children } = this.props
    const { visible } = this.state

    const ElementType = getElementType(Responsive, this.props)
    const rest = this.cleanProps(this.props)

    if (visible) return <ElementType {...rest}>{children}</ElementType>
    return null
  }
}
