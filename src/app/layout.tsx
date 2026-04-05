import QueryProvider from "@/components/providers/QueryProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokedex",
  description: "A simple pokedex using Next.js and TanStack Query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
