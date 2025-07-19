import { z } from 'zod';

export const ThemeEnum = z.enum(['light', 'dark']);
export type ThemeType = z.infer<typeof ThemeEnum>;

export interface StoreType {
    theme: ThemeType,
    setTheme: (theme: ThemeType) => void,
    initialMoney: number,
    setInitialMoney: (amount: number) => void,
}