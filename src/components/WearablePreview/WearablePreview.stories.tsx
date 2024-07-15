import * as React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
  EmoteWithBlobs,
  IPreviewController,
  PreviewCamera,
  PreviewEmote,
  PreviewProjection,
  WearableWithBlobs
} from '@dcl/schemas/dist/dapps/preview'
import {
  BodyShape,
  EmoteCategory,
  Metrics
} from '@dcl/schemas/dist/platform/item'
import { WearableCategory } from '@dcl/schemas'
import { Button } from '../Button/Button'
import { Navbar } from '../Navbar/Navbar'
import { Tabs } from '../Tabs/Tabs'
import { Page } from '../Page/Page'
import { Hero } from '../Hero/Hero'
import { Container } from '../Container/Container'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { Row } from '../Row/Row'
import { Radio } from '../Radio/Radio'
import { Center } from '../Center/Center'
import { SliderField } from '../SliderField/SliderField'
import { WearablePreview } from './WearablePreview'
import { EmoteControls } from './EmoteControls'
import { ZoomControls } from './ZoomControls'
import { TranslationControls, VerticalPosition } from './TranslationControls'
import './WearablePreview.stories.css'

const getRandomHex = () => {
  return '#' + Math.random().toString(16).slice(2, 8)
}

const getRandomProfile = () => {
  return 'default' + ((Math.random() * 50) | 0)
}

const RandomConfigProvider = (props: {
  children: (hair: string, skin: string, profile: string) => React.ReactElement
}) => {
  const [hair, setHair] = React.useState(getRandomHex())
  const [skin, setSkin] = React.useState(getRandomHex())
  const [profile, setProfile] = React.useState(getRandomProfile())
  React.useEffect(() => {
    setInterval(() => {
      setHair(getRandomHex())
      setSkin(getRandomHex())
      setProfile(getRandomProfile())
    }, 5000)
  }, [])
  return props.children(hair, skin, profile)
}

function toWearableWithBlobs(file: File): WearableWithBlobs {
  return {
    id: 'some-id',
    name: '',
    description: '',
    image: '',
    thumbnail: '',
    i18n: [],
    data: {
      category: WearableCategory.HAT,
      hides: [],
      replaces: [],
      tags: [],
      representations: [
        {
          bodyShapes: [BodyShape.MALE, BodyShape.FEMALE],
          mainFile: 'model.glb',
          contents: [
            {
              key: 'model.glb',
              blob: file
            }
          ],
          overrideHides: [],
          overrideReplaces: []
        }
      ]
    }
  }
}

function toEmoteWithBlobs(file: File): EmoteWithBlobs {
  return {
    id: 'some-id',
    name: '',
    description: '',
    image: '',
    thumbnail: '',
    i18n: [],
    emoteDataADR74: {
      category: EmoteCategory.DANCE,
      tags: [],
      representations: [
        {
          bodyShapes: [BodyShape.MALE, BodyShape.FEMALE],
          mainFile: 'model.glb',
          contents: [
            {
              key: 'model.glb',
              blob: file
            }
          ]
        }
      ],
      loop: false
    }
  }
}

export default {
  title: 'WearablePreview',
  component: WearablePreview,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof WearablePreview>

export const PreviewAnItem: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      contractAddress="0xee8ae4c668edd43b34b98934d6d2ff82e41e6488"
      itemId="5"
    />
  </div>
)
PreviewAnItem.storyName = 'Preview an item'

export const PreviewAToken: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      contractAddress="0xee8ae4c668edd43b34b98934d6d2ff82e41e6488"
      tokenId="1"
    />
  </div>
)
PreviewAToken.storyName = 'Preview a token'

export const PreviewATokenFromMumbai: ComponentStory<typeof WearablePreview> =
  () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xf88951ddd9ff334ae98901e26042edbb8f6d52e5"
        tokenId="1"
        dev
      />
    </div>
  )
PreviewATokenFromMumbai.storyName = 'Preview a token from mumbai'

export const PreviewATextureWearable: ComponentStory<typeof WearablePreview> =
  () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xfeb52cbf71b9adac957c6f948a6cf9980ac8c907"
        tokenId="3073"
      />
    </div>
  )
