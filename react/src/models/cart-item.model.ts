import {Product} from "@/models/product.model.ts";

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
}