const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const path = require('path');
//Do we need this ^^ -max

const PORT = process.env.PORT || 3001;
const app = express();


const startServer = async() => {

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //context: authMiddleware <--- (DO WE NEED THIS?) -max
});


await server.start();
//^^ starts Apollo server

server.applyMiddleware({ app });

// log where we can go to test our GQL API
console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};


//initialize Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