PreviewATextureWearable.storyName = 'Preview a texture wearable'

export const UsingCustomSkin: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      contractAddress="0x994684b980d6faff06ff36b13c243c31d1b3aa0e"
      itemId="0"
      skin="ff0000"
    />
  </div>
)
UsingCustomSkin.storyName = 'Using custom skin'

export const UsingCustomHair: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      contractAddress="0xe3d2c4ec777fb88dd219905cd896f79a592adf30"
      itemId="0"
      hair="00ff00"
    />
  </div>
)
UsingCustomHair.storyName = 'Using custom hair'

export const UsingCustomShape: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      contractAddress="0xe3d2c4ec777fb88dd219905cd896f79a592adf30"
      itemId="0"
      hair="00ff00"
      bodyShape={BodyShape.FEMALE}
    />
  </div>
)
UsingCustomShape.storyName = 'Using custom shape'

export const UsingAProfile: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6" />
  </div>
)
UsingAProfile.storyName = 'Using a profile'

export const UsingAProfileEmote: ComponentStory<typeof WearablePreview> =
  () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6"
        emote={PreviewEmote.FASHION}
      />
    </div>
  )
UsingAProfileEmote.storyName = 'Using a profile + emote'

export const UsingAWearablePreviewProfileEmote: ComponentStory<
  typeof WearablePreview
> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      contractAddress="0x186c788f9c172934b790b868faf3b78b84e34e89"
      itemId="0"
      profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6"
      emote={PreviewEmote.FASHION}
    />
  </div>
)
UsingAWearablePreviewProfileEmote.storyName =
  'Using a wearable + profile + emote'

export const UsingStaticCamera: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6"
      camera={PreviewCamera.STATIC}
    />
  </div>
)
UsingStaticCamera.storyName = 'Using static camera'

export const UsingOnLoadCallback: ComponentStory<typeof WearablePreview> =
  () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xee8ae4c668edd43b34b98934d6d2ff82e41e6488"
        itemId="5"
        onLoad={() => console.log('loaded!')}
      />
    </div>
  )
UsingOnLoadCallback.storyName = 'Using onLoad callback'

export const UsingOnErrorCallback: ComponentStory<typeof WearablePreview> =
  () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="invalidAddress"
        itemId="invalidItem"
        onError={(error) => console.error(error.message)}
      />
    </div>
  )
UsingOnErrorCallback.storyName = 'Using onError callback'

export const UseAsHero: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <Navbar activePage="marketplace" />
    <Tabs isFullscreen>
      <Tabs.Tab active>Atlas</Tabs.Tab>
      <Tabs.Tab>Market</Tabs.Tab>
      <Tabs.Tab>My Assets</Tabs.Tab>
    </Tabs>
    <Page isFullscreen>
      <Hero height={420}>
        <WearablePreview
          contractAddress="0xee8ae4c668edd43b34b98934d6d2ff82e41e6488"
          itemId="5"
        />
      </Hero>
      <Container>
        <Header>Hello Wolrd</Header>
        <p>This page has a hero</p>
      </Container>
    </Page>
    <Footer />
  </div>
)
UseAsHero.storyName = 'Use as hero'

export const WithHotReload: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <RandomConfigProvider>
      {(hair, skin, profile) => (
        <WearablePreview
          profile={profile}
          hair={hair}
          skin={skin}
          onLoad={() => console.log('loaded!')}
        />
      )}
    </RandomConfigProvider>
  </div>
)
WithHotReload.storyName = 'With hot reload'

export const FromUrl: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      urls={[
        'https://gist.githubusercontent.com/cazala/7e66253d2b86f018ee599cf9da007b81/raw/dfb411a0cff38d1b128efe4f7eca80fa2e04e84d/wearable.json'
      ]}
    />
  </div>
)
FromUrl.storyName = 'From URL'

