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
  mutation addUser($email: String!, $first_name: String!, $last_name: String, $password: String!, $username: String!) {
    addUser(email: $email, first_name: $first_name, last_name: $last_name, password: $password, username: $username) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile($bio: String, $email: String, $facebook: String, $image: String, $instagram: String, $linkedin: String, $location: String, $name: String, $phoneNumber: String, $pinterest: String, $twitter: String) {
    addProfile(bio: $bio, email: $email, facebook: $facebook, image: $image, instagram: $instagram, linkedin: $linkedin, location: $location, name: $name, phoneNumber: $phoneNumber, pinterest: $pinterest, twitter: $twitter) {
      _id
      bio
      email
      facebook
      image
      instagram
      linkedin
      location
      name
      phoneNumber
      pinterest
      twitter
    }
  }
`;