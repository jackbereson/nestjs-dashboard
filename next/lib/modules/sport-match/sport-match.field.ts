export const SportMatchFields = `
id: String
createdAt: DateTime
updatedAt: DateTime

name: String

sideA: String
sideB: String

flagA: String
flagB: String

scoreA: Int
scoreB: Int

sportRadar: String
sport: String
sportId: String

type: String
status: String
startTime: DateTime
endTime: DateTime

oddA: Float
oddDraw: Float
oddB: Float
`;
export const SportMatchQuery = `
id
createdAt
updatedAt

name

sideA
sideB

flagA
flagB

scoreA
scoreB

sportRadar
sport
sportId

type
status
startTime
endTime

oddA
oddDraw
oddB
`;
