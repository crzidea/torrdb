const defaults  = require('./defaults.js')
const client    = require('./elasticsearch.js')

let count = 0
module.exports = async function bulk(documents) {
  const discovered_at = new Date
  const body = documents.reduce((body, torrent) => {
    body.push(
      {
        create: {
          _index: defaults.index,
          _id:    torrent._id,
        }
      },
      {
        name:     torrent.name,
        magnet:   torrent.magnet,
        extnames: torrent.extnames,
        discovered_at
      }
    )
    return body
  }, [])
  const response = await client.bulk({body})
  count += response.items.length
  console.log(`${count} documents saved`);
  return response
}
