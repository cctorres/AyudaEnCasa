const { GraphQLString } = require('graphql')

const hello = {
    type: GraphQLString,
    description: 'Hello World',
    resolve: () => 'Hello World'
}

module.exports = { hello }