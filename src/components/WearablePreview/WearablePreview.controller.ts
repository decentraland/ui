/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IPreviewController,
  PreviewMessagePayload,
  PreviewMessageType,
  sendMessage
} from '@dcl/schemas/dist/dapps/preview'
import { Metrics } from '@dcl/schemas/dist/platform/item/metrics'
import future, { IFuture } from 'fp-future'

const promises = new Map<string, IFuture<any>>()

window.onmessage = function handleMessage(event: MessageEvent) {
  if (
    event.data &&
    event.data.type &&
    event.data.type === PreviewMessageType.CONTROLLER_RESPONSE
  ) {
    const payload = event.data
      .payload as PreviewMessagePayload<PreviewMessageType.CONTROLLER_RESPONSE>
    const { id } = payload
    const promise = promises.get(id)
    if (promise) {
      if (payload.ok) {
        promise.resolve(payload.result)
      } else if (payload.ok === false) {
        promise.reject(new Error(payload.error))
      }
    }
  }
}

let nonce = 0
function createSendRequest(id: string) {
  return function sendRequest<T>(
    namespace: 'scene' | 'emote',
    method:
      | 'getScreenshot'
      | 'getMetrics'
      | 'getLength'
      | 'isPlaying'
      | 'goTo'
      | 'play'
      | 'pause'
      | 'stop',
    params: any[]
  ) {
    const iframe = document.getElementById(id) as HTMLIFrameElement
    const messageId = id + '-' + nonce
    const promise = future<T>()
    promises.set(messageId, promise)
    const type = PreviewMessageType.CONTROLLER_REQUEST
    const message = { id: messageId, namespace, method, params }
    sendMessage(iframe.contentWindow, type, message)
    nonce++
    return promise
  }
}

export function createController(id: string): IPreviewController {
  if (!document.getElementById(id)) {
    throw new Error(`Could not find an iframe with id="${id}"`)
  }

  const sendRequest = createSendRequest(id)

  return {
    scene: {
      getScreenshot(width: number, height: number) {
        return sendRequest<string>('scene', 'getScreenshot', [width, height])
      },
      getMetrics() {
        return sendRequest<Metrics>('scene', 'getMetrics', [])
      }
    },
    emote: {
      getLength() {
        return sendRequest<number>('emote', 'getLength', [])
      },
      isPlaying() {
        return sendRequest<boolean>('emote', 'isPlaying', [])
      },
      goTo(seconds: number) {
        return sendRequest<void>('emote', 'goTo', [seconds])
      },
      play() {
        return sendRequest<void>('emote', 'play', [])
      },
      pause() {
        return sendRequest<void>('emote', 'pause', [])
      },
      stop() {
        return sendRequest<void>('emote', 'stop', [])
      }
    }
  }
}