export const FromBase64: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      base64s={[
        'eyJpZCI6InVybjpkZWNlbnRyYWxhbmQ6bWF0aWM6Y29sbGVjdGlvbnMtdjI6MHhlNzkzODAxODI5ZTBlMGY5YWE1YmFmOTg3NzMyMDA1OWQ5ZjRhNjU0OjAiLCJuYW1lIjoiV2Fja3kgQWxpZW4gQnVja2V0IEhhdCIsImRlc2NyaXB0aW9uIjoiU2xpbXkgSGFpciBpcyBhIGZpeGVkIGNvbG91ci4uLiIsImNvbGxlY3Rpb25BZGRyZXNzIjoiMHhlNzkzODAxODI5ZTBlMGY5YWE1YmFmOTg3NzMyMDA1OWQ5ZjRhNjU0IiwicmFyaXR5IjoibGVnZW5kYXJ5IiwiaTE4biI6W3siY29kZSI6ImVuIiwidGV4dCI6IldhY2t5IEFsaWVuIEJ1Y2tldCBIYXQifV0sImRhdGEiOnsicmVwbGFjZXMiOltdLCJoaWRlcyI6WyJoYWlyIl0sInRhZ3MiOlsid2Fja3lhbGllbiIsIndhY2t5IiwiYWxpZW4iLCJidWNrZXRoYXQiLCJzbGltZSIsIjE2MjAiLCJqdWRhc2p1ZGFzIl0sImNhdGVnb3J5IjoiaGF0IiwicmVwcmVzZW50YXRpb25zIjpbeyJib2R5U2hhcGVzIjpbInVybjpkZWNlbnRyYWxhbmQ6b2ZmLWNoYWluOmJhc2UtYXZhdGFyczpCYXNlTWFsZSJdLCJtYWluRmlsZSI6Im1hbGUvZnJvZ2dseU1BTEVfYmFzZS5nbGIiLCJjb250ZW50cyI6W3sia2V5IjoibWFsZS9mcm9nZ2x5TUFMRV9iYXNlLmdsYiIsInVybCI6Imh0dHBzOi8vcGVlci1lYzEuZGVjZW50cmFsYW5kLm9yZy9jb250ZW50L2NvbnRlbnRzL1FtZUNxNzV2TE1EdGtYeWFXWTNKejc3RmdEQ2paaTNGSFQxWjVKbTR6VG9HcG0ifV0sIm92ZXJyaWRlSGlkZXMiOlsiaGFpciJdLCJvdmVycmlkZVJlcGxhY2VzIjpbXX0seyJib2R5U2hhcGVzIjpbInVybjpkZWNlbnRyYWxhbmQ6b2ZmLWNoYWluOmJhc2UtYXZhdGFyczpCYXNlRmVtYWxlIl0sIm1haW5GaWxlIjoiZmVtYWxlL2Zyb2dnbHlGRU1BTEVfYmFzZS5nbGIiLCJjb250ZW50cyI6W3sia2V5IjoiZmVtYWxlL2Zyb2dnbHlGRU1BTEVfYmFzZS5nbGIiLCJ1cmwiOiJodHRwczovL3BlZXItZWMxLmRlY2VudHJhbGFuZC5vcmcvY29udGVudC9jb250ZW50cy9RbVFGa0xHczUzMnhjZUZjb0NKYm5xWXExVlBzOGRleDVLMXdrWm8yQXhqajdZIn1dLCJvdmVycmlkZUhpZGVzIjpbImhhaXIiXSwib3ZlcnJpZGVSZXBsYWNlcyI6W119XX0sImltYWdlIjoiaHR0cHM6Ly9wZWVyLWVjMS5kZWNlbnRyYWxhbmQub3JnL2NvbnRlbnQvY29udGVudHMvUW1XUEczY0phVmMxaEVCa0tpZ2E2NWtVeGIzZ2g0cFp6RDN3Y0pWb1laR0VwQiIsInRodW1ibmFpbCI6Imh0dHBzOi8vcGVlci1lYzEuZGVjZW50cmFsYW5kLm9yZy9jb250ZW50L2NvbnRlbnRzL1FtWUY3OXZZNkNFamVyUlFEOU1Hd01WWTV0NWJlWjY5UjlEMmQ5U0tKRFNQNzUiLCJtZXRyaWNzIjp7InRyaWFuZ2xlcyI6MTQ4NywibWF0ZXJpYWxzIjoyLCJ0ZXh0dXJlcyI6MiwibWVzaGVzIjoyLCJib2RpZXMiOjIsImVudGl0aWVzIjoxfX0='
      ]}
    />
  </div>
)
FromBase64.storyName = 'From base64'

