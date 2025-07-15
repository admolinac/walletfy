// src/components/Header.tsx
import { Divider } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import useAppStore from '@/store';
import { cn } from '@/utils/style';

export default function Header() {

  const { setTheme, theme } = useAppStore();

  return (

    <header className="bg-white dark:bg-zinc-900 text-black dark:text-white shadow-md">
      <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-bold tracking-tight hover:opacity-90 transition"
        >
          <img
            src={theme === 'light' ? '/wallet-light.svg' : '/wallet-dark.svg'}
            alt="Wallet Icon"
            className="w-9 h-9 drop-shadow"
          />
          <span className="text-indigo-700 dark:text-white bg-indigo-100 dark:bg-indigo-800 px-3 py-1 rounded-lg shadow-sm">
            Walletfy
          </span>
        </Link>

        <button
          className={cn(
            'rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer transition-colors duration-300 shadow-inner',
            theme === 'light'
              ? 'bg-slate-900 text-white hover:bg-slate-700'
              : 'bg-yellow-300 text-zinc-900 hover:bg-yellow-200'
          )}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <Divider className="border-gray-200 dark:border-zinc-700" />
    </header>
  );
}
