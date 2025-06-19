export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  featured: boolean;
}

export interface CategoryRequest {
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  featured: boolean;
}
