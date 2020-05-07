import * as React from 'react'
import { MenuItem, Icon } from 'semantic-ui-react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { UserMenu } from './UserMenu'
import { Avatar } from '../../types/avatar'

const avatar: Avatar = {
  userId: '0xec6e6c0841a2ba474e92bf42baf76bfe80e8657c',
  email: '',
  name: 'cazala',
  hasClaimedName: true,
  description: 'javascript sexmachine',
  ethAddress: '0xec6e6c0841a2ba474e92bf42baf76bfe80e8657c',
  version: 46,
  avatar: {
    bodyShape: 'dcl://base-avatars/BaseMale',
    snapshots: {
      face:
        'https://peer.decentraland.org/content/contents/QmQtAtwR4DyrCiP7tHpdUiJXbNKmUJo2JrbMhHkwNZjs3y',
      body:
        'https://peer.decentraland.org/content/contents/QmYchnHPEdeeNWnUJik6hKV3vELtzUrfK5QvUhgywoUpFG'
    },
    eyes: {
      color: { r: 0.37109375, g: 0.22265625, b: 0.1953125, a: 1 }
    },
    hair: {
      color: {
        r: 0.92578125,
        g: 0.91015625,
        b: 0.88671875,
        a: 1
      }
    },
    skin: {
      color: { r: 0.8671875, g: 0.6953125, b: 0.5625, a: 1 }
    },
    wearables: [
      'dcl://base-avatars/eyes_00',
      'dcl://base-avatars/eyebrows_00',
      'dcl://base-avatars/mouth_00',
      'dcl://base-avatars/beard',
      'dcl://halloween_2019/vampire_lower_body',
      'dcl://base-avatars/semi_bold',
      'dcl://dcl_launch/dcl_hoodie_upper_body',
      'dcl://halloween_2019/frankie_feet',
      'dcl://xmas_2019/xmas_light_ball_earring',
      'dcl://halloween_2019/classic_top_hat',
      'dcl://stay_safe/protection_mask_funny_mask'
    ],
    version: 47
  },
  inventory: [
    'dcl://exclusive_masks/asian_fox',
    'dcl://halloween_2019/vampire_lower_body',
    'dcl://halloween_2019/zombie_suit_upper_body',
    'dcl://halloween_2019/frankie_lower_body',
    'dcl://halloween_2019/frankie_feet',
    'dcl://halloween_2019/happy_pumpkin_helmet',
    'dcl://halloween_2019/vampire_feet',
    'dcl://halloween_2019/zombie_suit_mask',
    'dcl://halloween_2019/vampire_hair',
    'dcl://halloween_2019/zombie_suit_feet',
    'dcl://halloween_2019/zombie_suit_mask',
    'dcl://halloween_2019/zombie_suit_upper_body',
    'dcl://halloween_2019/frankie_lower_body',
    'dcl://halloween_2019/frankie_feet',
    'dcl://halloween_2019/vampire_upper_body',
    'dcl://halloween_2019/zombie_suit_lower_body',
    'dcl://halloween_2019/zombie_suit_upper_body',
    'dcl://halloween_2019/funny_skull_mask',
    'dcl://halloween_2019/bloody_knife_headband_top_head',
    'dcl://halloween_2019/sad_clown_lower_body',
    'dcl://halloween_2019/sad_clown_feet',
    'dcl://halloween_2019/mariachi_hat',
    'dcl://halloween_2019/sad_clown_upper_body',
    'dcl://halloween_2019/sad_clown_mask',
    'dcl://halloween_2019/classic_top_hat',
    'dcl://halloween_2019/mexican_hat',
    'dcl://halloween_2019/monkey_skull_mask',
    'dcl://xmas_2019/xmas_sockets_feet',
    'dcl://xmas_2019/xmas_light_ball_earring',
    'dcl://xmas_2019/xmas_ball_earring',
    'dcl://xmas_2019/xmas_light_tree_earring',
    'dcl://xmas_2019/xmas_elf_hat',
    'dcl://mch_collection/mch_fukuzawa_upper_body',
    'dcl://dcl_launch/dcl_hoodie_upper_body',
    'dcl://dcl_launch/launch_tshirt_upper_body',
    'dcl://dcl_launch/dcl_hat_hat',
    'dcl://dcl_launch/dcl_earrings_earring',
    'dcl://community_contest/cw_hot_dog_top_head',
    'dcl://community_contest/cw_smiley_alien_hat',
    'dcl://stay_safe/protection_mask_funny_mask',
    'dcl://stay_safe/protection_mask_hot_mask'
  ],
  tutorialStep: 99
}

storiesOf('AvatarFace', module)
  .addDecorator(centered)
  .add('Signed out', () => <UserMenu />)
  .add('Signed in', () => <UserMenu isSignedIn avatar={avatar} />)
  .add('Guest', () => <UserMenu isSignedIn />)
  .add('Clickable profile', () => (
    <UserMenu isSignedIn avatar={avatar} onClickProfile={() => {}} />
  ))
  .add('Extra actions', () => (
    <UserMenu
      isSignedIn
      avatar={avatar}
      menuItems={
        <>
          <MenuItem>
            <Icon name="users" />
            &nbsp;Friends
          </MenuItem>
          <MenuItem>
            <Icon name="cog" />
            &nbsp;Settings
          </MenuItem>
        </>
      }
    />
  ))
