export const ActivityFields = `
id: String
createdAt: DateTime
updatedAt: DateTime

userId: String
customerId: String
message: String
type: String
changedFactor: String
`
export const ActivityQuery = `
id
createdAt
updatedAt
message
type
changedFactor
userId
customerId
`