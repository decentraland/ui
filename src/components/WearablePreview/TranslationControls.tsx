import { IPreviewController } from '@dcl/schemas'
import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Icon, WearablePreview } from '../..'
import './TranslationControls.css'

export type TranslationControlsProp = {
  wearablePreviewId: string
  vertical?: boolean
  className?: string
  verticalPosition?: VerticalPosition
  wearablePreviewController?: IPreviewController
}

export enum VerticalPosition {
  LEFT = 'left',
  RIGHT = 'right'
}

export const TranslationControls: React.FC<TranslationControlsProp> = (
  props
) => {
  const [previewController, setPreviewController] = useState(null)

  useEffect(() => {
    if (!previewController) {
      setPreviewController(
        props.wearablePreviewController ??
          WearablePreview.createController(props.wearablePreviewId)
      )
    }
  }, [props.wearablePreviewId, props.wearablePreviewController])

  const handleControlVerticalTraslation = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value)
      await previewController?.scene.panCamera({ y: value * -1 })
    },
    [previewController]
  )

  return (
    <div className={classNames('TranslationControls', props.className)}>
      {props.vertical ? (
        <div
          className={classNames(
            'VerticalSliderContainer',
            props.verticalPosition ?? VerticalPosition.RIGHT
          )}
        >
          <Icon className="arrows alternate horizontal" />
          <input
            step={0.1}
            min={-2}
            max={2}
            type="range"
            className="y-slider"
            onChange={handleControlVerticalTraslation}
          ></input>
        </div>
      ) : null}
    </div>
  )
}

export default React.memo(TranslationControls)
