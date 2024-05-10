import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      email
      first_name
      last_name
      profiles {
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
      username
    }
  }
`;

export const QUERY_PROFILES = gql`
  query profiles {
    profiles {
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

export const QUERY_SINGLE_PROFILE = gql`
  query profile($profileId: ID!) {
    profile(profileId: $profileId) {
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      first_name
      last_name
      profiles {
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
      username
    }
  }
`;
