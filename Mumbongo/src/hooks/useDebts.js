import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDebts, markDebtPaid, reopenDebt } from "../services/debtsService";

export function useDebts(shopId) {
  return useQuery({
    queryKey: ["debts", shopId],
    enabled: !!shopId,
    queryFn: () => fetchDebts(shopId),
  });
}

export function useMarkDebtPaid(shopId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (debtId) => markDebtPaid(debtId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["debts", shopId] });
    },
  });
}

export function useReopenDebt(shopId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (debtId) => reopenDebt(debtId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["debts", shopId] });
    },
  });
}
