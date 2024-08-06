export const typeDefs = `#graphql
  type Species {
    id: ID
    name: String
  }

  enum CharacterGender {
    Male
    Female
    Genderless
    unknown
  }

  enum CharacterStatus {
    Alive
    Dead
    unknown
  }

  type Character {
    id: ID
    name: String
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

  input CharacterFilterInput {
    name: String
    gender: CharacterGender
    speciesId: ID
    favorites: Boolean
    others: Boolean
  }

  type Query {
    species: [Species]
    characters(filter: CharacterFilterInput): [Character]
    comments: [Comment]
  }

  type Mutation {
    addComment(comment: String!, characterId: ID!): Comment
    toggleFavorite(characterId: ID!): Character
  }
`;