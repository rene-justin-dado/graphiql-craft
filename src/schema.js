import * as _ from 'underscore'
import mongo from 'promised-mongo'
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

const db = mongo('mongodb://localhost/koprulu')
const heroesCollection = db.collection('heroes')

const Hero = new GraphQLObjectType({
  name: 'Hero',
  description: 'This represents a hero from the Starcraft universe',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'A unique identifier for each hero'
    },
    name: {
      type: GraphQLString,
      description: 'The name of an epic figure from Starcraft'
    },
    affiliation: {
      type: GraphQLString,
      description: 'The main group a Starcraft hero is associated with'
    }
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
        _id: {type: GraphQLString}
      },
      resolve: (source, {args}) => {
        return heroesCollection.find((elem, i) => heroId === elem._id)
      }
    },
    heroes: {
      type: new GraphQLList(Hero),
      resolve: () => {
        console.log(heroesCollection.find().toArray())
        return heroesCollection.find().toArray()
      }
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
        let hero = Object.assign({}, args)
        heroesCollection.insert(hero)
          .then(_ => hero)
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

export default Schema
