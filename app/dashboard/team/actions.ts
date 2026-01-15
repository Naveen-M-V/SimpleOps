"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTeamMember(formData: FormData) {
  const supabase = await createClient();

  const memberData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    role: formData.get("role") as string || null,
    phone: formData.get("phone") as string || null,
  };

  const { error } = await supabase.from("team_members").insert(memberData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/team");
  return { success: true };
}

export async function updateTeamMember(memberId: string, formData: FormData) {
  const supabase = await createClient();

  const memberData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    role: formData.get("role") as string || null,
    phone: formData.get("phone") as string || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("team_members")
    .update(memberData)
    .eq("id", memberId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/team");
  return { success: true };
}

export async function deleteTeamMember(memberId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", memberId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/team");
  return { success: true };
}

export async function getAllTeamMembers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { error: error.message, data: [] };
  }

  return { data };
}
