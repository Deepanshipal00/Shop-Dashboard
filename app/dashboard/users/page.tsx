'use client';

import React from "react";
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Pagination,
} from '@mui/material';
import { useUsersStore } from '@/store/usersStore';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

// Performance optimization using React.memo
const UserRow = React.memo(({ user, onClick }: { user: User; onClick: () => void }) => (
  <TableRow hover>
    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.gender}</TableCell>
    <TableCell>{user.phone}</TableCell>
    <TableCell>{user.company.name}</TableCell>
    <TableCell>
      <Button variant="outlined" size="small" onClick={onClick}>
        View Details
      </Button>
    </TableCell>
  </TableRow>
));

export default function UsersPage() {
  const router = useRouter();
  const { users, total, loading, fetchUsers, searchUsers } = useUsersStore();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 10;

  useEffect(() => {
    fetchUsers(limit, (page - 1) * limit);
  }, [page, fetchUsers]);

  // useCallback to prevent unnecessary re-renders
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        searchUsers(searchQuery);
      } else {
        fetchUsers(limit, 0);
      }
      setPage(1);
    },
    [searchQuery, searchUsers, fetchUsers]
  );

  // useMemo for computed values
  const totalPages = useMemo(() => Math.ceil(total / limit), [total]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ mt: 1 }}>
          Search
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onClick={() => router.push(`/dashboard/users/${user.id}`)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
}
