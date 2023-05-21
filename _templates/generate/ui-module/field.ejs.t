---
to: next/lib/modules/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.field.ts
---
export const <%= h.inflection.camelize(name) %>Fields = `
id: String
createdAt: DateTime
updatedAt: DateTime
name: String
`
export const <%= h.inflection.camelize(name) %>Query = `
id
createdAt
updatedAt
name
`