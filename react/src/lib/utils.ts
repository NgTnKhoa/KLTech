
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Product} from "@/models/product.model.ts";
import {FilterOptions} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const filterProducts = (products: Product[], filters: FilterOptions) => {
  return products.filter(product => {
    // Filter by price
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      const price = product.price;
      if (price < filters.minPrice || price > filters.maxPrice) return false;
    }

    // Filter by colors
    if (filters.colors && filters.colors.length > 0) {
      if (!product.colors.some((color) => filters.colors.includes(color))) return false;
    }

    return true;
  });
};

export const sortProducts = (products: Product[], sortBy?: string) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sortedProducts.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        return priceA - priceB;
      });
    case 'price-high':
      return sortedProducts.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        return priceB - priceA;
      });
    case 'newest':
    default:
      return sortedProducts;
  }
};
