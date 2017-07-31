const defaults  = require('./defaults.js')
const client    = require('./elasticsearch.js')

let count = 0
module.exports = async function bulk(documents) {
  const body = documents.reduce((body, torrent) => {
    body.push(
      {
        index: {
          _index: defaults.index,
          _type:  'torrent',
          _id:    torrent._id,
        }
      },
      {
        name:     torrent.name,
        magnet:   torrent.magnet,
        extnames: torrent.extnames
      }
    )
    return body
  }, [])
  const response = await client.bulk({body})
  count += response.items.length
  console.log(`${count} documents saved`);
  return response
}
