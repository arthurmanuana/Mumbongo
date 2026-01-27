import { supabase } from "../lib/supabaseClient";

export async function fetchDebts(shopId) {
  const { data, error } = await supabase
    .from("debts")
    .select(`
      id, shop_id, customer_id, sale_id,
      amount_due, status, created_at, updated_at,
      customer:customers(id,name,phone)
    `)
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) throw error;
  return data ?? [];
}

export async function markDebtPaid(debtId) {
  const { data, error } = await supabase
    .from("debts")
    .update({ status: "PAID", updated_at: new Date().toISOString() })
    .eq("id", debtId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function reopenDebt(debtId) {
  const { data, error } = await supabase
    .from("debts")
    .update({ status: "OPEN", updated_at: new Date().toISOString() })
    .eq("id", debtId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
