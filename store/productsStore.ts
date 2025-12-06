import { create } from 'zustand';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types';

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface ProductsState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  categories: Category[]; // Changed from string[] to Category[]
  cache: Map<string, any>;
  
  fetchProducts: (limit: number, skip: number) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  getProductById: (id: string) => Promise<Product | null>;
  fetchCategories: () => Promise<void>;
  clearCache: () => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  total: 0,
  loading: false,
  error: null,
  categories: [],
  cache: new Map(),

  fetchProducts: async (limit: number, skip: number) => {
    const cacheKey = `products-${limit}-${skip}`;
    const cached = get().cache.get(cacheKey);
    
    if (cached) {
      set({ products: cached.products, total: cached.total });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await productsAPI.getProducts(limit, skip);
      const { products, total } = response.data;
      
      get().cache.set(cacheKey, { products, total });
      set({ products, total, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  searchProducts: async (query: string) => {
    const cacheKey = `search-${query}`;
    const cached = get().cache.get(cacheKey);
    
    if (cached) {
      set({ products: cached.products, total: cached.total });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await productsAPI.searchProducts(query);
      const { products, total } = response.data;
      
      get().cache.set(cacheKey, { products, total });
      set({ products, total, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  filterByCategory: async (category: string) => {
    const cacheKey = `category-${category}`;
    const cached = get().cache.get(cacheKey);
    
    if (cached) {
      set({ products: cached.products, total: cached.total });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await productsAPI.getProductsByCategory(category);
      const { products, total } = response.data;
      
      get().cache.set(cacheKey, { products, total });
      set({ products, total, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  getProductById: async (id: string) => {
    const cacheKey = `product-${id}`;
    const cached = get().cache.get(cacheKey);
    
    if (cached) return cached;

    try {
      const response = await productsAPI.getProductById(id);
      const product = response.data;
      
      get().cache.set(cacheKey, product);
      return product;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return null;
    }
  },

  fetchCategories: async () => {
    const cached = get().cache.get('categories');
    
    if (cached) {
      set({ categories: cached });
      return;
    }

    try {
      const response = await productsAPI.getCategories();
      const categories = response.data; // This is an array of objects
      
      get().cache.set('categories', categories);
      set({ categories });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },

  clearCache: () => {
    set({ cache: new Map() });
  },
}));
