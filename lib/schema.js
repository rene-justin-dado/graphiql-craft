import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLEnumType,

  GraphQLNonNull,

  GraphQLSchema
} from 'graphql'

const Hero = new GraphQLObjectType({
  name: 'Hero',
  description: 'This represents a hero from the Starcraft universe',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLInt)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    affiliation: {type: GraphQLString}
  })
})

const Query = new GraphQLObjectType({
  name: 'StarcraftSchema',
  description: 'Root Schema for Starcraft reference',
  fields: () => ({
    echo: {
      type: GraphQLString,
      description: 'Log what you enter.',
      args: {
        message: {type: GraphQLString}
      },
      resolve: (source, {message}) => `You said: ${message}`
    }
    heroes: {
      type: GraphQLList(Hero),
      resolve: () => HeroesList
    }
  })
})

const Schema = new GraphQLSchema({
  query: Query
})

export default Schema
