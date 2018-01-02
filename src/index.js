const {
  getVoters,
  getBalance,
  pay,
  TRANSACTION_FEE
} = require('./stellarHelpers/stellarHelpers')
const { randomInt } = require('./random/random')
const { findWinner, totalNumberOfTickets, runRaffle, tittidii } = require('./raffle/raffle')

const PERCENT_OF_FUNDS_RESERVED_FOR_SITE_MAINTENANCE = 0.05

async function run () {
  setInterval(() =>
    checkIfRaffleCanBegin(
      await getBalance(process.env.RAFFLE_PUBLIC_KEY),
      await getVoters(process.env.RAFFLE_PUBLIC_KEY),
      process.env.SITE_OWNER_PUBLIC_KEY,
      process.env.RAFFLE_SECRET_KEY
    )
  )
}
