import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { getDashboardStats } from "./actions";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const stats = await getDashboardStats();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <LogoutButton />
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
              <p className="text-gray-600 dark:text-gray-400">
                You are logged in as: <span className="font-medium">{user.email}</span>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-6 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                    {stats.totalTasks}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                    Total Tasks
                  </div>
                </div>

                <div className="p-6 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-300">
                    {stats.totalClients}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-300 mt-1">
                    Total Clients
                  </div>
                </div>

                <div className="p-6 bg-purple-50 dark:bg-purple-900 rounded-lg border border-purple-200 dark:border-purple-700">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">
                    {stats.totalTeamMembers}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-300 mt-1">
                    Team Members
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3">Tasks by Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-700">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">
                      {stats.tasksByStatus.pending}
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
                      Pending
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                      {stats.tasksByStatus.in_progress}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      In Progress
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-300">
                      {stats.tasksByStatus.completed}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-300 mt-1">
                      Completed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-4">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/dashboard/tasks"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View Tasks
                </Link>
                <Link
                  href="/dashboard/clients"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  View Clients
                </Link>
                <Link
                  href="/dashboard/team"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  View Team
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">User ID</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 break-all">{user.id}</p>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Last Sign In</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
