const algoliasearch = require('algoliasearch')

const configKambai = require('./configKambai')

// The API ID and key are stored using Cloud Functions config variables.
// @see https://firebase.google.com/docs/functions/config-env
const ALGOLIA_APP_ID = configKambai.algolia_service.app_id
const ALGOLIA_API_KEY = configKambai.algolia_service.api_key

// Create an Algolia Search API client.
const clientAlgolia = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)

module.exports = clientAlgolia