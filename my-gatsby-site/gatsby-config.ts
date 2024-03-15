import type {GatsbyConfig} from 'gatsby'

require('dotenv').config()

console.log('ENV', process.env.GATSBY_LENS_API_URL)

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: true
  },
  plugins: [
    {
      resolve: `gatsby-plugin-jaen`,
      options: {
        remote: {
          repository: 'atsnek/jaen-starter'
        },
        zitadel: {
          organizationId: '257964756269268995',
          clientId: '252746210698395651@services',
          authority: 'https://accounts.cronit.io',
          redirectUri: 'http://localhost:8000'
        },
        googleAnalytics: {
          trackingIds: ['G-M58K75M9PG']
        },
        sentry: {
          org: 'cronit',
          project: 'jaen-my-gatsby-site',
          dsn: 'https://9e15c957720ebd3bac676b0609956651@o4506263462871040.ingest.us.sentry.io/4506891526733824'
        }
      }
    },
    `gatsby-jaen-mailpress`,
    'gatsby-plugin-webpack-bundle-analyser-v2'
  ]
}

export default config
