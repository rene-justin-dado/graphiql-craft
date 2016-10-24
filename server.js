import express from 'express'
import exphbs from 'express-handlebars'
import graphql from 'graphql'
import graphqlHTTP from 'express-graphql'
import {buildSchema} from 'graphql'

import MySchema from './src/schema.js'

const app = express();

app.engine('hbs', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}views`)
app.use('/graphiql', graphqlHTTP({
  schema: MySchema,
  graphiql: process.env.NODE_ENV || 'development'
}))

app.listen(1337);
console.log('GraphiQL interface on: 1337/graphiql');