export const WithoutAutoRotation: ComponentStory<typeof WearablePreview> =
  () => (
    <div className="WearablePreview-story-container">
      <WearablePreview profile="default" disableAutoRotate />
    </div>
  )
WithoutAutoRotation.storyName = 'Without auto Rotation'

export const WithoutBackgroundOrTransparentBackground: ComponentStory<
  typeof WearablePreview
> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview profile="default" disableBackground />
  </div>
)
WithoutBackgroundOrTransparentBackground.storyName =
  'Without background or transparent background'

export const WithCustomBackgroundColor: ComponentStory<typeof WearablePreview> =
  () => (
    <div className="WearablePreview-story-container">
      <WearablePreview profile="default" background="ff0000" />
    </div>
  )
WithCustomBackgroundColor.storyName = 'With custom background color'

export const TakeScreenshotAndMetrics: ComponentStory<typeof WearablePreview> =
  () => {
    const [screenshot, setScreenshot] = React.useState('')
    const [metrics, setMetrics] = React.useState<Metrics | null>(null)
    const ref = React.useRef<IPreviewController | null>(null)
    const onLoad = React.useCallback(() => {
      ref.current = ref.current ?? WearablePreview.createController('some-id')
    }, [])
    return (
      <div className="WearablePreview-story-container">
        <WearablePreview
          id="some-id"
          contractAddress="0x186c788f9c172934b790b868faf3b78b84e34e89"
          itemId="0"
          disableAutoRotate
          disableBackground
          onLoad={onLoad}
        />
        <Row className="controls">
          <Button
            primary
            onClick={() =>
              ref.current.scene.getScreenshot(1024, 1024).then(setScreenshot)
            }
          >
            Screenshot
          </Button>
          {screenshot && <img src={screenshot} />}
          <Button
            primary
            onClick={() => ref.current.scene.getMetrics().then(setMetrics)}
          >
            Metrics
          </Button>
          {metrics && <p>{JSON.stringify(metrics)}</p>}
        </Row>
      </div>
    )
  }
TakeScreenshotAndMetrics.storyName = 'Take screenshot and metrics'

export const WithTranslationControls: ComponentStory<typeof WearablePreview> =
  () => {
    const [verticalPosition, setVerticalPosition] = React.useState(
      VerticalPosition.LEFT
    )

    const togglePosition =
      verticalPosition === VerticalPosition.LEFT
        ? VerticalPosition.RIGHT
        : VerticalPosition.LEFT

    return (
      <div className="WearablePreview-story-container">
        <WearablePreview
          id="some-id"
          profile="default"
          emote={PreviewEmote.DANCE}
          disableBackground
          disableAutoRotate
          disableFace
          disableDefaultWearables
          skin="000000"
        />
        <TranslationControls
          vertical
          verticalPosition={verticalPosition}
          wearablePreviewId="some-id"
        />
        <Row className="controls">
          <Radio
            toggle
            checked={verticalPosition === VerticalPosition.LEFT}
            label={`${verticalPosition} side`}
            onClick={() => setVerticalPosition(togglePosition)}
            style={{ textTransform: 'capitalize' }}
          />
        </Row>
      </div>
    )
  }
WithTranslationControls.storyName = 'With translation controls'

export const WithZoomControls: ComponentStory<typeof WearablePreview> = () => {
  return (
    <div className="WearablePreview-story-container">
      <WearablePreview
        id="some-id"
        profile="default"
        emote={PreviewEmote.DANCE}
        disableBackground
        disableAutoRotate
        disableFace
        disableDefaultWearables
        skin="000000"
        zoom={100}
        wheelZoom={2}
      />
      <ZoomControls wearablePreviewId="some-id" />
    </div>
  )
}
WithZoomControls.storyName = 'With zoom controls'

