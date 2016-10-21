import HeroesList from './data/heroes'

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
    _id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: GraphQLString},
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
    },
    searchHero: {
      type: Hero,
      description: 'Returns the hero corresponding to the _id',
      args: {
        heroId: {type: GraphQLString}
      },
      resolve: (source, {heroId = 'stukov'}) => {
        return HeroesList.find((elem, i) => {
          return heroId === elem._id
        })
      }
    },
    heroes: {
      type: new GraphQLList(Hero),
      resolve: () => HeroesList
    }
  })
})

const Mutation = new GraphQLObjectType({
  name: 'StarcraftMutations',
  fields: {
    createHero: {
      type: Hero,
      description: 'Adds a new hero',
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        affiliation: {type: GraphQLString}
      },
      resolve: (source, args) => {
        let hero = args
        const alreadyExists = _.findIndex(HeroesList, h => {
          h._id === hero._id || h.name === hero.name
        }) >= 0
        if (alreadyExists) {
          throw new Error(`Hero already exists: hero._id`)
        }
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

export default Schema
