"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  const supabase = await createClient();

  const taskData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    status: formData.get("status") as string,
    client_id: formData.get("client_id") as string || null,
    assigned_to: formData.get("assigned_to") as string || null,
    due_date: formData.get("due_date") as string || null,
  };

  const { error } = await supabase.from("tasks").insert(taskData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/tasks");
  return { success: true };
}

export async function updateTask(taskId: string, formData: FormData) {
  const supabase = await createClient();

  const taskData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    status: formData.get("status") as string,
    client_id: formData.get("client_id") as string || null,
    assigned_to: formData.get("assigned_to") as string || null,
    due_date: formData.get("due_date") as string || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("tasks")
    .update(taskData)
    .eq("id", taskId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/tasks");
  return { success: true };
}

export async function updateTaskStatus(taskId: string, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", taskId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/tasks");
  return { success: true };
}

export async function deleteTask(taskId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/tasks");
  return { success: true };
}

export async function getTasks() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select(`
      *,
      clients (id, name),
      team_members (id, name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return { error: error.message, data: [] };
  }

  return { data };
}

export async function getClients() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select("id, name")
    .order("name");

  if (error) {
    return { error: error.message, data: [] };
  }

  return { data };
}

export async function getTeamMembers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("team_members")
    .select("id, name")
    .order("name");

  if (error) {
    return { error: error.message, data: [] };
  }

  return { data };
}
