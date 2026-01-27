import { supabase } from "../lib/supabaseClient";

export async function fetchCustomers(shopId) {
  const { data, error } = await supabase
    .from("customers")
    .select("id,shop_id,name,phone,created_at")
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) throw error;
  return data ?? [];
}

export async function insertCustomer(shopId, payload) {
  const { data, error } = await supabase
    .from("customers")
    .insert({
      shop_id: shopId,
      name: payload.name,
      phone: payload.phone || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCustomer(customerId, payload) {
  const { data, error } = await supabase
    .from("customers")
    .update({
      name: payload.name,
      phone: payload.phone || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", customerId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCustomer(customerId) {
  const { error } = await supabase.from("customers").delete().eq("id", customerId);
  if (error) throw error;
  return true;
}
