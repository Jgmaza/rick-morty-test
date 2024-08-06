import { Op } from "sequelize";
import Species from "../db/models/species";
import Comment from "../db/models/comment";
import Character from "../db/models/character";
import { Identifier } from "sequelize";

export const resolvers = {
  Query: {
    species: async () => {
      return await Species.findAll();
    },
    characters: async (
      _: any,
      {
        filter,
      }: {
        filter: {
          name?: string;
          gender?: string;
          speciesId?: Identifier;
          favorites?: boolean;
          others?: boolean;
        };
      }
    ) => {
      const where: any = {};

      if (filter) {
        if (filter.name) {
          where.name = { [Op.iLike]: `%${filter.name}%` };
        }
        if (filter.gender) {
          where.gender = filter.gender;
        }
        if (filter.speciesId) {
          where.speciesId = filter.speciesId;
        }
        if (filter.favorites && filter.others) {
          where.isFavorite = { [Op.or]: [true, false] };
        } else if (filter.favorites) {
          where.isFavorite = true;
        } else if (filter.others) {
          where.isFavorite = false;
        }
      }

      return await Character.findAll({ where, include: Species });
    },
    comments: async () => {
      return await Comment.findAll({ include: [Character, Species] });
    },
  },
  Mutation: {
    addComment: async (
      _: any,
      { comment, characterId }: { comment: string; characterId: Identifier }
    ) => {
      return await Comment.create({ comment, characterId });
    },
    toggleFavorite: async (
      _: any,
      { characterId }: { characterId: Identifier }
    ) => {
      const character = await Character.findByPk(characterId);
      if (!character) {
        throw new Error("Personaje no encontrado");
      }
      character.set("isFavorite", !character.get("isFavorite"));
      await character.save();
      return character;
    },
  },
  Character: {
    species: async (parent: { speciesId: Identifier | undefined }) => {
      return await Species.findByPk(parent.speciesId);
    },
  },
  Comment: {
    character: async (parent: { characterId: Identifier | undefined }) => {
      return await Character.findByPk(parent.characterId);
    },
    species: async (parent: { speciesId: Identifier | undefined }) => {
      return await Species.findByPk(parent.speciesId);
    },
  },
};

export default resolvers;
