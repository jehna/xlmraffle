const { findWinner, totalNumberOfVotes } = require('./raffle')
const { expect } = require('chai')

describe('findWinner', () => {
  const createPlayer = (
    balance = Math.random() * 1000,
    account = Math.random().toString()
  ) => ({ account, balance: balance.toString() })

  it('should export a function', () => {
    expect(findWinner).to.be.a('function')
  })

  it('should return the first player if winning number is 1', () => {
    const player1 = createPlayer()
    const player2 = createPlayer()

    expect(findWinner([player1, player2], 1)).to.eql(player1)
  })

  it('should return the nth player when there is 1 vote for each player', () => {
    const player1 = createPlayer(1, 'player1')
    const player2 = createPlayer(1, 'player2')
    const player3 = createPlayer(1, 'player3')

    expect(findWinner([player1, player2, player3], 1)).to.eql(player1)
    expect(findWinner([player1, player2, player3], 2)).to.eql(player2)
    expect(findWinner([player1, player2, player3], 3)).to.eql(player3)
  })

  it('should return the secod player when all have 2 votes and winning is 4', () => {
    const player1 = createPlayer(2, 'player1')
    const player2 = createPlayer(2, 'player2')
    const player3 = createPlayer(2, 'player3')

    expect(findWinner([player1, player2, player3], 4)).to.eql(player2)
  })

  it('should return the secod player when all have 3 votes and winning is 5', () => {
    const player1 = createPlayer(3, 'player1')
    const player2 = createPlayer(3, 'player2')
    const player3 = createPlayer(3, 'player3')

    expect(findWinner([player1, player2, player3], 5)).to.eql(player2)
  })

  it('should return correct player on complex vote scenario', () => {
    const players = [
      createPlayer(1038314, 'player1'),
      createPlayer(319041301399, 'player2'),
      createPlayer(32807249424, 'player3'),
      createPlayer(13553, 'player4'),
      createPlayer(102, 'player5'),
      createPlayer(1092423, 'player6')
    ]

    expect(findWinner(players, 1)).to.eql(players[0])
    expect(findWinner(players, 100)).to.eql(players[0])
    expect(findWinner(players, 1000000)).to.eql(players[0])
    expect(findWinner(players, 10000000)).to.eql(players[1])
    expect(findWinner(players, 100000000)).to.eql(players[1])
    expect(findWinner(players, 319042339713)).to.eql(players[1])
    expect(findWinner(players, 319042339714)).to.eql(players[2])
    expect(findWinner(players, 351849600000)).to.eql(players[3])
    expect(findWinner(players, 351849602790)).to.eql(players[4])
    expect(findWinner(players, 351849603000)).to.eql(players[5])
  })

  it('should only count full tokens as votes', () => {
    const player1 = createPlayer(1.8, 'player1')
    const player2 = createPlayer(1.8, 'player2')
    const player3 = createPlayer(1, 'player3')
    expect(findWinner([player1, player2, player3], 3)).to.eql(player3)
  })
})

describe('totalNumberOfVotes', () => {
  const createPlayer = balance => ({ balance })
  it('should return the total count of balances', () => {
    const players = [createPlayer(1), createPlayer(2), createPlayer(3)]
    expect(totalNumberOfVotes(players)).to.eql(6)
  })

  it('should only count full tokens as votes', () => {
    const players = [createPlayer(11.9), createPlayer(22.8), createPlayer(33.7)]
    expect(totalNumberOfVotes(players)).to.eql(66)
  })
})
