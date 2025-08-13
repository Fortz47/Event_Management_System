import z from "zod";

// create schema for event
const createEventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title too long"),
  description: z.string().trim().max(500, "Description too long").optional(),
  maxParticipants: z
    .number()
    .int()
    .min(1, "Max participants must be at least 1")
    .optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  mode: z.enum(["virtual", "Hybrid", "in-person"], {
    errorMap: () => ({
      message: "Mode must be either 'virtual', 'Hybrid', or 'in-person'",
    }),
  }),
  location: z
    .string()
    .trim()
    .min(1, "Location is required")
    .max(255, "Location too long"),
  isPublic: z.boolean().optional(),
  isCancelled: z.boolean().optional(),
  isCompleted: z.boolean().optional(),
  isDisabled: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

const updateEventSchema = createEventSchema.partial().extend({
  id: z.string().uuid("Invalid event ID format"),
});

type createEventDto = z.infer<typeof createEventSchema>;
type updateEventDto = z.infer<typeof updateEventSchema>;

// create schema for event participant
const createEventParticipantSchema = z.object({
  eventId: z.string().uuid("Invalid event ID format"),
  userId: z.number().int().positive("User ID must be a positive integer"),
  status: z.enum(["registered", "attended", "cancelled"], {
    errorMap: () => ({
      message: "Status must be either 'registered', 'attended', or 'cancelled'",
    }),
  }),
  ticketNumber: z.string().trim().max(20, "Ticket number too long").optional(),
  paymentStatus: z.enum(["pending", "paid", "refunded"], {
    errorMap: () => ({
      message: "Payment status must be either 'pending', 'paid', or 'refunded'",
    }),
  }),
  paymentAmount: z
    .number()
    .positive("Payment amount must be a positive number")
    .optional(),
  additionalInfo: z.any().optional(),
});

const updateEventParticipantSchema = createEventParticipantSchema
  .partial()
  .extend({
    id: z.string().uuid("Invalid participant ID format"),
  });

type createEventParticipantDto = z.infer<typeof createEventParticipantSchema>;
type updateEventParticipantDto = z.infer<typeof updateEventParticipantSchema>;

// create schema for event organizer
const createEventOrganizerSchema = z.object({
  eventId: z.string().uuid("Invalid event ID format"),
  userId: z.number().int().positive("User ID must be a positive integer"),
});

type createEventOrganizerDto = z.infer<typeof createEventOrganizerSchema>;

// add event organizer schema
const addEventOrganizerSchema = createEventOrganizerSchema.omit({
  eventId: true,
});

// add event participant schema
const addEventParticipantSchema = z.object({
  userId: z.number().int().positive("User ID must be a positive integer"),
});

export {
  createEventSchema,
  updateEventSchema,
  createEventDto,
  updateEventDto,
  createEventParticipantSchema,
  updateEventParticipantSchema,
  createEventParticipantDto,
  updateEventParticipantDto,
  createEventOrganizerSchema,
  createEventOrganizerDto,
  addEventOrganizerSchema,
  addEventParticipantSchema,
};
