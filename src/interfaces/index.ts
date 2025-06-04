import { JWTPayload } from "jose";

interface CustomJWTPayload extends JWTPayload {
  id: string;
  email: string;
  role: string;
}

export { CustomJWTPayload };
