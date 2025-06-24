import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { ToastProvider } from '../components/providers/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PromptBox - AI Prompt Management Tool',
  description: 'Lightweight AI prompt management tool for organizing and managing your prompts',
  keywords: 'AI, prompts, management, tool, productivity',
  authors: [{ name: 'PromptBox Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background-50 dark:bg-background-900 transition-colors`}>
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 