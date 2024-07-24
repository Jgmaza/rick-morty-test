export const typeDefs = `#graphql
  type Species {
    name: String
    id: ID
  }

  enum CharacterGender {
    Male
    Female
    Genderless
    Unknown
  }

  enum CharacterStatus {
    Alive
    Dead
    Unknown
  }

  type Character {
    name: String
    id: ID
    status: CharacterStatus
    gender: CharacterGender
    species: Species
    image: String
    isFavorite: Boolean
  }

  type Comment {
    id: ID
    comment: String
    character: Character
    species: Species
  }

  type Query {
    species: [Species]
    characters: [Character]
    comments: [Comment]
  }
`;