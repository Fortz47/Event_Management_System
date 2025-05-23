import { DataTypes, Model, Sequelize } from 'sequelize';
import { DateTime } from 'luxon';
import { UserAttributes, UserCreationAttributes } from '../../../interfaces/user';


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password_hash: string;
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
          validate: {
            isEmail: true,
          },
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        timestamps: true,
      }
    )
  }
}



export default User;