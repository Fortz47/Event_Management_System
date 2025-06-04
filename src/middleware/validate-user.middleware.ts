import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

/**
 * Middleware to validate request body against a Zod schema.
 * If validation fails, it responds with a 400 status and error details.
 * If validation succeeds, it attaches the validated data to req.body and calls next().
 *
 * @param {ZodSchema} schema - The Zod schema to validate against.
 * @returns {Function} Middleware function for Express.js.
 */
export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: "Validation failed",
        details: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    req.body = result.data;
    next();
  };
}
