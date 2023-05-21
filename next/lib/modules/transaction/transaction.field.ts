export const TransactionFields = `
id: String
createdAt: DateTime
updatedAt: DateTime

transactionHash: String
blockNumber: Int
price: Float
status: String
event: String
value: Mixed

fromCustomerId: ID
fromAddress: String
toCustomerId: ID
toAddress: String

nftLaunchpadId: ID
nftLaunchpadPackageId: ID
nftId: ID
`;
export const TransactionQuery = `
id
createdAt
updatedAt

transactionHash
blockNumber
price
status
event
value

fromCustomerId
fromAddress
toCustomerId
toAddress

nftLaunchpadId
nftLaunchpadPackageId
nftId
`;
