export const NftFields = `
id: String
createdAt: DateTime
updatedAt: DateTime

tokenId: Int
transactionHash: String
smartContract: String
address: String
blockId: Int

nickName: String
name: String
groupName: String
description: String
imageUrl: String

providerName: String

rareRate: Float
rating: Float

price: String

providerId: ID
customerId: ID
nftCollectionId: ID

nftCollectionSlug: String

marketStatus: String
nftMintedStatus: String
`
export const NftQuery = `
id
createdAt
updatedAt

tokenId
transactionHash
smartContract
address
blockId

nickName
name
groupName
description
imageUrl


providerName

rareRate
rating

price

providerId
customerId
nftCollectionId

nftCollectionSlug

marketStatus
nftMintedStatus
`