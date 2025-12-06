'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  CircularProgress,
  Chip,
} from '@mui/material';
import { useProductsStore } from '@/store/productsStore';
import { Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getProductById } = useProductsStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(params.id as string);
      setProduct(productData);
      setLoading(false);
    };
    fetchProduct();
  }, [params.id, getProductById]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Button onClick={() => router.back()} sx={{ mb: 3 }}>
        ← Back to Products
      </Button>

      <Paper sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{xs:12, md:6}}>
            <Box
              component="img"
              src={product.images[currentImage] || product.thumbnail}
              alt={product.title}
              sx={{ width: '100%', borderRadius: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto' }}>
              {product.images.map((img, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={img}
                  alt={`${product.title} ${idx + 1}`}
                  onClick={() => setCurrentImage(idx)}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: currentImage === idx ? '2px solid primary.main' : 'none',
                  }}
                />
              ))}
            </Box>
          </Grid>

          <Grid size={{xs:12, md:6}} >
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Chip label={product.category} color="primary" sx={{ mr: 1 }} />
              <Chip label={`⭐ ${product.rating}`} variant="outlined" />
            </Box>

            <Typography variant="h3" color="primary" gutterBottom>
              ${product.price}
            </Typography>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid size={{xs:6}} >
                <Typography variant="subtitle2" color="text.secondary">
                  Brand
                </Typography>
                <Typography variant="body1">{product.brand}</Typography>
              </Grid>
              <Grid size={{xs:6}} >
                <Typography variant="subtitle2" color="text.secondary">
                  Stock
                </Typography>
                <Typography variant="body1">{product.stock} units</Typography>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 4 }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
