import { DataTypes, Model, Sequelize } from "sequelize";
import { DateTime } from "luxon";
import {
  UserAttributes as IUser,
  UserCreationAttributes as ICreationUser,
} from "../../../interfaces/user.interface";

class User extends Model<IUser, ICreationUser> implements IUser {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: string;
  declare readonly createdAt: DateTime;
  declare readonly updatedAt: DateTime;

  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          set(value: string) {
            this.setDataValue("email", value.trim().toLowerCase());
          },
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value: string) {
            // Assuming you will hash the password before saving
            this.setDataValue("password", value); // Replace with actual hashing logic
          },
          // onUpdate: (value: string): => {
          //   // This is where you would hash the password before updating
          //   this.setDataValue("password_hash", value); // Replace with actual hashing logic
          // }
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "user", // Default role can be set to 'user'
          validate: {
            isIn: [["user", "admin", "superadmin"]], // Example roles
          },
        },
      },
      {
        sequelize,
        tableName: "users",
        modelName: "User",
        timestamps: true,
      }
    );
  }
}

export default User;
