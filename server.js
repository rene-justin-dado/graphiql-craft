require('babel-register');
import express from 'express'
import graphql from 'graphql'
import graphqlHTTP from 'express-graphql'
import {buildSchema} from 'graphql'

import MySchema from './lib/schema.js'

const app = express();
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

app.use('/', graphqlHTTP({
  schema: MySchema,
  graphiql: process.env.NODE_ENV || 'development'
}))

app.listen(1337);
console.log('GraphiQL on port: 1337');
