import { Link } from '@tanstack/react-router';
import useAppStore from '@/store';
import { cn } from '@/utils/style';

export default function Header() {

  const { setTheme, theme } = useAppStore();

  return (
    <header className="bg-white text-black shadow-sm dark:bg-zinc-900 dark:text-white">
      <div className="w-full px-4 md:px-6 py-3 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight hover:opacity-90 transition"
        >
          <img
            src={theme === 'light' ? '/wallet-light.svg' : '/wallet-dark.svg'}
            alt="Wallet Icon"
            className="w-8 h-8"
          />
          <div className="flex items-center space-x-1">
            <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-white px-2 py-1 rounded-md">
              Walletfy
            </span>
          </div>
        </Link>

        <button
          className={cn(
            'rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer transition-colors duration-300',
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
    </header>
  );
}
