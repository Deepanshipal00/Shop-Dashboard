'use client';

import { Box } from '@mui/material';
import AuthGuard from '@/components/AuthGuard';
import DashboardNav from '@/components/DashboardNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <DashboardNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </AuthGuard>
  );
}
