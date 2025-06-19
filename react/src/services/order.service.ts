import {fetchApi} from "@/utils/fetch-api";
import {Order, OrderRequest} from "@/models/order.model.ts";
import {ApiResponse} from "@/models/response.model.ts";

export const orderService = {
  createOrder: async (order: OrderRequest) => {
    try {
      return await fetchApi.post<ApiResponse<Order>>(
          `/orders`,
          order,
      );
    } catch (error) {
      console.error(error);
    }
  }
};
