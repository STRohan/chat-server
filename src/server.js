const { ApolloServer, PubSub } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
const pubSub = new PubSub();



const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});

module.exports = {pubSub};