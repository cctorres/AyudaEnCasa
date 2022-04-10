const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const { User } = require("../models");
const { user } = require("./queries");

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User Type",
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    },
});

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Post Type",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        city: { type: GraphQLString },
        author: { type: UserType, resolve(parent){
            return User.findById(parent.authorId);
        } },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    },
});

module.exports = { UserType, PostType };