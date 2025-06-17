import {fetchApi} from "@/utils/fetch-api";
import {Payment, PaymentRequest} from "@/models/payment.model.ts";
import {ApiResponse} from "@/models/response.model.ts";

export const paymentService = {
  createPayment: async (order: PaymentRequest) => {
    try {
      return await fetchApi.post<ApiResponse<Payment>>(
          `/payments`,
          order,
      );
    } catch (error) {
      console.error(error);
    }
  }
};
