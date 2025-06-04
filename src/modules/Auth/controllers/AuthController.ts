import { Request, Response } from "express";
import { createSecretKey } from "crypto";
import { SignJWT } from "jose";
import { UserService } from "../../UserManagement/services/UserService";
import { JWT_SECRET } from "../../../configs/secrets.config";
import { getToken } from "../../../utils/jwt.utils";
import redisClient from "../../../configs/redis.config";
import { parseTime } from "../../../utils";
import { CustomJWTPayload } from "../../../interfaces";
import { createUserDto, loginUserDto } from "../../../schemas/users.schema";

class AuthControlller {
  async register(req: Request, res: Response) {
    const data: createUserDto = req.body;
    try {
      const existingUser = await UserService.getUserByEmail(data.email);
      if (existingUser) {
        res.status(400).json({ message: "Email already in use!" });
        return;
      }
      const newUser = await UserService.createUser({ ...data });
      res.status(201).json({ message: "Success." });
    } catch (error) {
      res.status(400).json({ message: "Failed to create user", error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const _token = await getToken(req, res);
      if (_token) {
        res.json({ message: "Already Logged in." });
        return;
      }
      const data: loginUserDto = req.body;
      const validUser = await UserService.validateUserWithPassword(data);
      if (!validUser) {
        res.status(401).json({ error: "Invalid email or password." });
        return;
      }
      const userId = validUser.id.toString();
      const token = await generateToken(userId, validUser.email);

      res.json({ message: "Login successful.", token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({
          error: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  }

  async loginAdmin(req: Request, res: Response) {
    const payload = await getToken(req, res);
    if (payload && payload.role === "admin") {
      res.json({ message: "Already Logged in." });
      return;
    }

    const credentials: loginUserDto = req.body;
    const validUser = await UserService.validateUserWithPassword(credentials);
    if (!validUser) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }
    if (validUser.role !== "admin") {
      res.status(401).json({ error: "Admin only." });
      return;
    }
    const userId = validUser.id.toString();
    const token = await generateToken(userId, validUser.email, "admin");

    res.json({ message: "Login successful.", token });
  }

  // must be a protected route, jwtGuard
  async logout(req: Request, res: Response) {
    const authHeader = req.headers.authorization!;
    const token = authHeader.split(" ")[1];
    try {
      await removeToken(token);
    } catch (error) {
      const message = "An unexpected error occurred. Please try again later";
      res.status(500).json({ error: message });
      return;
    }
    res.json({ message: "Logout succesful." });
  }
}

async function generateToken(
  id: string,
  email: string,
  role?: "user" | "admin"
) {
  let expTime = "30 min";
  if (!role) {
    role = "user";
    expTime = "2 days";
  }
  const secret = createSecretKey(Buffer.from(JWT_SECRET!, "utf-8"));
  const payload: CustomJWTPayload = { id, email, role };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expTime)
    .sign(secret);

  const EXP = parseTime(expTime); // convert to seconds in with type 'number'
  await cacheToken(token, id, EXP);
  return token;
}

async function cacheToken(token: string, userId: string, exp: number) {
  const key = `auth_${token}`;
  await redisClient.set(key, userId, exp);
}

async function removeToken(token: string) {
  const key = `auth_${token}`;
  await redisClient.del(key);
}

export default AuthControlller;
