import { gql } from "@apollo/client";

const operations = {
  Mutations: {
    createUsername: gql`
      mutation CreateUsername($username: String) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
};

export default operations;
