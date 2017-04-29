const elasticsearch = require('elasticsearch');
const defaults = require('./defaults.js')

const client = new elasticsearch.Client(defaults.elasticsearch);

module.exports = client
