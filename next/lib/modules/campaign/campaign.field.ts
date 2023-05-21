export const CampaignFields = `
id: String
createdAt: DateTime
updatedAt: DateTime
name: String
startDate: DateTime
endDate: DateTime
ratioBNB: Float
maxTokenLimit: Float
minimumPurchaseTokenAmount: Float
maximumPurchaseTokenAmount: Float
priority: Int
status: String
totalTokenAmount: Float
is100PercentProgress: Boolean
`
export const CampaignQuery = `
id
createdAt
updatedAt
name
startDate
endDate
ratioBNB
maxTokenLimit
minimumPurchaseTokenAmount
maximumPurchaseTokenAmount
priority
status
totalTokenAmount
is100PercentProgress
`