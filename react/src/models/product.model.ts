export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  discount: number;
  status: string;
  featured: string;
  categoryId: string;
  colors: string[];
}
