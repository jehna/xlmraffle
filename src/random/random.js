const crypto = require('crypto')

function randomInt (maxNumber) {
  const nextPow2 = nextPow2Number(maxNumber)

  do {
    const randomNumber = randomPow2(nextPow2)
    if (randomNumber < maxNumber) {
      return randomNumber
    }
  } while (true)
}

function nextPow2Number (number) {
  return Math.pow(2, Math.ceil(Math.log(number) / Math.log(2)))
}

function randomPow2 (maxNumber) {
  if (maxNumber > Number.MAX_SAFE_INTEGER) {
    console.warn('Not safe random variation!')
  }

  const numBitsNeeded = parseInt(maxNumber - 1).toString(2).length
  const randomBits = generateRandomBits(numBitsNeeded)

  return parseInt(randomBits, 2)
}

function generateRandomBits (numBits) {
  const numBytesNeeded = Math.ceil(numBits / 8)
  const byteArray = new Uint8Array(numBytesNeeded)

  crypto.randomFillSync(byteArray)

  return [...byteArray].map(uint8NumberToBits).join('').slice(0, numBits)
}

function uint8NumberToBits(number) {
  return number.toString(2).padStart(8, '0')
}

module.exports = {
  randomInt,
  nextPow2Number,
  randomPow2,
  generateRandomBits,
  uint8NumberToBits
}
