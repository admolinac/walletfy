import { create } from 'zustand';
import type { StoreType } from '@/types/storeType';

const useAppStore = create<StoreType>(
    (set) => (
        {
            theme: 'light',
            initialMoney: Number(localStorage.getItem('initialMoney')) || 0,
            setInitialMoney: (amount) => {
                localStorage.setItem('initialMoney', amount.toString());
                set({ initialMoney: amount });
            },
            setTheme: (theme) =>
                set((state) => {

                    localStorage.setItem('theme', theme);

                    if (theme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }

                    return {
                        ...state,
                        theme
                    }
                })
        }
    )
);

export default useAppStore;