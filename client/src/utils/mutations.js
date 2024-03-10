import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile($image: String, $name: String, $email: String, $bio: String, $location: String, $twitter: String, $linkedin: String, $instagram: String) {
    addProfile(image: $image, name: $name, email: $email, bio: $bio, location: $location, twitter: $twitter, linkedin: $linkedin, instagram: $instagram) {
      _id
      image
    }
  }
`;