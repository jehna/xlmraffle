const StellarSdk = require('stellar-sdk')

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
StellarSdk.Network.useTestNetwork()

const keypair = StellarSdk.Keypair.fromSecret('SBLUIBCBYXHCWEASJXK7XU22SIY72OYUS77TNPHAXMOTYYFEFR5VTFBX')

async function sendMoney({ amount, destination }) {
  const account = await server.loadAccount('GCAZQVFGE42246UILTUWLNU2NF2IDD4AKVGZ7SMH2AN6Z4BZC74XUENE')
  const transaction = new StellarSdk.TransactionBuilder(account)
    .addOperation(await moneySendOperationByAccount({ destination, amount }))
    .build()
  transaction.sign(keypair)
  return server.submitTransaction(transaction)
}

async function moneySendOperationByAccount ({ destination, amount }) {
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


async function sendMoneyTest () {
  const result = await sendMoney({ amount: '25', destination: StellarSdk.Keypair.random().publicKey() })
  console.log(result)
}

sendMoneyTest()
  .catch(e => console.error(e))