const fedApi = require('../api/fed')
const StellarSdk = require('stellar-sdk')
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
StellarSdk.Network.useTestNetwork()

async function getVoters(publicKey) {
  const response = await fedApi.getInflation(publicKey)
  return response.entries
}

async function checkBalance(publicKey) {
  const request = server.accounts().accountId(publicKey)

  const response = await request.call()
  const stellarBalance = response.balances.find(
    asset => asset.asset_type === 'native'
  )
  return stellarBalance ? parseFloat(stellarBalance.balance) : 0
}

async function voteFor(target, senderKeys) {
  const account = await server.loadAccount(senderKeys.publicKey())
  const transaction = new StellarSdk.TransactionBuilder(account)
    .addOperation(
      StellarSdk.Operation.setOptions({
        inflationDest: target
      })
    )
    .build()

  transaction.sign(senderKeys)
  return await server.submitTransaction(transaction)
}

async function pay(destinationPublicKey, amount, sourcePrivateKey) {
  const sourceKeypair = StellarSdk.Keypair.fromSecret(sourcePrivateKey)
  const account = await server.loadAccount(sourceKeypair.publicKey())
  const transaction = new StellarSdk.TransactionBuilder(account)
    .addOperation(await moneySendOperation(destinationPublicKey, amount))
    .build()
  transaction.sign(sourceKeypair)
  return server.submitTransaction(transaction)
}

async function moneySendOperation(destination, amount) {
  try {
    const account = await server.loadAccount(destination)
    return StellarSdk.Operation.payment({
      destination,
      asset: StellarSdk.Asset.native(),
      amount
    })
  } catch (err) {
    return StellarSdk.Operation.createAccount({
      destination,
      startingBalance: amount
    })
  }
}

const TRANSACTION_FEE = 0.00001

module.exports = {
  getVoters,
  getBalance,
  TRANSACTION_FEE
}
