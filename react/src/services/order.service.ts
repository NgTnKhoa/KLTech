import {fetchApi} from "@/utils/fetch-api";
import {handleApiError} from "@/utils/exception-handler";
import {Order, OrderRequest} from "@/models/order.model.ts";

export const orderService = {
  createOrder: async (order: OrderRequest) => {
    try {
      return await fetchApi.post<Order>(
          `/orders`,
          order,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  }
};
