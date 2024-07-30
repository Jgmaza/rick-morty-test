import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      id
      name
      species {
        name
        id
      }
      gender
      status
      image
      isFavorite
    }
  }
`;
