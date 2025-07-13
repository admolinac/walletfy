/*
•	Evento: corresponde a la representación del ingreso o egreso del usuario. Sus campos deben ser los siguientes:
o	Id, obligatorio y único por cada evento. Se recomienda el uso de la librería uuid.
o	Nombre, obligatorio y de máximo 20 caracteres.
o	Descripción, opcional y de máximo 100 caracteres.
o	Cantidad, obligatorio y debe ser un número entero o decimal positivo.
o	Fecha, obligatorio y debe ser una fecha válida
o	Tipo, un String que solo puede ser “egreso” o “ingreso”.
*/

import { z } from 'zod';

export const EventSchema = z.object({
    id: z.string("Id is mandatory."),
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
