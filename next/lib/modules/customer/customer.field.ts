export const CustomerFields = `
id: String
createdAt: DateTime
updatedAt: DateTime

username: String
address: String
email: String
referral: String
shortUrl: String
activedAt: DateTime
role: String
nonce: String
addressIp: String

bannerUrl: String
avatarUrl: String
approved: Boolean

dangerous: Boolean

walletType: String
status: String

level: Int
maxEXP: Int
currentExp: Int

isMiner: Boolean
`
export const CustomerQuery = `
id
createdAt
updatedAt

username
address
email
referral
shortUrl
activedAt
role
nonce
addressIp

bannerUrl
avatarUrl
approved

dangerous

walletType
status

level
maxEXP
currentExp

isMiner
`