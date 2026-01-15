"use server";

import { createClient as createSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createClientRecord(formData: FormData) {
  const supabase = await createSupabaseClient();

  const clientData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string || null,
    phone: formData.get("phone") as string || null,
    company: formData.get("company") as string || null,
  };

  const { error } = await supabase.from("clients").insert(clientData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/clients");
  return { success: true };
}

export async function updateClient(clientId: string, formData: FormData) {
  const supabase = await createSupabaseClient();

  const clientData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string || null,
    phone: formData.get("phone") as string || null,
    company: formData.get("company") as string || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("clients")
    .update(clientData)
    .eq("id", clientId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/clients");
  return { success: true };
}

export async function deleteClient(clientId: string) {
  const supabase = await createSupabaseClient();

  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", clientId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/clients");
  return { success: true };
}

export async function getAllClients() {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { error: error.message, data: [] };
  }

  return { data };
}
