import { IPreviewController } from '@dcl/schemas'
import React, { useCallback, useEffect, useState } from 'react'
import { Icon, WearablePreview } from '../..'
import { Button } from '../Button/Button'
import './ZoomControls.css'

export type ZoomControlsProp = {
  wearablePreviewId: string
  className?: string
  wearablePreviewController?: IPreviewController
}

const ZOOM_DELTA = 0.1

export const ZoomControls: React.FC<ZoomControlsProp> = (props) => {
  const [previewController, setPreviewController] = useState(null)

  useEffect(() => {
    if (!previewController) {
      setPreviewController(
        props.wearablePreviewController ??
          WearablePreview.createController(props.wearablePreviewId)
      )
    }
  }, [props.wearablePreviewId, props.wearablePreviewController])

  const handleControlZoomIn = useCallback(async () => {
    await previewController?.scene.changeZoom(ZOOM_DELTA)
  }, [previewController])

  const handleControlZoomOut = useCallback(async () => {
    await previewController?.scene.changeZoom(-ZOOM_DELTA)
  }, [previewController])

  return (
    <div className={`ZoomControls ${props.className}`}>
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
