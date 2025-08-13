import { Model, DataTypes, Sequelize } from "sequelize";
import {
  PaymentAttribute,
  PaymentCreationAttribute,
} from "../../../interfaces/payment.interface";

enum PaymentStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  REFUNDED = "refunded",
}

class Payment extends Model<PaymentAttribute, PaymentCreationAttribute> {
  declare id?: string;
  declare amount: number;
  declare reference?: string;
  declare status: PaymentStatus;
  declare eventId: string;
  declare userId: number;

  static initialize(sequelize: Sequelize) {
    Payment.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        reference: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        status: {
          type: DataTypes.ENUM(
            PaymentStatus.PENDING,
            PaymentStatus.SUCCESS,
            PaymentStatus.FAILED,
            PaymentStatus.REFUNDED
          ),
          defaultValue: PaymentStatus.PENDING,
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        eventId: {
          type: DataTypes.CHAR(36).BINARY,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "payments",
        modelName: "Payment",
        timestamps: true,
      }
    );
  }
}

export default Payment;
