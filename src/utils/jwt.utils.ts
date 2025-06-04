import { createSecretKey, verify } from "crypto";
import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import { CustomJWTPayload } from "../interfaces";
import { JWT_SECRET } from "../configs/secrets.config";
import redisClient from "../configs/redis.config";

async function verifyToken(
  req: Request,
  res: Response
): Promise<CustomJWTPayload | void> {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const key = `auth_${token}`;
    const hasKey = await redisClient.get(key);
    if (!hasKey) return;

    try {
      const secret = createSecretKey(Buffer.from(JWT_SECRET!, "utf-8"));
      const { payload } = await jwtVerify(token, secret);
      (req as any).user = payload;
      return payload as CustomJWTPayload;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error Verifying Token: ${error.message}`);
      }
    }
  }
}

async function getToken(req: Request, res: Response) {
  try {
    const payload = await verifyToken(req, res);
    return payload;
  } catch (error) {
    // pass
  }
}

async function jwtGuard(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const key = `auth_${token}`;
    const hasKey = await redisClient.get(key);
    if (!hasKey)
      return res.status(401).json({ error: "Unauthorized: invalid token." });
    try {
      const secret = createSecretKey(Buffer.from(JWT_SECRET!, "utf-8"));
      const { payload } = await jwtVerify(token, secret);
      (req as any).user = payload;
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: `Unauthorized: ${error.message}` });
      }
    }
  } else {
    res.status(401).json({ error: "Unauthorized." });
  }
}

export { jwtGuard, getToken };
