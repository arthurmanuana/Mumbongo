import { useQuery } from "@tanstack/react-query";
import { fetchSales } from "../services/salesService";

export function useSales(shopId) {
  return useQuery({
    queryKey: ["sales", shopId],
    enabled: !!shopId,
    queryFn: () => fetchSales(shopId),
  });
}
