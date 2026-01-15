import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { getTasks, getClients, getTeamMembers } from "./actions";

export default async function TasksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [tasksResult, clientsResult, teamMembersResult] = await Promise.all([
    getTasks(),
    getClients(),
    getTeamMembers(),
  ]);

  const tasks = tasksResult.data || [];
  const clients = clientsResult.data || [];
  const teamMembers = teamMembersResult.data || [];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Tasks</h1>
          </div>

          <div className="mb-8">
            <TaskForm clients={clients} teamMembers={teamMembers} />
          </div>

          <TaskList tasks={tasks} clients={clients} teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  );
}
