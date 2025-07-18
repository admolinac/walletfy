import { Divider, Title, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import useAppStore from '@/store';
import { cn } from '@/utils/style';

export default function Header() {

  const { setTheme, theme } = useAppStore();
  const { setColorScheme } = useMantineColorScheme();

  return (
    <header className={cn("bg-white  text-black", "dark:bg-zinc-900 dark:text-white")}>
      <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-semibold tracking-tight hover:opacity-90 transition-opacity duration-200"
        >
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center shadow-md',
              theme === 'light' ? 'bg-indigo-50 border-indigo-200' : 'bg-indigo-700'
            )}
          >
            <img
              src={theme === 'light' ? '/wallet-light.svg' : '/wallet-dark.svg'}
              alt="Wallet Icon"
              className="w-6 h-6"
            />
          </div>

          <Title order={3} className={cn("text-zinc-800", "dark:text-white select-none")}> Walletfy</Title>
        </Link>

        <button
          onClick={() => toggleTheme()}
          aria-label="Toggle Theme"
          className={cn(
            'w-16 h-8 flex items-center px-1 rounded-full border transition-colors duration-300',
            theme === 'light'
              ? 'bg-indigo-100 border-indigo-200 justify-start'
              : 'bg-indigo-800 border-indigo-600 justify-end',
            'cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400'
          )}
        >
          <div
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all duration-300',
              theme === 'light'
                ? 'bg-white text-indigo-500 ml-[2px]'
                : 'bg-zinc-900 text-yellow-400 mr-[2px]'
            )}
          >
            {theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
          </div>

        </button>
      </div>

      <Divider className="border-gray-200 dark:border-zinc-700" />
    </header>
  );

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    setColorScheme(next);
  }

}
