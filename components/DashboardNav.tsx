'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function DashboardNav() {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getButtonStyle = (path: string) => ({
    color: pathname === path ? '#90caf9' : '#ffffff',  // Light blue if active, white otherwise
    fontWeight: pathname === path ? 600 : 500,
    backgroundColor: pathname === path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
  });

  if (!mounted) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Link href="/dashboard" passHref >
          <Button sx={getButtonStyle('/dashboard')}>Home</Button>
        </Link>
        <Link href="/dashboard/users" passHref >
          <Button sx={getButtonStyle('/dashboard/users')}>Users</Button>
        </Link>
        <Link href="/dashboard/products" passHref >
          <Button sx={getButtonStyle('/dashboard/products')}>Products</Button>
        </Link>
        <Button 
          onClick={handleLogout}
          sx={{ 
            color: '#ffcdd2',
            '&:hover': { 
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              color: '#ff5252',
            } 
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
