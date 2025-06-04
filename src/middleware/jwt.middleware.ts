import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";

async function jwtGuard(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = await verifyToken(req, res);
    if (payload) {
      (req as any).user = payload;
      next();
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    }
  }
  res.status(401).json({ error: "Unauthorized." });
}

export { jwtGuard };
