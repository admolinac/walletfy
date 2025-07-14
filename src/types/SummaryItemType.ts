import { z } from 'zod';

export const SummaryItemSchema = z.object({
    label: z.string().min(1).max(20, { error: "The maximum number of characters has been exceeded" }),
    value: z.number().positive("The number must be positive"),
});

export type SummaryItemType = z.infer<typeof SummaryItemSchema>;
