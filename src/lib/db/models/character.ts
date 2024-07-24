import { DataTypes } from 'sequelize';
import sequelize from '../connection';
import Species from './species';


export const Character = sequelize.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Genderless', 'unknown'),
  },
  speciesId: {
    type: DataTypes.INTEGER,
    references: {
      model: Species,
      key: 'id',
    },
  },
  image: {
    type: DataTypes.STRING,
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

Character.belongsTo(Species, { foreignKey: 'speciesId' });

export default Character;
