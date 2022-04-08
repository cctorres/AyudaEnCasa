const {GraphQLSchema, GraphQLObjectType} = require('graphql');
const { hello } = require('./queries');
const { register } = require('./mutations');

const RootType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Root Query',
    fields: { 
        hello: hello
    }
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Root Mutation",
    fields: {
        register: register,
    }  
});


const schema = new GraphQLSchema({
    query: RootType,
    mutation: MutationType
});

module.exports = schema;