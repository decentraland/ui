import React from 'react'
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup'
import { InfoTooltipProps } from './InfoTooltip.types'
import './InfoTooltip.css'

export const InfoTooltip = (props: InfoTooltipProps) => {
  return (
    <Popup
      position="top center"
      trigger={<div className="dui-info-tooltip__trigger" />}
      on="hover"
      {...props}
    />
  )
}
