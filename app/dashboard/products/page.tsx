'use client';

import React from "react";
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Container,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useProductsStore } from '@/store/productsStore';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';

const ProductCard = React.memo(({ product, onClick }: { product: Product; onClick: () => void }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardMedia
      component="img"
      height="200"
      image={product.thumbnail}
      alt={product.title}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {product.description}
      </Typography>
      <Typography variant="h6" color="primary" gutterBottom>
        ${product.price}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Category: {product.category} | Rating: ⭐ {product.rating}
      </Typography>
    </CardContent>
    <Box sx={{ p: 2 }}>
      <Button fullWidth variant="contained" onClick={onClick}>
        View Details
      </Button>
    </Box>
  </Card>
));

ProductCard.displayName = 'ProductCard';

export default function ProductsPage() {
  const router = useRouter();
  const {
    products,
    total,
    loading,
    categories,
    fetchProducts,
    searchProducts,
    filterByCategory,
    fetchCategories,
  } = useProductsStore();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [mounted, setMounted] = useState(false);
  const limit = 12;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchProducts(limit, (page - 1) * limit);
      fetchCategories();
    }
  }, [page, mounted, fetchProducts, fetchCategories]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        searchProducts(searchQuery);
      } else {
        fetchProducts(limit, 0);
      }
      setPage(1);
    },
    [searchQuery, searchProducts, fetchProducts]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      if (category) {
        filterByCategory(category);
      } else {
        fetchProducts(limit, 0);
      }
      setPage(1);
    },
    [filterByCategory, fetchProducts]
  );

  const totalPages = useMemo(() => Math.ceil(total / limit), [total]);

  if (!mounted) return null;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              label="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProductCard
                  product={product}
                  onClick={() => router.push(`/dashboard/products/${product.id}`)}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
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
