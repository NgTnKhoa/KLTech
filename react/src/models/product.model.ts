export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  discount: number;
  status: string;
  featured: boolean;
  categoryId: string;
  colors: string[];
}

export interface ProductRequest {
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  discount: number;
  status: string;
  featured: boolean;
  categoryId: string;
  colors: string[];
}
