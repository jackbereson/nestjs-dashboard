export const NftLauchpadPackageFields = `
id: String
createdAt: DateTime
updatedAt: DateTime
name: String
price: Float
mediaUrl: String
quantity: Int
seedElement: [Float]
nftLaunchpadId: ID
`
export const NftLauchpadPackageQuery = `
id
createdAt
updatedAt
name
price
mediaUrl
quantity
seedElement
nftLaunchpadId
`