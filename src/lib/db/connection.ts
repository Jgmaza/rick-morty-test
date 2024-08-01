import { Sequelize } from 'sequelize';

// Conexión a la base de datos
const dbUrl = process.env.DB_URL || 'default_db_url';
const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Solo si estás usando un certificado SSL autofirmado
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
