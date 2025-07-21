// src/components/Footer.tsx
import { Divider } from '@mantine/core';
import { Link } from '@tanstack/react-router';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-white dark:bg-zinc-900 text-sm text-gray-600 dark:text-gray-400 mt-auto">
            <Divider className="border-gray-200 dark:border-gray-700" />

            <div className="w-full px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
                <span className="text-center md:text-left">
                    &copy; {year} Walletfy. All rights reserved.
                </span>

                <div className="flex gap-4">
                    <a
                        href="https://github.com/admolinac/walletfy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-600 transition-colors"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
