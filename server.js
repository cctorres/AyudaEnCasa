const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { connectDB } = require('./db/index');
const { authenticated } = require('./middlewares/auth');

connectDB();
const app = express();

app.use(authenticated);

app.get('/', (req, res) => {
    res.send('Just a testing backend using GraphQL and MongoDB');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(3000)
console.log('Server is running on port 3000');