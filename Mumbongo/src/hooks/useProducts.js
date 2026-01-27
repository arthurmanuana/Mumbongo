import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, insertProduct, updateProduct } from "../services/productsService";

export function useProducts(shopId) {
  return useQuery({
    queryKey: ["products", shopId],
    enabled: !!shopId,
    queryFn: () => fetchProducts(shopId),
  });
}

export function useAddProduct(shopId) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload) => insertProduct(shopId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products", shopId] });
    },
  });
}

export function useUpdateProduct(shopId) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateProduct(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products", shopId] });
    },
  });
}
