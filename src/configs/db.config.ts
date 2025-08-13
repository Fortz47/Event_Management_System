import { Sequelize } from "sequelize";
import { config } from "dotenv";
import initializeModels from "../configs";
import { setupEventAssociations } from "../modules/Event/models/event.associations";

// Load environment variables from .env file
config();

const username = process.env.DB_USERNAME;
const pwd = process.env.DB_PASSWORD;
const dbname = process.env.DB_NAME;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;
const port = process.env.DB_PORT;

const URI = `${dialect}://${username}:${pwd}@${host}:${port}/${dbname}`;
const sequelize = new Sequelize(URI);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    if (process.env.NODE_ENV === "development") {
      initializeModels(sequelize);
      setupEventAssociations();
      await sequelize.sync({ alter: true });
      console.log("Database synchronized successfully - Development!");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { connectDB, sequelize };
