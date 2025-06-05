import { Sequelize } from "sequelize";
import User from "./User";

// initialize all models
function initializeModels (sequelize: Sequelize) {
  User.initialize(sequelize);
};

export default initializeModels;