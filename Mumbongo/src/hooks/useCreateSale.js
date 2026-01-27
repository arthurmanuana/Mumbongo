import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";

export function useCreateSale(shopId) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      if (!shopId) throw new Error("Boutique introuvable");

      // p_items doit être un JSON array
      const items = payload.items.map((it) => ({
        product_id: it.product_id,
        qty: Number(it.qty),
        unit_price: Number(it.unit_price),
      }));

      const { data, error } = await supabase.rpc("create_sale_safe", {
        p_shop_id: shopId,
        p_customer_id: payload.customer_id ?? null,
        p_payment_type: payload.payment_type,
        p_notes: payload.notes ?? null,
        p_items: items,
      });

      if (error) throw error;
      return data; // sale_id
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sales", shopId] });
      qc.invalidateQueries({ queryKey: ["products", shopId] });
      qc.invalidateQueries({ queryKey: ["debts", shopId] });
    },
  });
}
