import { z } from 'zod';

export const EventSchema = z.object({
    id: z.uuid("Id as UUID is mandatory"),
    name: z.string("Name is mandatory.").min(1).max(20, { error: "The maximum number of characters has been exceeded" }),
    description: z.string().max(100, { error: "The maximum number of characters has been exceeded" }).optional(),
    amount: z.number("Amount is mandatory.").positive("The number must be positive"),
    date: z.date("Bad date").min(new Date("1930-01-01"), { error: "Too old" }),
    type: z.enum(["income", "expense"]),
    attachment: z.string().optional(),
});

export type EventType = z.infer<typeof EventSchema>;

export const CreateEventSchema = EventSchema.omit({ id: true });

export type CreateEventType = z.infer<typeof CreateEventSchema>;

export const UpdateEventSchema = EventSchema.partial().extend({ id: z.uuid() });

export type UpdateEventType = z.infer<typeof UpdateEventSchema>;
