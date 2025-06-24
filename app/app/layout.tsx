import { AppHeader } from '../../components/AppHeader';
import { AppFooter } from '../../components/AppFooter';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <AppHeader />
      <main className="flex-1">
        {children}
      </main>
      <AppFooter />
    </div>
  );
} 