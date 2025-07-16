import { Divider } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import useAppStore from '@/store';
import { cn } from '@/utils/style';

export default function Header() {

  const { setTheme, theme } = useAppStore();

  return (

    <header className={cn("bg-white  text-black", "dark:bg-zinc-900 dark:text-white")}>
      <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-bold tracking-tight hover:opacity-70 transition"
        >
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center shadow-inner',
              theme === 'light' ? 'bg-indigo-100' : 'bg-indigo-800'
            )}
          >
            <img
              src={theme === 'light' ? '/wallet-light.svg' : '/wallet-dark.svg'}
              alt="Wallet Icon"
              className="w-6 h-6"
            />
          </div>

          <span className={cn("text-indigo-700", "dark:text-white")}>
            Walletfy
          </span>
        </Link>

        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle Theme"
          className={cn(
            'w-16 h-8 flex items-center px-1 rounded-full border transition-colors duration-300 cursor-pointer',
            theme === 'light'
              ? 'bg-indigo-100 border-indigo-200 justify-start'
              : 'bg-indigo-800 border-indigo-700 justify-end'
          )}
        >
          <div
            className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center text-sm transition-all duration-300',
              theme === 'light'
                ? 'bg-white text-indigo-400'
                : 'bg-zinc-900 text-white'
            )}
          >
            {theme === 'light' ? <IconMoon size={16} /> : <IconSun size={16} />}
          </div>

        </button>
      </div>

      <Divider className="border-gray-200 dark:border-zinc-700" />
    </header>
  );
}
