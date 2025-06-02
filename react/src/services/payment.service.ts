import {fetchApi} from "@/utils/fetch-api";
import {handleApiError} from "@/utils/exception-handler";
import {Payment, PaymentRequest} from "@/models/payment.model.ts";

export const paymentService = {
  createPayment: async (order: PaymentRequest) => {
    try {
      return await fetchApi.post<Payment>(
          `/payments`,
          order,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  }
};
