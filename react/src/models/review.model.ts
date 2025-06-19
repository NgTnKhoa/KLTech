export interface Review {
  id: string;
  rating: number;
  content: string;
  author: string;
  productId: string;
  createdAt: string;
}

export interface ReviewRequest {
  rating: number;
  content: string;
  author: string;
  productId: string;
}
