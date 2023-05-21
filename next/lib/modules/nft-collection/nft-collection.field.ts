export const NftCollectionFields = `
id: String
createdAt: DateTime
updatedAt: DateTime

name: String
summary: String
description: String

slug: String
url: String

token: String
project: String

imageUrl: String
banner: String

rankNumber: Int
topNumber: Int

customerId: String

floorPrice: Float
listing: Int
volumeTrade: Int
owners: Int
`
export const NftCollectionQuery = `
id
createdAt
updatedAt

name
summary
description

slug
url

token
project

imageUrl
banner

rankNumber
topNumber

customerId

floorPrice
listing
volumeTrade
owners
`