export const WithEmoteControls: ComponentStory<typeof WearablePreview> = () => {
  return (
    <div className="WearablePreview-story-container">
      <WearablePreview
        id="some-id"
        profile="default"
        emote={PreviewEmote.DANCE}
        disableBackground
        disableAutoRotate
        disableFace
        disableDefaultWearables
        skin="000000"
      />
      <EmoteControls wearablePreviewId="some-id" />
    </div>
  )
}
WithEmoteControls.storyName = 'With emote controls'

export const WithSound: ComponentStory<typeof WearablePreview> = () => {
  return (
    <div className="WearablePreview-story-container">
      <WearablePreview
        id="some-id"
        profile="default"
        contractAddress="0x8d8a55def3df0f3979819e52d67047e77c12aaaa"
        itemId="0"
        dev
        disableBackground
        disableAutoRotate
        disableFace
        disableDefaultWearables
        skin="000000"
      />
      <EmoteControls wearablePreviewId="some-id" />
    </div>
  )
}
WithSound.storyName = 'With sound'

export const EmoteEvents: ComponentStory<typeof WearablePreview> = () => {
  const [goTo, setGoTo] = React.useState('0')
  const [screenshot, setScreenshot] = React.useState('')
  const [length, setLength] = React.useState('')
  const ref = React.useRef<IPreviewController | null>(null)
  const onLoad = React.useCallback(() => {
    ref.current = ref.current ?? WearablePreview.createController('some-id')
  }, [])
  return (
    <div className="WearablePreview-story-container">
      <WearablePreview
        id="some-id"
        profile="default"
        emote={PreviewEmote.DANCE}
        disableBackground
        disableAutoRotate
        disableFace
        disableDefaultWearables
        skin="000000"
        onLoad={onLoad}
      />
      <Row className="controls">
        <Button primary onClick={() => ref.current.emote.play()}>
          Play
        </Button>
        <Button primary onClick={() => ref.current.emote.pause()}>
          Pause
        </Button>
        <Button primary onClick={() => ref.current.emote.stop()}>
          Stop
        </Button>
        <input
          className="seconds"
          type="number"
          value={goTo}
          onChange={(e) => setGoTo(e.target.value)}
        />
        <Button
          primary
          className="goto"
          onClick={() => {
            const parsed = parseFloat(goTo)
            if (!isNaN(parsed)) {
              ref.current.emote.goTo(parsed)
            }
          }}
        >
          Go To
        </Button>
        <Button
          primary
          onClick={() =>
            ref.current.scene.getScreenshot(1024, 1024).then(setScreenshot)
          }
        >
          Screenshot
        </Button>
        <Button
          primary
          onClick={() =>
            ref.current.emote
              .getLength()
              .then((value) => setLength(value.toFixed(2)))
          }
        >
          Get Length
        </Button>
        {screenshot && <img src={screenshot} />}
        {!!length && <p>Length: {length} seconds</p>}
      </Row>
    </div>
  )
}
EmoteEvents.storyName = 'Emote events'

export const PreviewFromAFile: ComponentStory<typeof WearablePreview> = () => {
  const inputRef = React.useRef<HTMLInputElement>()
  const [file, setFile] = React.useState<File | null>(null)
  return (
    <div className="WearablePreview-story-container">
      {file ? (
        <WearablePreview blob={toWearableWithBlobs(file)} />
      ) : (
        <Center>
          <input
            type="file"
            ref={inputRef}
            onChange={() => setFile(inputRef.current.files[0])}
          />
        </Center>
      )}
    </div>
  )
}
PreviewFromAFile.storyName = 'Preview from a file'

