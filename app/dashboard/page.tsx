'use client';

import { Container, Grid, Paper, Typography, Box } from '@mui/material'; 
import { People, Inventory, Category } from '@mui/icons-material';
import Link from 'next/link';

const StatCard = ({ title, value, icon, color, link }: any) => (
  <Paper
    component={Link}
    href={link}
    sx={{
      p: 3,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      textDecoration: 'none',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
      transition: 'all 0.3s',
    }}
  >
    <Box
      sx={{
        bgcolor: `${color}.light`,
        color: `${color}.main`,
        p: 2,
        borderRadius: 2,
        mr: 2,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
      <Typography color="text.secondary">{title}</Typography>
    </Box>
  </Paper>
);

export default function DashboardHome() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size ={{ xs:12, sm:6, md:4}}>
          <StatCard
            title="Total Users"
            value="194"
            icon={<People fontSize="large" />}
            color="primary"
            link="/dashboard/users"
          />
        </Grid>

        <Grid size ={{ xs:12, sm:6, md:4}}>
          <StatCard
            title="Total Products"
            value="194"
            icon={<Inventory fontSize="large" />}
            color="success"
            link="/dashboard/products"
          />
        </Grid>

        <Grid size ={{ xs:12, sm:6, md:4}}>
          <StatCard
            title="Categories"
            value="20"
            icon={<Category fontSize="large" />}
            color="warning"
            link="/dashboard/products"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
