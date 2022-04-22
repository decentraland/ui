import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { PreviewCamera, PreviewEmote } from '@dcl/schemas/dist/dapps/preview'
import { WearableBodyShape } from '@dcl/schemas/dist/platform/wearables'
import { WearablePreview } from './WearablePreview'
import { Navbar } from '../Navbar/Navbar'
import { Tabs } from '../Tabs/Tabs'
import { Page } from '../Page/Page'
import { Hero } from '../Hero/Hero'
import { Container } from '../Container/Container'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import './WearablePreview.stories.css'

const getRandomHex = () => {
  return '#' + Math.random().toString(16).slice(2, 8)
}

const RandomConfigProvider = (props: {
  children: (hair: string, skin: string) => React.ReactElement
}) => {
  const [hair, setHair] = React.useState(getRandomHex())
  const [skin, setSkin] = React.useState(getRandomHex())
  React.useEffect(() => {
    setInterval(() => {
      setHair(getRandomHex())
      setSkin(getRandomHex())
    }, 5000)
  }, [])
  return props.children(hair, skin)
}

storiesOf('WearablePreview', module)
  .add('Preview an item', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xee8ae4c668edd43b34b98934d6d2ff82e41e6488"
        itemId="5"
      />
    </div>
  ))
  .add('Preview a token', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xee8ae4c668edd43b34b98934d6d2ff82e41e6488"
        tokenId="1"
      />
    </div>
  ))
  .add('Preview a token from ropsten', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0x07e2a8fce1eb1ddf8e7d8de3f86654abe32eb97f"
        tokenId="1"
        dev={true}
      />
    </div>
  ))
  .add('Preview a texture wearable', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xfeb52cbf71b9adac957c6f948a6cf9980ac8c907"
        tokenId="3073"
      />
    </div>
  ))
  .add('Using custom skin', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0x994684b980d6faff06ff36b13c243c31d1b3aa0e"
        itemId="0"
        skin="ff0000"
      />
    </div>
  ))
  .add('Using custom hair', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xe3d2c4ec777fb88dd219905cd896f79a592adf30"
        itemId="0"
        hair="00ff00"
      />
    </div>
  ))
  .add('Using custom shape', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xe3d2c4ec777fb88dd219905cd896f79a592adf30"
        itemId="0"
        hair="00ff00"
        bodyShape={WearableBodyShape.FEMALE}
      />
    </div>
  ))
  .add('Using a profile', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6" />
    </div>
  ))
  .add('Using a profile + emote', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6"
        emote={PreviewEmote.FASHION}
      />
    </div>
  ))
  .add('Using a wearable preview + profile + emote', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0x186c788f9c172934b790b868faf3b78b84e34e89"
        itemId="0"
        profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6"
        emote={PreviewEmote.FASHION}
      />
    </div>
  ))
  .add('Using static camera', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        profile="0xc85a0a34d5f9f2239ab0622a41a2c2560ff119c6"
        camera={PreviewCamera.STATIC}
      />
    </div>
  ))
  .add('Using onLoad callback', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="0xee8ae4c668edd43b34b98934d6d2ff82e41e6488"
        itemId="5"
        onLoad={() => console.log('loaded!')}
      />
    </div>
  ))
  .add('Using onError callback', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        contractAddress="invalidAddress"
        itemId="invalidItem"
        onError={(error) => console.error(error.message)}
      />
    </div>
  ))
  .add('Use as Hero', () => (
    <div className="WearablePreview-story-container">
      <Navbar isFullscreen activePage="marketplace" />
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
  ))
  .add('With hot reload', () => (
    <div className="WearablePreview-story-container">
      <RandomConfigProvider>
        {(hair, skin) => (
          <WearablePreview
            profile="default"
            hair={hair}
            skin={skin}
            onLoad={() => console.log('loaded!')}
          />
        )}
      </RandomConfigProvider>
    </div>
  ))
  .add('From URL', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        urls={[
          'https://gist.githubusercontent.com/cazala/7e66253d2b86f018ee599cf9da007b81/raw/dfb411a0cff38d1b128efe4f7eca80fa2e04e84d/wearable.json'
        ]}
      />
    </div>
  ))
  .add('From base64', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        base64s={[
          'eyJpZCI6InVybjpkZWNlbnRyYWxhbmQ6bWF0aWM6Y29sbGVjdGlvbnMtdjI6MHhlNzkzODAxODI5ZTBlMGY5YWE1YmFmOTg3NzMyMDA1OWQ5ZjRhNjU0OjAiLCJuYW1lIjoiV2Fja3kgQWxpZW4gQnVja2V0IEhhdCIsImRlc2NyaXB0aW9uIjoiU2xpbXkgSGFpciBpcyBhIGZpeGVkIGNvbG91ci4uLiIsImNvbGxlY3Rpb25BZGRyZXNzIjoiMHhlNzkzODAxODI5ZTBlMGY5YWE1YmFmOTg3NzMyMDA1OWQ5ZjRhNjU0IiwicmFyaXR5IjoibGVnZW5kYXJ5IiwiaTE4biI6W3siY29kZSI6ImVuIiwidGV4dCI6IldhY2t5IEFsaWVuIEJ1Y2tldCBIYXQifV0sImRhdGEiOnsicmVwbGFjZXMiOltdLCJoaWRlcyI6WyJoYWlyIl0sInRhZ3MiOlsid2Fja3lhbGllbiIsIndhY2t5IiwiYWxpZW4iLCJidWNrZXRoYXQiLCJzbGltZSIsIjE2MjAiLCJqdWRhc2p1ZGFzIl0sImNhdGVnb3J5IjoiaGF0IiwicmVwcmVzZW50YXRpb25zIjpbeyJib2R5U2hhcGVzIjpbInVybjpkZWNlbnRyYWxhbmQ6b2ZmLWNoYWluOmJhc2UtYXZhdGFyczpCYXNlTWFsZSJdLCJtYWluRmlsZSI6Im1hbGUvZnJvZ2dseU1BTEVfYmFzZS5nbGIiLCJjb250ZW50cyI6W3sia2V5IjoibWFsZS9mcm9nZ2x5TUFMRV9iYXNlLmdsYiIsInVybCI6Imh0dHBzOi8vcGVlci1lYzEuZGVjZW50cmFsYW5kLm9yZy9jb250ZW50L2NvbnRlbnRzL1FtZUNxNzV2TE1EdGtYeWFXWTNKejc3RmdEQ2paaTNGSFQxWjVKbTR6VG9HcG0ifV0sIm92ZXJyaWRlSGlkZXMiOlsiaGFpciJdLCJvdmVycmlkZVJlcGxhY2VzIjpbXX0seyJib2R5U2hhcGVzIjpbInVybjpkZWNlbnRyYWxhbmQ6b2ZmLWNoYWluOmJhc2UtYXZhdGFyczpCYXNlRmVtYWxlIl0sIm1haW5GaWxlIjoiZmVtYWxlL2Zyb2dnbHlGRU1BTEVfYmFzZS5nbGIiLCJjb250ZW50cyI6W3sia2V5IjoiZmVtYWxlL2Zyb2dnbHlGRU1BTEVfYmFzZS5nbGIiLCJ1cmwiOiJodHRwczovL3BlZXItZWMxLmRlY2VudHJhbGFuZC5vcmcvY29udGVudC9jb250ZW50cy9RbVFGa0xHczUzMnhjZUZjb0NKYm5xWXExVlBzOGRleDVLMXdrWm8yQXhqajdZIn1dLCJvdmVycmlkZUhpZGVzIjpbImhhaXIiXSwib3ZlcnJpZGVSZXBsYWNlcyI6W119XX0sImltYWdlIjoiaHR0cHM6Ly9wZWVyLWVjMS5kZWNlbnRyYWxhbmQub3JnL2NvbnRlbnQvY29udGVudHMvUW1XUEczY0phVmMxaEVCa0tpZ2E2NWtVeGIzZ2g0cFp6RDN3Y0pWb1laR0VwQiIsInRodW1ibmFpbCI6Imh0dHBzOi8vcGVlci1lYzEuZGVjZW50cmFsYW5kLm9yZy9jb250ZW50L2NvbnRlbnRzL1FtWUY3OXZZNkNFamVyUlFEOU1Hd01WWTV0NWJlWjY5UjlEMmQ5U0tKRFNQNzUiLCJtZXRyaWNzIjp7InRyaWFuZ2xlcyI6MTQ4NywibWF0ZXJpYWxzIjoyLCJ0ZXh0dXJlcyI6MiwibWVzaGVzIjoyLCJib2RpZXMiOjIsImVudGl0aWVzIjoxfX0='
        ]}
      />
    </div>
  ))
  .add('Without auto rotation', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview profile="default" autoRotateSpeed={0} />
    </div>
  ))
  .add('With offset and zoom', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview
        profile="default"
        zoom={100}
        offsetY={0.5}
        offsetZ={-0.1}
      />
    </div>
  ))
  .add('With transparent background', () => (
    <div className="WearablePreview-story-container">
      <WearablePreview profile="default" transparentBackground />
    </div>
  ))
