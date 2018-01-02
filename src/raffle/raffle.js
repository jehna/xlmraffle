function findWinner(players, winningNumber) {
  let number = 0
  for (let i = 0; i < players.length; i++) {
    number += Math.floor(players[i].balance)
    if (number >= winningNumber) {
      return players[i]
    }
  }
}

function totalNumberOfVotes(players) {
  return players.reduce(
    (votes, player) => votes + Math.floor(player.balance),
    0
  )
}

async function runRaffle(
  balance,
  players,
  siteOwnerPublicKey,
  rafflePrivateKey
) {
  if (balance === 0) {
    return
  }

  const maintenanceFee =
    balance -
    TRANSACTION_FEE * 2 * PERCENT_OF_FUNDS_RESERVED_FOR_SITE_MAINTENANCE
  const winnigSum = balance - TRANSACTION_FEE * 2 - maintenanceFee

  const numTickets = totalNumberOfTickets(players)
  const winnerNumber = randomInt(numTickets) + 1

  const winner = findWinner(players, winnerNumber)
  await pay(winner, winnigSum, rafflePrivateKey)
  await pay(siteOwnerPublicKey, maintenanceFee, rafflePrivateKey)
}

module.exports = {
  findWinner,
  totalNumberOfVotes,
  runRaffle
}
