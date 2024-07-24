import Species from "../db/models/species";
import Comment from "../db/models/comment";
import Character from "../db/models/character";
import { Identifier } from "sequelize";

export const resolvers = {
  Query: {
    species: async () => {
      return await Species.findAll();
    },
    characters: async () => {
      return await Character.findAll({ include: Species });
    },
    comments: async () => {
      return await Comment.findAll({ include: [Character, Species] });
    },
  },
  Character: {
    species: async (parent: { speciesId: Identifier | undefined; }) => {
      return await Species.findByPk(parent.speciesId);
    },
  },
  Comment: {
    character: async (parent: { characterId: Identifier | undefined; }) => {
      return await Character.findByPk(parent.characterId);
    },
    species: async (parent: { speciesId: Identifier | undefined; }) => {
      return await Species.findByPk(parent.speciesId);
    },
  },
};

export default resolvers;
