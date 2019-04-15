
const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema

const typeDefs = gql`

    type User {
        id: String
        name: String!
        email: String!
        password: String!
        }
    
    type Chat {
        message: String!
        sender: String!
        receiver: String!
        }
    type Query {

        GetUsers: [User]
        AllChat: [Chat]
    } 
  

  type Mutation {
      AddUser(name: String!, email: String!, password: String!): String!

  }
`;

module.exports = typeDefs;