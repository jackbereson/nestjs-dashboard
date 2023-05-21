export const BalanceTransactionFields = `
id: String
createdAt: DateTime
updatedAt: DateTime
coin: String
value: Float
fromBalanceId: ID
fromBalanceType: String
toBalanceId: ID
toBalanceType: String
status: String
customerId: ID
event: String
`
export const BalanceTransactionQuery = `
id
createdAt
updatedAt
coin
value
fromBalanceId
fromBalanceType
toBalanceId
toBalanceType
status
customerId
event
`