export const EmoteThumbnailPicker: ComponentStory<typeof WearablePreview> =
  () => {
    const inputRef = React.useRef<HTMLInputElement>()
    const [file, setFile] = React.useState<File | null>(null)
    const [screenshot, setScreenshot] = React.useState('')
    const [length, setLength] = React.useState(0)
    const ref = React.useRef<IPreviewController | null>(null)
    const onLoad = React.useCallback(async () => {
      ref.current =
        ref.current ?? WearablePreview.createController('thumbnail-picker')
      setLength(await ref.current.emote.getLength())
    }, [])
    return (
      <div className="WearablePreview-story-container">
        {file ? (
          <>
            <WearablePreview
              id="thumbnail-picker"
              blob={file ? toEmoteWithBlobs(file) : undefined}
              profile="default"
              disableBackground
              disableAutoRotate
              disableFace
              disableDefaultWearables
              skin="000000"
              wheelZoom={2}
              onLoad={onLoad}
              disableDefaultEmotes
            />
            <Row className="controls">
              <Button
                primary
                onClick={() =>
                  ref.current.scene
                    .getScreenshot(1024, 1024)
                    .then(setScreenshot)
                }
              >
                Screenshot
              </Button>
              {screenshot && <img src={screenshot} />}
              {length > 0 && (
                <span className="slider">
                  <SliderField
                    header=""
                    min={0}
                    max={length * 100}
                    onChange={async (_, value) => {
                      await ref.current.emote.pause()
                      await ref.current.emote.goTo(value / 100)
                    }}
                  />
                </span>
              )}
            </Row>
            <EmoteControls wearablePreviewId="thumbnail-picker" />
          </>
        ) : (
          <Center>
            <input
              type="file"
              ref={inputRef}
              onChange={() => setFile(inputRef.current.files[0])}
            />
          </Center>
        )}
      </div>
    )
  }
EmoteThumbnailPicker.storyName = 'Emote thumbnail picker'

export const WithOffset: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview profile="default" offsetY={0.5} offsetX={0.5} />
  </div>
)
WithOffset.storyName = 'With offset'

export const CameraFromTheFront: ComponentStory<typeof WearablePreview> =
  () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0x9449bc0ef0108d2af6f1031aa5a51a3a830d59c2"
        itemId="0"
        cameraX={0}
        cameraY={0}
        cameraZ={3}
        disableAutoRotate
      />
    </div>
  )
CameraFromTheFront.storyName = 'Camera from the front'

export const CameraFromTheTop: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      contractAddress="0xf3eb38b1649bdccc8761f3a0526b3173597a0363"
      itemId="2"
      cameraX={0}
      cameraY={2}
      cameraZ={0}
      disableAutoRotate
    />
  </div>
)
CameraFromTheTop.storyName = 'Camera from the top'

export const DifferentProjections: ComponentStory<typeof WearablePreview> =
  () => (
    <div className="WearablePreview-story-container">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <div style={{ width: 512, height: 512, display: 'inline-block' }}>
          <WearablePreview
            contractAddress="0xf3eb38b1649bdccc8761f3a0526b3173597a0363"
            itemId="2"
            projection={PreviewProjection.ORTHOGRAPHIC}
            disableAutoRotate
          />
        </div>
        <div style={{ width: 512, height: 512, display: 'inline-block' }}>
          <WearablePreview
            contractAddress="0xf3eb38b1649bdccc8761f3a0526b3173597a0363"
            itemId="2"
            projection={PreviewProjection.PERSPECTIVE}
            disableAutoRotate
          />
        </div>
      </div>
    </div>
  )
DifferentProjections.storyName = 'Different projections'

export const CustomPeerUrl: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      profile="default"
      peerUrl="https://peer.decentraland.zone"
    />
  </div>
)
CustomPeerUrl.storyName = 'Custom peer url'

export const WithoutFadeEffect: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6"
      disableFadeEffect
    />
  </div>
)
WithoutFadeEffect.storyName = 'Without fade effect'

export const WithoutPanning: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6"
      panning={false}
    />
  </div>
)
WithoutPanning.storyName = 'Without panning'

export const WithLockedAlpha: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6"
      lockAlpha={true}
    />
  </div>
)
WithLockedAlpha.storyName = 'With locked alpha'

export const WithLockedBeta: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6"
      lockBeta={true}
    />
  </div>
)
WithLockedBeta.storyName = 'With locked beta'

export const WithLockedRadius: ComponentStory<typeof WearablePreview> = () => (
  <div className="WearablePreview-story-container">
    <WearablePreview
      profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6"
      lockRadius={true}
    />
  </div>
)
WithLockedRadius.storyName = 'With locked radius'
