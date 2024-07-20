/* // lib/graphql/schema.ts
import { gql } from 'apollo-server-micro';
import { IResolvers } from 'apollo-server-micro';
import { Comment, Character } from './models';

export const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    species: String!
    status: String!
    gender: String!
    image: String!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    characterId: ID!
    text: String!
  }

  type Query {
    characters: [Character!]!
    character(id: ID!): Character
  }

  type Mutation {
    addComment(characterId: ID!, text: String!): Comment!
    markFavorite(characterId: ID!): Character!
  }
`;

export const resolvers: IResolvers = {
  Query: {
    characters: async () => {
      // Lógica para obtener personajes desde la API pública o base de datos
      // Aquí iría el código para hacer fetch a la API de Rick y Morty y retornar los personajes
    },
    character: async (_, { id }) => {
      // Lógica para obtener un personaje por ID
      // Aquí iría el código para hacer fetch a la API de Rick y Morty y retornar un personaje específico
    },
  },
  Mutation: {
    addComment: async (_, { characterId, text }) => {
      // Lógica para agregar comentario a un personaje
      const comment = await Comment.create({ characterId, text });
      return comment;
    },
    markFavorite: async (_, { characterId }) => {
      // Lógica para marcar un personaje como favorito
      const character = await Character.findByPk(characterId);
      if (character) {
        character.isFavorite = true;
        await character.save();
      }
      return character;
    },
  },
  Character: {
    comments: async (character) => {
      // Lógica para obtener comentarios de un personaje
      return await Comment.findAll({ where: { characterId: character.id } });
    },
  },
};
 */