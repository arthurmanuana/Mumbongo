import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient"; // adapte le chemin si ton client est ailleurs
import { useAuth } from "../context/AuthContext";

export function useMyShop() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["my-shop", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shops")
        .select("id,name,currency")
        .eq("owner_user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });
}
