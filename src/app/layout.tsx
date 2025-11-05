import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { I18nProvider } from '@/lib/i18n';
import { NavBar } from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'SolveIt ? Every Problem Has a Solution',
  description: 'A social problem-solving community with AI suggestions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <I18nProvider>
            <NavBar />
            <main className="container py-4">
              {children}
            </main>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
