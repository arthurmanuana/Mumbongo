import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCustomers,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customersService";

export function useCustomers(shopId) {
  return useQuery({
    queryKey: ["customers", shopId],
    enabled: !!shopId,
    queryFn: () => fetchCustomers(shopId),
  });
}

export function useAddCustomer(shopId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => insertCustomer(shopId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers", shopId] });
    },
  });
}

export function useUpdateCustomer(shopId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateCustomer(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers", shopId] });
    },
  });
}

export function useDeleteCustomer(shopId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCustomer(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers", shopId] });
    },
  });
}
