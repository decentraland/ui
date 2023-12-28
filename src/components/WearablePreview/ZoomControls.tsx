import { IPreviewController } from '@dcl/schemas'
import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Icon, WearablePreview } from '../..'
import { Button } from '../Button/Button'
import './ZoomControls.css'

export type ZoomControlsProp = {
  wearablePreviewId: string
  className?: string
  position?: Position
  wearablePreviewController?: IPreviewController
  zoomDelta?: number
}

const ZOOM_DELTA = 0.1

export enum Position {
  LEFT = 'left',
  RIGHT = 'right'
}

export const ZoomControls: React.FC<ZoomControlsProp> = (props) => {
  const [previewController, setPreviewController] = useState(null)
  const zoomDelta = props.zoomDelta || ZOOM_DELTA

  useEffect(() => {
    if (!previewController) {
      setPreviewController(
        props.wearablePreviewController ??
          WearablePreview.createController(props.wearablePreviewId)
      )
    }
  }, [props.wearablePreviewId, props.wearablePreviewController])

  const handleControlZoomIn = useCallback(async () => {
    await previewController?.scene.changeZoom(zoomDelta)
  }, [previewController])

  const handleControlZoomOut = useCallback(async () => {
    await previewController?.scene.changeZoom(-zoomDelta)
  }, [previewController])

  return (
    <div
      className={classNames(
        'ZoomControls',
        props.className,
        props.position ?? Position.LEFT
      )}
    >
      <Button
        className="zoom-control zoom-in-control"
        onClick={handleControlZoomIn}
      >
        <Icon name="plus" />
      </Button>
      <Button
        className="zoom-control zoom-out-control"
        onClick={handleControlZoomOut}
      >
        <Icon name="minus" />
      </Button>
    </div>
  )
}

export default React.memo(ZoomControls)
