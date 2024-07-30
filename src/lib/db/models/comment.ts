import { DataTypes } from 'sequelize';
import sequelize from '../connection';
import { Character } from './character';
import Species from "./species";


export const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  characterId: {
    type: DataTypes.INTEGER,
    references: {
      model: Character,
      key: 'id',
    },
  },
  speciesId: {
    type: DataTypes.INTEGER,
    references: {
      model: Species,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Comment.belongsTo(Character, { foreignKey: 'characterId' });
Comment.belongsTo(Species, { foreignKey: 'speciesId' });

export default Comment;

