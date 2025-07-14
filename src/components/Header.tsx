import { Link } from '@tanstack/react-router';
import useAppStore from '@/store';
import { cn } from '@/utils/style';

export default function Header() {

  const { setTheme, theme } = useAppStore();

  console.log(theme)
  return (
    <header className="bg-white text-black shadow-sm dark:bg-slate-900 dark:text-white">
      <div className="mx-auto w-full max-w-screen-xl px-4 md:px-4 lg:px-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold tracking-wide hover:opacity-90 transition"
        >
          Walletfy
        </Link>

        <button
          className={cn(
            'rounded-full w-10 h-10 flex justify-center items-center text-xl transition duration-300 cursor-pointer',
            'bg-slate-900 text-white hover:bg-slate-700 dark:bg-yellow-300 dark:text-slate-900 dark:hover:bg-yellow-200'
          )}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header >
  );
}
