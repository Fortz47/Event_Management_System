import { Router } from "express";
import AuthControlller from "../controllers/AuthController";
import { jwtGuard } from "../../../middleware/jwt.middleware";
import { validateRequest } from "../../../middleware/validate-req.middleware";
import {
  createUserSchema,
  loginUserSchema,
} from "../../../schemas/users.schema";

class AuthRoutes extends AuthControlller {
  private router: Router;

  constructor() {
    super();
    this.router = Router();
    this.initializeRoutes();
  }

  public getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.post(
      "/register",
      validateRequest(createUserSchema),
      this.register
    );
    this.router.post("/login", validateRequest(loginUserSchema), this.login);
    this.router.post("/login-admin", this.loginAdmin);
    this.router.get("/logout", jwtGuard, this.logout);
  }
}

const authRouter = new AuthRoutes().getRouter();
export default authRouter;
