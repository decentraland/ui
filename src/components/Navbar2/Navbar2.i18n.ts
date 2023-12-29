import { config } from '../../config'
import { Navbar2I18N } from './Navbar2.types'

export const i18n = {
  menu: {
    marketplace: {
      main: 'Marketplace',
      column1: [
        {
          title: 'Overview',
          description: "See what's trending & new",
          url: config.get('MARKETPLACE_URL')
        },
        {
          title: 'NAMEs',
          description: 'Claim a NAME, get a whole World',
          url: config.get('MARKETPLACE_NAMES_URL')
        }
      ],
      column2: [
        {
          title: 'Wearables',
          description: 'Customize your digital identity',
          url: config.get('MARKETPLACE_WEARABLES_URL')
        },
        {
          title: 'LAND',
          description: 'Buy or Rent parcels on the Genesis City map',
          url: config.get('MARKETPLACE_LANDS_URL')
        }
      ],
      column3: [
        {
          title: 'Emotes',
          description: 'Animate your avatar',
          url: config.get('MARKETPLACE_EMOTES_URL')
        },
        {
          title: 'My Assets',
          description: 'Manage your assets, listings, bids, &and more',
          url: config.get('MARKETPLACE_MY_ASSETS_URL')
        }
      ]
    },
    create: {
      main: 'Create',
      column1Title: 'PUBLISH',
      column1: [
        {
          title: 'Wearables & Emotes',
          description: 'Publish & manage Marketplace collections',
          url: config.get('BUILDER_WEARABLE_EMOTES_URL')
        },
        {
          title: 'Scenes',
          description: 'Create & publish scenes to LAND or Worlds',
          url: config.get('BUILDER_SCENES_URL')
        }
      ],
      column2Title: 'MANAGE',
      column2: [
        {
          title: 'My NAMEs',
          description: 'Create & manage NAMEs',
          url: config.get('BUILDER_NAMES_URL')
        },
        {
          title: 'My Worlds',
          description: 'Manage Worlds & Worlds storage',
          url: config.get('BUILDER_WORLDS_URL')
        },
        {
          title: 'My LAND',
          description: 'Manage parcel permissions & more',
          url: config.get('BUILDER_LAND_URL')
        }
      ],
      column3Title: 'HIRE',
      column3: [
        {
          title: 'Decentraland Studios',
          description: 'Hire pros to transform your ideas to reality',
          url: config.get('STUDIOS_URL'),
          isExternal: true
        }
      ]
    },
    explore: {
      main: 'Explore',
      column1: [
        {
          title: 'Events',
          description: 'Find an event to jump into',
          url: config.get('EVENTS_URL')
        },
        {
          title: 'My Events',
          description: 'See saved events & events you’re hosting',
          url: config.get('EVENTS_MY_EVENTS_URL')
        }
      ],
      column2: [
        {
          title: 'Places',
          description: 'Browse locations in Genesis City & Worlds',
          url: config.get('PLACES_URL')
        },
        {
          title: 'My Favorite Places',
          description: 'See your saved locations',
          url: config.get('PLACES_MY_FAVORITE_URL')
        }
      ]
    },
    learn: {
      main: 'Learn',
      column1: [
        {
          title: 'About Decentraland',
          description: 'FAQs, Whitepaper, & DAO docs',
          url: config.get('DOCS_ABOUT_URL')
        },
        {
          title: 'Creator Docs',
          description: 'Make Wearables, Emotes, scenes, games, & more',
          url: config.get('DOCS_CREATORS_URL')
        }
      ],
      column2: [
        {
          title: 'Blog',
          description: 'News, Community Highlights, & more',
          url: config.get('BLOG_URL'),
          isExternal: true
        },
        {
          title: 'Open Protocol Docs',
          description: 'See how Decentraland works & contribute',
          url: config.get('DOCS_CONTRIBUTOR_URL')
        }
      ]
    },
    governance: {
      main: 'Governance',
      column1: [
        {
          title: 'Overview',
          description: 'The latest in Decentraland governance',
          url: config.get('GOVERNANCE_URL')
        },
        {
          title: 'DAO Transparency',
          description: 'Treasury, Activity Dashboards, & more',
          url: config.get('GOVERNANCE_TRANSPARENCY_URL')
        }
      ],
      column2: [
        {
          title: 'Proposals',
          description: 'Vote on active proposals',
          url: config.get('GOVERNANCE_PROPOSALS_URL')
        },
        {
          title: 'DAO Grants',
          description: 'Fund your project, contribute to the platform.',
          url: config.get('DAO_GRANTS_URL'),
          isExternal: true
        }
      ],
      column3: [
        {
          title: 'Active Grants',
          description: 'Browse grant-funded community projects',
          url: config.get('GOVERNANCE_PROJECTS_URL')
        },
        {
          title: 'DAO Docs',
          description: 'Learn about the DAO & how to participate',
          url: config.get('DOCS_DAO_URL')
        }
      ]
    }
  },
  account: {
    signIn: 'Sign In',
    connecting: 'Connecting...'
  }
} as Navbar2I18N
