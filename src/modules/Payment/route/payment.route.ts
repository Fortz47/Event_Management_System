import { Router } from "express";
import { MockPaymentController } from "../controller/mock-payment.controller";

class PaymentRoutes extends MockPaymentController {
  private _router: Router;

  constructor() {
    super();
    this._router = Router();
    this.initializeRoutes();
  }

  get router() {
    return this._router;
  }

  private initializeRoutes() {
    this.router.post("/initialize", this.initializePayment);
    this.router.get("/verify", this.verifyPayment);
    this.router.get("/history", this.paymentHistory);
  }
}

const paymentRouter = new PaymentRoutes().router;
export default paymentRouter;
