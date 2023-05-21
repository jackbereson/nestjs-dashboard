export const SportBetFields = `
id: String
createdAt: DateTime
updatedAt: DateTime
name: String
betSide: String
winSide: String
odd: Float
betAmount: Float
winAmount: Float
coin: String
isWin: Boolean

sport: String
sportId: String
sportMatchId: String
customerId: String
status: String
`
export const SportBetQuery = `
id
createdAt
updatedAt
name
betSide
winSide
odd
betAmount
winAmount
coin
isWin

sport
sportId
sportMatchId
customerId
status
`