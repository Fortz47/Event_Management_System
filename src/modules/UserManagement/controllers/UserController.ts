import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  // Get all users
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users", error });
    }
  }

  // Get user by ID
  public async getUserById(req: Request, res: Response) {
    try {
      const userId = +req.params.id;
      const user = await UserService.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user", error });
    }
  }

  // Create a new user
  async createUser(req: Request, res: Response) {
    try {
      const existingUser = await UserService.getUserByEmail(req.body.email);
      if (existingUser) {
        res.status(400).json({ message: "Email already in use!" });
        return;
      }
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: "Failed to create user", error });
    }
  }

  // Update user
  async updateUser(req: Request, res: Response) {
    try {
      const userId = +req.params.id;
      const updatedUser = await UserService.updateUser(userId, req.body);
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: "Failed to update user", error });
    }
  }

  // Delete user
  async deleteUser(req: Request, res: Response) {
    try {
      const userId = +req.params.id;
      const deleted = await UserService.deleteUser(userId);
      if (!deleted) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user", error });
    }
  }
}

export default UserController;
