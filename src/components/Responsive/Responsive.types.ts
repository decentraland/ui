import * as React from 'react'

export interface ResponsiveProps extends StrictResponsiveProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface StrictResponsiveProps {
  /** An element type to render as (string or function). */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Fires callbacks immediately after mount. */
  fireOnMount?: boolean

  /**
   * Called to get width of screen. Defaults to using `window.innerWidth` when in a browser;
   * otherwise, assumes a width of 0.
   */
  getWidth?: () => number

  /** The maximum width at which content will be displayed. */
  maxWidth?: number | string

  /** The minimum width at which content will be displayed. */
  minWidth?: number | string

  /**
   * Called on update.
   *
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onUpdate?: (
    event: React.SyntheticEvent<HTMLElement>,
    data: ResponsiveOnUpdateData
  ) => void
}

export interface ResponsiveOnUpdateData extends ResponsiveProps {
  width: number
}

export interface ResponsiveWidthShorthand {
  minWidth?: number | string
  maxWidth?: number | string
}
