import { useQuery } from "@tanstack/react-query";
import { fetchSaleDetails } from "../services/salesService";

export function useSaleDetails(saleId, open) {
  return useQuery({
    queryKey: ["sale-details", saleId],
    enabled: !!saleId && !!open,
    queryFn: () => fetchSaleDetails(saleId),
  });
}
