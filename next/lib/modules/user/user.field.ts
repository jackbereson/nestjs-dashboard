export const userFields = `
code: String
id: String
role: String
email: String
agencyName: String
name: String
phone: String
address: String
avatar: String
balance: Float
point: Int
serviceStatus: String
lastLoginAt: DateTime
activedAt: DateTime
expiredDateCount: Int
referralCode: String
status: String
createdAt: DateTime
updatedAt: DateTime
`
export const userQuery = `
  code
  id
  email
  agencyName
  name
  phone
  address
  avatar
  balance
  point
  referralCode
  serviceStatus
  lastLoginAt
  activedAt
  expiredDateCount
  referralCode
  status
 `