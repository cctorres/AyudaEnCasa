const {GraphQLSchema, GraphQLObjectType} = require('graphql');
const { hello } = require('./queries');

const RootType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Root Query',
    fields: { 
        hello: hello
    }
});

const schema = new GraphQLSchema({
    query: RootType
});

module.exports = schema;