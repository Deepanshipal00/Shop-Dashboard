export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  image: string;
  company: {
    name: string;
    title: string;
  };
  address: {
    city: string;
    state: string;
  };
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand: string;
}

export interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
