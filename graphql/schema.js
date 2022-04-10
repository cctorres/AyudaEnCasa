const {GraphQLSchema, GraphQLObjectType} = require('graphql');
const { users, user, posts, post } = require('./queries');
const { register, login, createPost, updatePost } = require('./mutations');

const RootType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Root Query',
    fields: { 
        users: users,
        user: user,
        posts: posts,
        post: post,
    }
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Root Mutation",
    fields: {
        register: register,
        login: login,
        createPost: createPost,
        updatePost: updatePost,
    }  
});


const schema = new GraphQLSchema({
    query: RootType,
    mutation: MutationType,
});

module.exports = schema;