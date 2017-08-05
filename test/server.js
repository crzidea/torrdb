const supertest = require('supertest')
const assert = require('assert')
const application = require('../bin/torrdb-server')
const request = supertest(application.listen())
const qs = require('qs')

describe('server', () => {
  it('should response search result', async () => {
    const search = {
      query: {
        bool: {
          filter: [
            {
              terms: {
                extnames: [ 'mkv', 'avi', 'mp4', 'mpg', 'mpeg', 'rmvb', 'rm', 'webm' ]
              }
            }
          ]
        }
      }
    }
    const json = JSON.stringify(search)
    const base64 = (new Buffer(json)).toString('base64')
    const querystring = qs.stringify({q: base64})
    const response = await request.get(`/?${querystring}`)
    assert(response.body.hits)
  })
})
