
import { supabase } from "../lib/supabaseClient";

export async function fetchProducts(shopId) {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,stock_qty,low_stock_threshold,is_active,created_at")
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function insertProduct(shopId, payload) {
  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        shop_id: shopId,
        name: payload.name,
        price: payload.price,
        stock_qty: payload.stock_qty,
        low_stock_threshold: payload.low_stock_threshold,
        is_active: payload.is_active,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(productId, payload) {
  const { data, error } = await supabase
    .from("products")
    .update({
      name: payload.name,
      price: payload.price,
      stock_qty: payload.stock_qty,
      low_stock_threshold: payload.low_stock_threshold,
      is_active: payload.is_active,
    })
    .eq("id", productId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
