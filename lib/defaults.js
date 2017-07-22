const defaults = {}
const elasticsearch = {}
elasticsearch.host      = process.env.ELASTICSEARCH_HOST || 'localhost:9200'
elasticsearch.httpAuth  = process.env.ELASTICSEARCH_AUTH || 'elastic:changeme'
defaults.elasticsearch  = elasticsearch
defaults.index          = process.env.ELASTICSEARCH_INDEX || 'myindex'
defaults.leveldb        = process.env.LEVELDB || `${process.env.HOME}/.torrent-sniffer/leveldb`

module.exports = defaults
