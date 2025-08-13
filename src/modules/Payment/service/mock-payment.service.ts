// src/services/mockPayment.service.ts
import User from "../../User/models/UserModel";
import Event from "../../Event/models/event.model";
import Ticket from "../../Ticket/models/ticket.model";

export class MockPaymentService {
  private static successRate = 0.8; // 80% success rate for realistic testing

  static async initializePayment(
    user: User,
    event: Event,
    amount: number
  ): Promise<{
    paymentUrl: string;
    reference: string;
    accessCode: string;
  }> {
    const reference = `MOCK-${event.id}-${user.id}-${Date.now()}`;
    const accessCode = Math.random().toString(36).substring(2, 10);

    // Store payment intent in database
    await Ticket.create({
      eventId: event.id,
      userId: user.id,
      reference,
      price: amount,
      status: "pending",
      accessCode,
    });

    return {
      paymentUrl: `${process.env.API_URL}/payments/mock/verify?reference=${reference}`,
      reference,
      accessCode,
    };
  }

  static async verifyPayment(reference: string): Promise<{
    status: "success" | "failed";
    reference: string;
    amount: number;
    purchasedAt: string;
    metadata: {
      eventId: string;
      userId: number;
    };
  }> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isSuccess = Math.random() < this.successRate;
    const ticket = await Ticket.findOne({ where: { reference } });

    if (!ticket) {
      throw new Error("Payment reference not found");
    }

    // Update ticket status
    ticket.status = isSuccess ? "paid" : "failed";
    if (ticket.status === "paid") {
      ticket.purchasedAt = new Date();
    }
    await ticket.save();

    return {
      status: isSuccess ? "success" : "failed",
      reference,
      amount: ticket.price,
      purchasedAt: ticket.purchasedAt?.toISOString() || "",
      metadata: {
        eventId: ticket.eventId,
        userId: ticket.userId!,
      },
    };
  }

  static async listPayments(userId: number) {
    return Ticket.findAll({
      where: { userId, status: "paid" },
      order: [["createdAt", "DESC"]],
    });
  }
}
