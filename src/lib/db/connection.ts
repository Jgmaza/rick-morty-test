import { Sequelize } from "sequelize";
import pg from "pg";

// Conexión a la base de datos
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL!, {
  dialectModule: pg,
});

// Conection verification
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");
  } catch (err) {
    console.error("No se pudo conectar a la base de datos:", err);
  }
})();

export default sequelize;
