/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'events'
import future, { IFuture } from 'fp-future'
import {
  IPreviewController,
  PreviewMessagePayload,
  PreviewMessageType,
  sendMessage
} from '@dcl/schemas/dist/dapps/preview'
import { Metrics } from '@dcl/schemas/dist/platform/item/metrics'

const promises = new Map<string, IFuture<any>>()
const emoteEvents = new Map<MessageEventSource, EventEmitter>()

window.onmessage = function handleMessage(event: MessageEvent) {
  if (event.data && event.data.type) {
    switch (event.data.type as PreviewMessageType) {
      case PreviewMessageType.CONTROLLER_RESPONSE: {
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
        break
      }
      case PreviewMessageType.EMOTE_EVENT: {
        const payload = event.data
          .payload as PreviewMessagePayload<PreviewMessageType.EMOTE_EVENT>
        const { type } = payload
        const events = emoteEvents.get(event.source)
        if (events && type) {
          events.emit(type)
        }
        break
      }
      default:
      // nothing to do, invalid message
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
      | 'changeZoom'
      | 'panCamera'
      | 'changeCameraPosition'
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
  const iframe = document.getElementById(id) as HTMLIFrameElement
  if (!iframe) {
    throw new Error(`Could not find an iframe with id="${id}"`)
  }

  const events = emoteEvents.get(iframe.contentWindow) ?? new EventEmitter()
  emoteEvents.set(iframe.contentWindow, events)

  const sendRequest = createSendRequest(id)

  return {
    scene: {
      getScreenshot(width: number, height: number) {
        return sendRequest<string>('scene', 'getScreenshot', [width, height])
      },
      getMetrics() {
        return sendRequest<Metrics>('scene', 'getMetrics', [])
      },
      changeZoom: function (zoom) {
        return sendRequest('scene', 'changeZoom', [zoom])
      },
      panCamera: function (offset) {
        return sendRequest('scene', 'panCamera', [offset])
      },
      changeCameraPosition: function (position) {
        return sendRequest('scene', 'changeCameraPosition', [position])
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
      },
      events
    }
  }
}
