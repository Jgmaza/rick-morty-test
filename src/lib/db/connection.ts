import { Sequelize } from 'sequelize';

// Conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_URL!, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // This is to avoid issues with self-signed SSL certificates
    }
  }
});

// Conection verification
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
  } catch (err) {
    console.error('No se pudo conectar a la base de datos:', err);
  }
})();

export default sequelize;
