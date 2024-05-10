const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String!
    first_name: String!
    last_name: String!
    password: String!
    profiles: [Profile]!
    username: String!
  }

  type Profile {
    _id: ID
    bio: String
    email: String
    facebook: String
    instagram: String
    image: String
    linkedin: String
    location: String
    name: String
    phoneNumber: String
    pinterest: String
    twitter: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    profile(profileId: ID!): Profile
    profiles(username: String): [Profile]
    user(username: String!): User
    users: [User]
  }

  type Mutation {
    addProfile(bio: String, email: String, facebook: String, image: String, instagram: String, linkedin: String, location: String, name: String, phoneNumber: String, pinterest: String, twitter: String): Profile
    addUser(email: String!, first_name: String!, last_name: String!, password: String!, username: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile(profileId: ID!): Profile
  }
`;

module.exports = typeDefs;
