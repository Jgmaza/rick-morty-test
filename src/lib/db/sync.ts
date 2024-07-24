import sequelize from "./connection";
import Species from "./models/Species";
import Character from "./models/Character";
import Comment from "./models/Comment";

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // 'force: true' elimina y vuelve a crear las tablas en cada ejecución
    console.log("Base de datos sincronizada.");
  } catch (err) {
    console.error("Error al sincronizar la base de datos:", err);
  }
};

syncDatabase();
