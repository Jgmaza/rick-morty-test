import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';

interface SpeciesAttributes {
  id: number;
  name: string;
}

interface SpeciesCreationAttributes extends Optional<SpeciesAttributes, 'id'> {}

class Species extends Model<SpeciesAttributes, SpeciesCreationAttributes> implements SpeciesAttributes {
  public id!: number;
  public name!: string;
}

Species.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Species',
  timestamps: true, // Ajusta esto según tu necesidad
});

export default Species;
