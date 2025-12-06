import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: { 'Content-Type': 'application/json' }
});

export const authAPI = {
  login : (username: string, password: string) => 
    api.post('/auth/login', {username, password}),
};

export const usersAPI = {
  getUsers : (limit = 10, skip = 0) => 
    api.get(`/users?limit=${limit}&skip=${skip}`),
  searchUsers : (query : string) => 
    api.get(`/users/search?q=${query}`),
  getUserById: (id: string) => 
    api.get(`/users/${id}`),
}

export const productsAPI = {
  getProducts : (limit = 10, skip = 0) => 
    api.get(`/products?limit=${limit}&skip=${skip}`),
  searchProducts: (query: string) =>
    api.get(`/products/search?q=${query}`),
  getProductsByCategory: (category: string) =>
    api.get(`/products/category/${category}`),
  getProductById: (id: string) =>
    api.get(`/products/${id}`),
  getCategories: () =>
    api.get(`/products/categories`),
}


export default api;
