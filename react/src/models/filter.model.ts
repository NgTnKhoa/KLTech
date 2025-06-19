export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sortBy?: 'price-low' | 'price-high';
}