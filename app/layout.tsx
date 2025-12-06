import ThemeRegistry from '@/components/ThemeRegistry';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ShopSync Dashboard',
  description: 'Admin dashboard with Next.js, MUI, and Zustand',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
