import { Optional } from "sequelize";

interface PaymentAttribute {
  id?: string;
  amount: number;
  reference?: string;
  status: "pending" | "success" | "failed" | "refunded";
  eventId: string;
  userId: number;
}

type PaymentCreationAttribute = Optional<PaymentAttribute, "id" | "reference">;

export { PaymentAttribute, PaymentCreationAttribute };
