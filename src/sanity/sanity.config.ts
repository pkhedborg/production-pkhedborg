import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema } from './schemaTypes'

export default defineConfig({
  name: 'pkhedborg',
  title: 'PKHedborg',
  projectId: 'p3g71xju',
  dataset: 'articles',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: {
    types: schema.types,
  },
})
