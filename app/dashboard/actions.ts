"use server";

import { createClient } from "@/utils/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const [tasksResult, clientsResult, teamMembersResult] = await Promise.all([
    supabase.from("tasks").select("id, status", { count: "exact" }),
    supabase.from("clients").select("id", { count: "exact" }),
    supabase.from("team_members").select("id", { count: "exact" }),
  ]);

  const tasksByStatus = {
    pending: 0,
    in_progress: 0,
    completed: 0,
  };

  if (tasksResult.data) {
    tasksResult.data.forEach((task) => {
      if (task.status in tasksByStatus) {
        tasksByStatus[task.status as keyof typeof tasksByStatus]++;
      }
    });
  }

  return {
    totalTasks: tasksResult.count || 0,
    totalClients: clientsResult.count || 0,
    totalTeamMembers: teamMembersResult.count || 0,
    tasksByStatus,
  };
}
