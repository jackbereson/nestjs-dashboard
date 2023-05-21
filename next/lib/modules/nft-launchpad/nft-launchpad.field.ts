export const NftLaunchpadFields = `
id: String
createdAt: DateTime
updatedAt: DateTime
name: String
subname: String
summary: String
description: String
slug: String

nftPrice: Float
poolSize: Int
hardCap: Int
remaining: Int
totalAmount: Int
followers: Int
totalRise: Int

token: String
imageUrl: String
logoUrl: String
status: String
customerId: String
`
export const NftLaunchpadQuery = `
id
createdAt
updatedAt
name
subname
summary
description
slug

nftPrice
poolSize
hardCap
remaining
followers
totalRise

token
imageUrl
logoUrl
status
customerId
`