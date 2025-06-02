export interface Order {
  id: string;
  userId: string;
  amount: number;
  status: string;
  address: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface OrderRequest {
  userId: string;
  amount: number;
  status: string;
  address: string;
  orderItems: OrderItemRequest[];
}

export interface OrderItemRequest {
  productId: string;
  orderId: string;
  quantity: number;
  price: number;
  amount: number;
}
