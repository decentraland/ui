import { config } from '../../config'
import { Navbar2SubmenuProps, Navbar2MenuI18nProps } from './Navbar2.types'

export const navbarMainTitlesI18N = {
  marketplace: 'marketplace',
  create: 'create',
  explore: 'explore',
  learn: 'learn',
  governance: 'governance'
} as Navbar2MenuI18nProps

export const navbarSubmenu = {
  marketplace: {
    column1: [
      {
        title: 'Overview',
        description: "See what's trending & new",
        url: config.get('MARKETPLACE_URL'),
        eventTrackingName: 'marketplace_overview'
      },
      {
        title: 'NAMEs',
        description: 'Claim a NAME, get a whole World',
        url: config.get('MARKETPLACE_NAMES_URL'),
        eventTrackingName: 'marketplace_names'
      }
    ],
    column2: [
      {
        title: 'Wearables',
        description: 'Customize your digital identity',
        url: config.get('MARKETPLACE_WEARABLES_URL'),
        eventTrackingName: 'marketplace_wearables'
      },
      {
        title: 'LAND',
        description: 'Buy or Rent parcels on the Genesis City map',
        url: config.get('MARKETPLACE_LANDS_URL'),
        eventTrackingName: 'marketplace_lands'
      }
    ],
    column3: [
      {
        title: 'Emotes',
        description: 'Animate your avatar',
        url: config.get('MARKETPLACE_EMOTES_URL'),
        eventTrackingName: 'marketplace_emotes'
      },
      {
        title: 'My Assets',
        description: 'Manage your assets, listings, bids, &and more',
        url: config.get('MARKETPLACE_MY_ASSETS_URL'),
        eventTrackingName: 'marketplace_my_assets'
      }
    ]
  },
  create: {
    column1Title: 'PUBLISH',
    column1: [
      {
        title: 'Wearables & Emotes',
        description: 'Publish & manage Marketplace collections',
        url: config.get('BUILDER_WEARABLE_EMOTES_URL'),
        eventTrackingName: 'builder_wearables_emotes'
      },
      {
        title: 'Scenes',
        description: 'Create & publish scenes to LAND or Worlds',
        url: config.get('BUILDER_SCENES_URL'),
        eventTrackingName: 'builder_scenes'
      }
    ],
    column2Title: 'MANAGE',
    column2: [
      {
        title: 'My NAMEs',
        description: 'Create & manage NAMEs',
        url: config.get('BUILDER_NAMES_URL'),
        eventTrackingName: 'builder_names'
      },
      {
        title: 'My Worlds',
        description: 'Manage Worlds & Worlds storage',
        url: config.get('BUILDER_WORLDS_URL'),
        eventTrackingName: 'builder_worlds'
      },
      {
        title: 'My LAND',
        description: 'Manage parcel permissions & more',
        url: config.get('BUILDER_LAND_URL'),
        eventTrackingName: 'builder_land'
      }
    ],
    column3Title: 'HIRE',
    column3: [
      {
        title: 'Decentraland Studios',
        description: 'Hire pros to transform your ideas to reality',
        url: config.get('STUDIOS_URL'),
        eventTrackingName: 'studios',
        isExternal: true
      }
    ]
  },
  explore: {
    column1: [
      {
        title: 'Events',
        description: 'Find an event to jump into',
        url: config.get('EVENTS_URL'),
        eventTrackingName: 'events'
      },
      {
        title: 'My Events',
        description: 'See saved events & events you’re hosting',
        url: config.get('EVENTS_MY_EVENTS'),
        eventTrackingName: 'events_my_events'
      }
    ],
    column2: [
      {
        title: 'Places',
        description: 'Browse locations in Genesis City & Worlds',
        url: config.get('PLACES_URL'),
        eventTrackingName: 'places'
      },
      {
        title: 'My Favorite Places',
        description: 'See your saved locations',
        url: config.get('PLACES_MY_FAVORITE_URL'),
        eventTrackingName: 'places_my_favorite'
      }
    ]
  },
  learn: {
    column1: [
      {
        title: 'About Decentraland',
        description: 'FAQs, Whitepaper, & DAO docs',
        url: config.get('DOCS_ABOUT_URL'),
        eventTrackingName: 'docs_about'
      },
      {
        title: 'Creator Docs',
        description: 'Make Wearables, Emotes, scenes, games, & more',
        url: config.get('DOCS_CREATORS_URL'),
        eventTrackingName: 'docs_creators'
      }
    ],
    column2: [
      {
        title: 'Blog',
        description: 'News, Community Highlights, & more',
        url: config.get('BLOG_URL'),
        eventTrackingName: 'blog',
        isExternal: true
      },
      {
        title: 'Open Protocol Docs',
        description: 'See how Decentraland works & contribute',
        url: config.get('DOCS_CONTRIBUTOR_URL'),
        eventTrackingName: 'docs_contributor'
      }
    ]
  },
  governance: {
    column1: [
      {
        title: 'Overview',
        description: 'The latest in Decentraland governance',
        url: config.get('GOVERNANCE_URL'),
        eventTrackingName: 'governance_overview'
      },
      {
        title: 'DAO Transparency',
        description: 'Treasury, Activity Dashboards, & more',
        url: config.get('GOVERNANCE_TRANSPARENCY_URL'),
        eventTrackingName: 'governance_transparency'
      }
    ],
    column2: [
      {
        title: 'Proposals',
        description: 'Vote on active proposals',
        url: config.get('GOVERNANCE_PROPOSALS_URL'),
        eventTrackingName: 'governance_proposals'
      },
      {
        title: 'DAO Grants',
        description: 'Community grants overview, highlights, & resources',
        url: config.get('DAO_GRANTS_URL'),
        eventTrackingName: 'dao_grants',
        isExternal: true
      }
    ],
    column3: [
      {
        title: 'Active Grants',
        description: 'Browse grant-funded community projects',
        url: config.get('GOVERNANCE_PROJECTS_URL'),
        eventTrackingName: 'governance_active_grants'
      },
      {
        title: 'DAO Docs',
        description: 'Learn about the DAO & how to participate',
        url: config.get('DOCS_DAO_URL'),
        eventTrackingName: 'docs_dao'
      }
    ]
  }
} as Navbar2SubmenuProps
