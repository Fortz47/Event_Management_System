import { DataTypes, Model, Sequelize } from "sequelize";
import { DateTime } from "luxon";
import bcrypt from "bcrypt";
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
  declare profilePicture?: string;
  declare eventsOrganized?: any[];
  declare eventsParticipated?: any[];
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
          allowNull: true,
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
          async set(value: string) {
            // saving the password as a hash
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(value, saltRounds);
            this.setDataValue("password", hashedPassword);
          },
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "user", // Default role can be set to 'user'
          validate: {
            isIn: [["user", "admin", "superadmin"]], // Example roles
          },
        },
        profilePicture: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        // eventsOrganized: {
        //   type: DataTypes.JSONB, // Assuming this is an array of event IDs or objects
        //   allowNull: true,
        // },
        // eventsParticipated: {
        //   type: DataTypes.JSONB, // Assuming this is an array of event IDs or objects
        //   allowNull: true,
        // },
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
