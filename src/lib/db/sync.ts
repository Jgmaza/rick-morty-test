import sequelize from "./connection";
import Species from "./models/species";
import Character from "./models/character";
import Comment from "./models/comment";

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // 'force: true' elimina y vuelve a crear las tablas en cada ejecución
    console.log("Base de datos sincronizada.");
  } catch (err) {
    console.error("Error al sincronizar la base de datos:", err);
  }
};

syncDatabase();
