import bcrypt from "bcrypt";
import User from "../models/User";
import { CreateOptions, DestroyOptions, FindOptions } from "sequelize";
import { UserCreationAttributes as ICreateUser } from "../../../interfaces/user.interface";
import { loginUserDto } from "../../../schemas/users.schema";

export class UserService {
  // Create a new user
  static async createUser(data: ICreateUser, options?: CreateOptions) {
    console.log("Creating user with data:", data); // Debugging line to check data
    return await User.create(data, options);
  }

  // Get a user by ID
  static async getUserById(id: number, options?: FindOptions) {
    return await User.findByPk(id, options);
  }

  // Get a user by email
  static async getUserByEmail(email: string, options?: FindOptions) {
    return await User.findOne({
      where: { email },
      ...options,
    });
  }

  // Validate user credentials
  static async validateUserWithPassword(
    credentials: loginUserDto,
    options?: FindOptions
  ) {
    const { email, password } = credentials;
    const user = await this.getUserByEmail(email, options);
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) return user;
    }
  }

  // Get a user by email and password
  // static async getUserByEmailAndPassword(
  //   email: string,
  //   password: string,
  //   options?: FindOptions
  // ) {
  //   return await User.findOne({
  //     where: { email, password_hash: password }, // Assuming password is hashed
  //     ...options,
  //   });
  // }

  // Get all users
  static async getAllUsers(options?: FindOptions) {
    return await User.findAll(options);
  }

  // Update a user by ID
  static async updateUser(id: number, data: Partial<User>) {
    if (data.password) {
      const hash = await bcrypt.hash(data.password, 10);
      data.password = hash;
    }
    const [updatedRows] = await User.update(data, {
      where: { id },
    });
    return updatedRows;
  }

  // Delete a user by ID
  static async deleteUser(id: number, options?: DestroyOptions) {
    return await User.destroy({ where: { id }, ...options });
  }
}
