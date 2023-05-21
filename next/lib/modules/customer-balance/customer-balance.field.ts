export const CustomerBalanceFields = `
id: String
createdAt: DateTime
updatedAt: DateTime

coin: String
balance: Float
type: String
status: String
customerId: String
approved: Boolean
`
export const CustomerBalanceQuery = `
id
createdAt
updatedAt

coin
balance
type
status
customerId
approved
`