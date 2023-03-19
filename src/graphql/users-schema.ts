import { gql } from "@apollo/client";

export const graphqlQuery = gql`
  query ($username: String!, $number_of_users: Int!, $number_of_repos: Int!) {
    search(query: $username, type: USER, first: $number_of_users, ) {
      nodes {
        ... on User {
          name
          login
          avatarUrl
          bio
          location
          repositories(last: $number_of_repos) {
            nodes {
              name
              description
              stargazerCount
            }
          }
        }
      }
    }
  }
`;
