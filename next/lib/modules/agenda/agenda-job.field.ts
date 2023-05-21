export const agendaJobFields = `
id: String    
createdAt: DateTime
updatedAt: DateTime

name: String
data: Mixed
type: String
priority: Int
nextRunAt: DateTime
lastModifiedBy: String
lockedAt: DateTime
lastRunAt: DateTime
lastFinishedAt: DateTime
disabled: Boolean

failCount: Int
failReason: String
failedAt: DateTime
`