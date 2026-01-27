import { supabase } from "../lib/supabaseClient";

export async function fetchSales(shopId) {
  const { data, error } = await supabase
    .from("sales")
    .select("id,created_at,payment_type,total_amount,customer_id,notes")
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) throw error;
  return data ?? [];
}

export async function fetchSaleDetails(saleId) {
  const { data, error } = await supabase
    .from("sale_items")
    .select("id,qty,unit_price,line_total,product:products(id,name)")
    .eq("sale_id", saleId)
    .order("id", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createSale() {
  throw new Error(
    "createSale() désactivée. Utilise uniquement supabase.rpc('create_sale_safe') via useCreateSale()."
  );
}
