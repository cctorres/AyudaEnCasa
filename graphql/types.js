const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

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

module.exports = { UserType };