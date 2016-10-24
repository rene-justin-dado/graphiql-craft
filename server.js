import express from 'express'
import exphbs from 'express-handlebars'
import {graphql} from 'graphql'
import graphqlHTTP from 'express-graphql'

import Schema from './src/schema.js'

const app = express();

app.engine('hbs', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}views`)
app.use('/graphiql', graphqlHTTP({
  schema: Schema,
  graphiql: process.env.NODE_ENV || 'development'
}))

app.get('/', () => {
  graphql(Schema, `
    {
      heroes {
        _id
        name
        affiliation
      }
    }`)
    .then(res => res.render('index', {data: data}))
})

app.listen(1337);
console.log('GraphiQL interface on: 1337/graphiql');
