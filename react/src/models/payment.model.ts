export interface Payment {
  id: string;
  status: string;
  method: number;
  amount: number;
  transactionId: string;
  orderId: string;
}

export interface PaymentRequest {
  status: string;
  method: string;
  amount: number;
  transactionId: string;
  orderId: string;
}
