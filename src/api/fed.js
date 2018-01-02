const fetch = require('node-fetch')
const BASE_URL = 'https://fed.network'

async function getInflation(publicKey) {
  const url = `${BASE_URL}/inflation/${publicKey}`
  const request = await fetch(url)
  return await request.json()
}

module.exports = {
  getInflation
}
