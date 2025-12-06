'use client';

import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useUsersStore } from '@/store/usersStore';
import { User } from '@/types';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getUserById } = useUsersStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(params.id as string);
      setUser(userData);
      setLoading(false);
    };
    fetchUser();
  }, [params.id, getUserById]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Button onClick={() => router.back()} sx={{ mb: 3 }}>
        ← Back to Users
      </Button>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid size={{ xs:12, sm:6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Grid>

          <Grid size={{ xs:12, sm:6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body1">{user.phone}</Typography>
          </Grid>

          <Grid size={{ xs:12, sm:6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Gender
            </Typography>
            <Typography variant="body1">{user.gender}</Typography>
          </Grid>

          <Grid size={{ xs:12, sm:6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Company
            </Typography>
            <Typography variant="body1">{user.company.name}</Typography>
          </Grid>

          <Grid size={{ xs:12, sm:6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Position
            </Typography>
            <Typography variant="body1">{user.company.title}</Typography>
          </Grid>

          <Grid size={{ xs:12, sm:6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Location
            </Typography>
            <Typography variant="body1">
              {user.address.city}, {user.address.state}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
