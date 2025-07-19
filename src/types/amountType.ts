import { z } from 'zod';

export const AmountSchema = z.object({
    amount: z.number("Amount is mandatory.").positive("The number must be positive"),
});

export type AmountType = z.infer<typeof AmountSchema>;
