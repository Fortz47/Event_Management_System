import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { loginUserDto, updateUserDto } from "../../../schemas/users.schema";
import { removeToken } from "../../Auth/controllers/AuthController";

class UserController {
  // Get all users
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
        error,
      });
    }
  }

  // Get user by ID
  public async getUserById(req: Request, res: Response) {
    try {
      const userId = +req.params.id;
      const user = await UserService.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
        error,
      });
    }
  }

  // Create a new user
  async createUser(req: Request, res: Response) {
    try {
      const existingUser = await UserService.getUserByEmail(req.body.email);
      if (existingUser) {
        res.status(400).json({ error: "Email already in use!" });
        return;
      }
      const newUser = await UserService.createUser(req.body);
      res.status(201).json({ message: "Success." });
    } catch (error) {
      res.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
        error,
      });
    }
  }

  // Validate user credentials
  async validateUser(req: Request, res: Response) {
    try {
      const credentials: loginUserDto = req.body;
      const user = await UserService.validateUserWithPassword(credentials);
      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
        error,
      });
    }
  }

  // Update user
  async updateUser(req: Request, res: Response) {
    try {
      const userId = +req.params.id;
      const data: updateUserDto = req.body;
      const [affectedRows] = await UserService.updateUser(userId, data);
      if (affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json({ message: "Updated successfully" });
    } catch (error) {
      res.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
        error,
      });
    }
  }

  // Delete user
  async deleteUser(req: Request, res: Response) {
    try {
      const userId = +req.params.id;
      const deleted = await UserService.deleteUser(userId);
      if (!deleted) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // Optionally, you can also clear the user's session or token here if applicable
      res.clearCookie("token"); // Clear the token cookie if it exists
      const authHeader = req.headers.authorization!;
      const token = authHeader.split(" ")[1];
      await removeToken(token);

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
        error,
      });
    }
  }
}

export default UserController;
