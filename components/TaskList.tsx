"use client";

import { useState } from "react";
import { updateTaskStatus, deleteTask } from "@/app/dashboard/tasks/actions";
import TaskForm from "./TaskForm";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  client_id: string | null;
  assigned_to: string | null;
  clients: { id: string; name: string } | null;
  team_members: { id: string; name: string } | null;
  created_at: string;
}

interface TaskListProps {
  tasks: Task[];
  clients: Array<{ id: string; name: string }>;
  teamMembers: Array<{ id: string; name: string }>;
}

export default function TaskList({ tasks, clients, teamMembers }: TaskListProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    setUpdatingId(taskId);
    await updateTaskStatus(taskId, newStatus);
    setUpdatingId(null);
  };

  const handleDelete = async (taskId: string, taskTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${taskTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(taskId);
    const result = await deleteTask(taskId);
    if (result.error) {
      alert(`Error deleting task: ${result.error}`);
    }
    setDeletingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const formatStatus = (status: string) => {
    return status.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No tasks yet. Create your first task above.
      </div>
    );
  }

  if (editingTask) {
    return (
      <TaskForm
        clients={clients}
        teamMembers={teamMembers}
        editTask={editingTask}
        onEditComplete={() => setEditingTask(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{task.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingTask(task)}
                disabled={deletingId === task.id}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium disabled:opacity-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id, task.title)}
                disabled={deletingId === task.id}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium disabled:opacity-50"
              >
                {deletingId === task.id ? "Deleting..." : "Delete"}
              </button>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                disabled={updatingId === task.id || deletingId === task.id}
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)} border-0 focus:ring-2 focus:ring-blue-500`}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {task.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {task.description}
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {task.clients && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Client:</span>
                <p className="font-medium">{task.clients.name}</p>
              </div>
            )}

            {task.team_members && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Assigned to:</span>
                <p className="font-medium">{task.team_members.name}</p>
              </div>
            )}

            {task.due_date && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Due:</span>
                <p className="font-medium">
                  {formatDate(task.due_date)}
                </p>
              </div>
            )}

            <div>
              <span className="text-gray-500 dark:text-gray-400">Created:</span>
              <p className="font-medium">
                {formatDate(task.created_at)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
