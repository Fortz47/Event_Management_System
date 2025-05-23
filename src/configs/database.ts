import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import initializeModels from '../modules/Auth/models';

// Load environment variables from .env file
config();

const username = process.env.AUTH_DB_USERNAME || 'auth_dev';
const pwd = process.env.AUTH_DB_PASSWORD || 'auth_dev_pwd';
const dbname = process.env.AUTH_DB_NAME || 'auth_dev_db';
const host = process.env.AUTH_DB_HOST || 'localhost';
const dialect = process.env.AUTH_DB_DIALECT || 'mysql';
const port = process.env.AUTH_DB_PORT || 3306;

const URI = `${dialect}://${username}:${pwd}@${host}:${port}/${dbname}`;
const sequelize = new Sequelize(URI);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    if (process.env.NODE_ENV === 'development') {
      initializeModels(sequelize);
      await sequelize.sync({ alter: true });
      console.log('Database synchronized successfully - Development!'); 
    }

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { connectDB, sequelize };