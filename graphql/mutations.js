const { GraphQLString } = require("graphql");
const { User } = require("../models");
const { createJWT } = require("../util/auth");

const register = {
    type: GraphQLString,
    description: "Register a new user and return a JWT token",
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
    },
    async resolve( parents , args) {
        const { name, email, password, displayName } = args;
        const user = new User({ name, email, password, displayName });
        await user.save();
        const token = createJWT({ userId: user._id, email: user.email, displayName: user.displayName, name: user.name});
        return token; 
    },
};

module.exports = { register };