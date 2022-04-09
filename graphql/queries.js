const { GraphQLList, GraphQLString, GraphQLID } = require('graphql')
const { UserType } = require('./types')
const { User } = require('../models/index')

const users = {
    type: new GraphQLList(UserType),
    description: 'List of all users',
    resolve() {
        return User.find();
    }
}

const user = {
    type : UserType,
    description: 'Get a user by id',
    args: {
        id: {
            type: GraphQLID,
            description: 'User id'
        }
    },
    resolve(_, args) {
        if(!args.id) {
            throw new Error('You must provide an id')
        }
        return User.findById(args.id)
    }
}

module.exports = { users, user }