import { Outlet, createRootRoute } from '@tanstack/react-router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-black dark:text-white">
      <Header />

      <main className="flex-grow w-full px-4 md:px-6 py-6">
        <Outlet />
      </main>

      <Footer />

    </div>
  ),
})
