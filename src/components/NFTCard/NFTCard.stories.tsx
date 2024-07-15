import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NFTCard } from './NFTCard'

export default {
  title: 'NFTCard',
  component: NFTCard
} as ComponentMeta<typeof NFTCard>

const Template: ComponentStory<typeof NFTCard> = (args) => <NFTCard {...args} />

export const Wearable = Template.bind({})
Wearable.args = {
  price: '10',
  nft: {
    id: 'wearable-test',
    tokenId: '1',
    contractAddress: '0xaa40af0b4a18e0555ff3c87beab1d5b591947add',
    category: 'wearable',
    activeOrderId: null,
    openRentalId: null,
    owner: '0xa4f689625f6f51adf691a64d38772be8509087d2',
    name: 'Boxing Gloves with a long long long long long name',
    image:
      'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:mumbai:collections-v2:0xaa40af0b4a18e0555ff3c87beab1d5b591947abe:0/thumbnail',
    url: '/contracts/0xaa40af0b4a18e0555ff3c87beab1d5b591947abe/tokens/1',
    data: {
      wearable: {
        bodyShapes: ['BaseMale', 'BaseFemale'],
        category: 'hands_wear',
        description: '',
        rarity: 'common',
        isSmart: false
      }
    },
    issuedId: '1',
    itemId: '0',
    network: 'MATIC',
    chainId: 80001,
    createdAt: 1691090569000,
    updatedAt: 1691090569000,
    soldAt: 0,
    urn: 'urn:decentraland:mumbai:collections-v2:wearable-test:0'
  }
}

export const Emote = Template.bind({})
Emote.args = {
  price: '1000',
  nft: {
    id: 'emote-test',
    tokenId: '2',
    contractAddress: '0x2e57cf122eae1ba0f4b2fe02101558eb4b4eea23',
    category: 'emote',
    activeOrderId: null,
    openRentalId: null,
    owner: '0xa4f689625f6f51adf691a64d38772be8509087d2',
    name: 'Lovegrenadewithsound',
    image:
      'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:mumbai:collections-v2:0x2e57cf122eae1ba0f4b2fe02101558eb4b4eea23:1/thumbnail',
    url: '/contracts/0x2e57cf122eae1ba0f4b2fe02101558eb4b4eea23/tokens/105312291668557186697918027683670432318895095400549111254310977538',
    data: {
      emote: {
        bodyShapes: ['BaseMale', 'BaseFemale'],
        category: 'greetings',
        description: '',
        rarity: 'unique',
        loop: false,
        hasSound: true,
        hasGeometry: true
      }
    },
    issuedId: '2',
    itemId: '1',
    network: 'MATIC',
    chainId: 80001,
    createdAt: 1695732723000,
    updatedAt: 1695732723000,
    soldAt: 0,
    urn: 'urn:decentraland:mumbai:collections-v2:0x2e57cf122eae1ba0f4b2fe02101558eb4b4eea23:1'
  }
}

export const Parcel = Template.bind({})
Parcel.args = {
  nft: {
    id: '1-2',
    tokenId: '8847341539944400050047739793225973497876',
    contractAddress: '0x42f4ba48791e2de32f5fbf553441c2672864bb33',
    activeOrderId: null,
    openRentalId: null,
    owner: '0x03eb0bef2bdbc89bff468f5bd6e6b559f3bb61e6',
    name: 'Parcel',
    image: 'https://api.decentraland.org/v1/parcels/26/20/map.png',
    url: '/contracts/0x42f4ba48791e2de32f5fbf553441c2672864bb33/tokens/8847341539944400050047739793225973497876',
    data: {
      parcel: {
        description: null,
        x: '26',
        y: '20',
        estate: null
      }
    },
    issuedId: null,
    itemId: null,
    category: 'parcel',
    network: 'ETHEREUM',
    chainId: 11155111,
    createdAt: 1689742440000,
    updatedAt: 1689742440000,
    soldAt: 0
  }
}

export const Estate = Template.bind({})
Estate.args = {
  nft: {
    id: '0x959e104e1a4db6317fa58f8295f586e1a978c297-5568',
    tokenId: '5568',
    contractAddress: '0x959e104e1a4db6317fa58f8295f586e1a978c297',
    activeOrderId:
      '0xe4134640a4c81e2443a70b02d5e616dc5cab3ccc94bec19807dd10115fc955b9',
    openRentalId: null,
    owner: '0x13936d1369dda5bd295d24bb69dae4e3c6586312',
    name: 'shop 7',
    image: 'https://api.decentraland.org/v1/estates/5568/map.png',
    url: '/contracts/0x959e104e1a4db6317fa58f8295f586e1a978c297/tokens/5568',
    data: {
      estate: {
        description: null,
        size: 2,
        parcels: [
          {
            x: 104,
            y: 54
          },
          {
            x: 105,
            y: 54
          }
        ]
      }
    },
    issuedId: null,
    itemId: null,
    category: 'estate',
    network: 'ETHEREUM',
    chainId: 1,
    createdAt: 1695892187000,
    updatedAt: 1696000955000,
    soldAt: 0
  },
  href: 'https://decentraland.org/marketplace'
}
export const ENS = Template.bind({})
ENS.args = {
  nft: {
    id: '0x7518456ae93eb98f3e64571b689c626616bb7f30-99973385244939087850806505944511194249152123896043388233553873349152167589727',
    tokenId:
      '99973385244939087850806505944511194249152123896043388233553873349152167589727',
    contractAddress: '0x7518456ae93eb98f3e64571b689c626616bb7f30',
    activeOrderId: null,
    openRentalId: null,
    owner: '0xa4f689625f6f51adf691a64d38772be8509087d2',
    name: 'melitest3',
    image: '',
    url: '/contracts/0x7518456ae93eb98f3e64571b689c626616bb7f30/tokens/99973385244939087850806505944511194249152123896043388233553873349152167589727',
    data: {
      ens: {
        subdomain: 'melitest3'
      }
    },
    issuedId: null,
    itemId: null,
    category: 'ens',
    network: 'ETHEREUM',
    chainId: 11155111,
    createdAt: 1689710628000,
    updatedAt: 1689710628000,
    soldAt: 0
  }
}
