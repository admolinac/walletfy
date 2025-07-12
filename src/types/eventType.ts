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
    id: z.uuid("Id is mandatory."),
    name: z.string("Name is mandatory.").max(20, { error: "The maximum number of characters has been exceeded" }),
    description: z.string().max(100, { error: "The maximum number of characters has been exceeded" }).optional(),
    quantity: z.number("Quantity is mandatory.").positive("The number must be positive"),
    date: z.date("Bad date").min(new Date("2025-01-01"), { error: "Too old" }),
    type: z.enum(["income", "expense"])
});

export type EventType = z.infer<typeof EventSchema>;

export const CreateEventSchema = EventSchema.omit({ id: true });

export type CreateEventType = z.infer<typeof CreateEventSchema>;

export const UpdateEventSchema = EventSchema.partial().extend({ id: z.uuid() });

export type UpdateEventSchema = z.infer<typeof UpdateEventSchema>;
