const defaults = {}
const elasticsearch = {}
elasticsearch.host      = process.env.ELASTICSEARCH_HOST || 'localhost:9200'
elasticsearch.httpAuth  = process.env.ELASTICSEARCH_AUTH || 'elastic:changeme'
defaults.elasticsearch  = elasticsearch
defaults.index          = process.env.ELASTICSEARCH_INDEX || 'torrdb'
defaults.couchdb        = process.env.COUCHDB || 'http://torrdb.less.center:5984/torrent'

module.exports = defaults
