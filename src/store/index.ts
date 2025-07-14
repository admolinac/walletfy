import { create } from 'zustand';
import type { StoreType } from '@/types/storeType';

const useAppStore = create<StoreType>(
    (set) => (
        {
            theme: 'light',
            setTheme: (theme) => set({ theme })
        }
    )
);

export default useAppStore;