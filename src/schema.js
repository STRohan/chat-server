const { ApolloServer, gql } = require("apollo-server");

// The GraphQL schema

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    password: String!
  }

  type Chat {
    id: String!
    senderId: String!
    receiverId: String!
    sender: String!
    receiver: String!
    message: String
  }
  type Query {
    GetUsers: [User]
    AllChat: [Chat]
    GetChat(senderId: String!, receiverId: String!): [Chat]
  }

  type Mutation {
    AddUser(name: String!, email: String!, password: String!): UserDetails!
    AddChat(
      message: String!
      senderId: String!
      receiverId: String!
    ): ChatResponse!
    DeleteChatBothSide(senderId: String!, receiverId: String!): ChatResponse!)
    DeleteChat(senderId: String!, receiverId: String!): ChatResponse!
  }

  type ChatResponse {
    sender: String
    receiver: String
    status: String!
  }

  type UserDetails {
    message: String!
    name: String
    email: String
    token: String
  }
`;

module.exports = typeDefs;
