const { expect } = require('chai')
const {
  randomInt,
  randomPow2,
  nextPow2Number,
  generateRandomBits,
  uint8NumberToBits
} = require('./random')

describe('nextPow2Number', () => {
  it('should export a function', () => {
    expect(nextPow2Number).to.be.a('function')
  })

  it('should return 0 if 0 is passed', () => {
    expect(nextPow2Number(0)).to.eql(0)
  })

  it('should return the number itself if the passed number is power of 2', () => {
    const randomInteger = Math.floor(Math.random() * 20)
    const square = Math.pow(2, randomInteger)
    expect(nextPow2Number(square)).to.eql(square)
  })

  it('should return the next square number if the number is not square itself', () => {
    expect(nextPow2Number(1)).to.eql(1)
    expect(nextPow2Number(12)).to.eql(16)
    expect(nextPow2Number(1234)).to.eql(2048)
    expect(nextPow2Number(12345)).to.eql(16384)
    expect(nextPow2Number(123456)).to.eql(131072)
  })
})

describe('uint8NumberToBits', () => {
  it('should export a function', () => {
    expect(uint8NumberToBits).to.be.a('function')
  })

  it('should return the binary format of a number', () => {
    const binaryNumber = '10101010'
    const number = parseInt(binaryNumber, 2)
    expect(uint8NumberToBits(number)).to.eql(binaryNumber)
  })

  it('should return number padded to 8 chars', () => {
    const binaryNumber = '00000001'
    const number = parseInt(binaryNumber, 2)
    expect(uint8NumberToBits(number)).to.eql(binaryNumber)
  })
})

describe('generateRandomBits', () => {
  it('should export a function', () => {
    expect(generateRandomBits).to.be.a('function')
  })

  it('should generate specific amount of numbers', () => {
    expect(generateRandomBits(53)).to.have.length(53)
  })

  it('should only generate 1s and 0s', () => {
    expect(generateRandomBits(100)).to.match(/^[10]{100}$/)
  })

  it('should generate both 1s and 0s', () => {
    const bits = generateRandomBits(100)
    const variations = bits
      .split('')
      .reduce((arr, num) => ++arr[num] && arr, [0, 0])

    expect(variations[0]).to.be.gte(1)
    expect(variations[1]).to.be.gte(1)
  })
})

describe('randomPow2', () => {
  it('should export a function', () => {
    expect(randomPow2).to.be.a('function')
  })

  it('should generate uniform amount of integers for each variation', () => {
    const variation = variateFunctionOutcome(randomPow2, 1000, 4)
    expect(variation).to.be.below(0.1)
  })
})

describe('randomInt', () => {
  it('should export a function', () => {
    expect(randomInt).to.be.a('function')
  })

  it('should generate uniform amount of integers for each variation', () => {
    const variation = variateFunctionOutcome(randomInt, 1000, 5)
    expect(variation).to.be.below(0.4)
  })

  it.skip('should generate uniform amount of integers for each variation', () => {
    const variation = variateFunctionOutcome(randomInt, 100, 1234)
    expect(variation).to.be.below(1)
  })
})

function variateFunctionOutcome(test, numTries, maxNumber) {
  const results = Array(maxNumber).fill(0)
  for (let i = 0; i < maxNumber * numTries; i++) {
    const result = test(maxNumber)
    results[result]++
  }
  const variations = results.map(n => n / numTries)
  return Math.max(...variations) - Math.min(...variations)
}
