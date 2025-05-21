import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const username = process.env.AUTH_DB_USERNAME || 'auth_dev';
const pwd = process.env.AUTH_DB_PASSWORD;
const dbname = process.env.AUTH_DB_NAME || 'auth_dev_db';
const host = process.env.AUTH_DB_HOST || 'localhost';
const dialect = process.env.AUTH_DB_DIALECT || 'mysql';
const port = process.env.DB_PORT || 3306;

const URI = `${dialect}://${username}:${pwd}@${host}:${port}/${dbname}`;
const sequelize = new Sequelize(URI);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default connectDB;