import User from "../../src/modules/User/models/UserModel";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
