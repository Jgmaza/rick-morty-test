import { Sequelize } from "sequelize";

// Conexión a la base de datos
import dotenv from "dotenv";

dotenv.config();

console.log('DATABASE_URL:', process.env.DB_URL);

const sequelize = new Sequelize(process.env.DB_URL!, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Solo si estás usando un certificado SSL autofirmado
    },
  },
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
