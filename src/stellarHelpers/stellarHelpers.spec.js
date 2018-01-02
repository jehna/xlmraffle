const { expect } = require('chai')
const sinon = require('sinon')
const fedApi = require('../api/fed')
const axios = require('axios')
const { voteFor, getVoters, checkBalance } = require('./stellarHelpers')
const StellarSdk = require('stellar-sdk')
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
StellarSdk.Network.useTestNetwork()

describe('getVoters', () => {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.restore()
  })

  it('should export a function', () => {
    expect(getVoters).to.be.a('function')
  })

  it('should get the voter address', async () => {
    const dummyPublicKey = 'AAAAAA'
    const dummyAccount = 'BBBBB'
    const dummyBalance = 12345
    const dummyInflationResponse = {
      inflationdest: dummyPublicKey,
      entries: [{ balance: dummyBalance, account: dummyAccount }]
    }
    sandbox
      .stub(fedApi, 'getInflation')
      .returns(Promise.resolve(dummyInflationResponse))

    expect(await getVoters(dummyPublicKey)).to.deep.include({
      account: dummyAccount,
      balance: dummyBalance
    })
  })
})

describe('checkBalance', () => {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.restore()
  })

  it('should export a function', () => {
    expect(checkBalance).to.be.a('function')
  })

  it('should return the correct balance', async () => {
    const dummyPublicKey = 'AAAAAAA'
    const dummyBalance = 1234.567
    sandbox.stub(axios, 'get').returns(
      Promise.resolve({
        data: {
          balances: [{ asset_type: 'native', balance: dummyBalance.toString() }]
        }
      })
    )

    expect(await checkBalance(dummyPublicKey)).to.eql(dummyBalance)
  })
})
