import QueryProvider from '@/components/providers/QueryProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pokédex — Discover and Explore Pokémon',
  description:
    'Browse the full Pokédex with pagination or infinite scroll. Powered by PokéAPI and built with Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
