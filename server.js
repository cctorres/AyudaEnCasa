const { ApolloServer } = require("apollo-server");
const connectDB = require("./db");
const typeDefs = require("./graphql/types");
const resolvers = require("./graphql");
const models = require("./models");

connectDB();

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: {models}
});

server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});