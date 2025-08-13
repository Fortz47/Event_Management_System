import { Router } from "express";
import UserController from "../controllers/UserController";
import { validateRequest } from "../../../middleware/validate-req.middleware";
import {
  createUserSchema,
  updateUserSchema,
} from "../../../schemas/users.schema";

class UserRoutes extends UserController {
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
    this.router.get("/", this.getAllUsers);
    this.router.get("/:id", this.getUserById);
    this.router.post("/", validateRequest(createUserSchema), this.createUser);
    this.router.put("/:id", validateRequest(createUserSchema), this.updateUser);
    this.router.patch(
      "/:id",
      validateRequest(updateUserSchema),
      this.updateUser
    );
    this.router.delete("/:id", this.deleteUser);
  }
}

const userRouter = new UserRoutes().getRouter();
export default userRouter;
