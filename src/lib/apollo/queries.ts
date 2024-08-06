import { gql } from "@apollo/client";
import { ICharacterFilter } from "../types";

export const GET_CHARACTERS = gql`
  query GetCharacters($filter: CharacterFilterInput) {
    characters(filter: $filter) {
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
