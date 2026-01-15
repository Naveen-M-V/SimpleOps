"use client";

import { useState, useRef } from "react";
import { createTask, updateTask } from "@/app/dashboard/tasks/actions";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  client_id: string | null;
  assigned_to: string | null;
}

interface TaskFormProps {
  clients: Array<{ id: string; name: string }>;
  teamMembers: Array<{ id: string; name: string }>;
  editTask?: Task;
  onEditComplete?: () => void;
}

export default function TaskForm({ clients = [], teamMembers = [], editTask, onEditComplete }: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(!!editTask);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const result = editTask 
      ? await updateTask(editTask.id, formData)
      : await createTask(formData);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage(editTask ? "Task updated successfully!" : "Task created successfully!");
      if (!editTask) {
        formRef.current?.reset();
      }
      setTimeout(() => {
        setIsOpen(false);
        setMessage("");
        if (editTask && onEditComplete) {
          onEditComplete();
        }
      }, 1500);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (editTask && onEditComplete) {
      onEditComplete();
    }
  };

  return (
    <div>
      {!editTask && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isOpen ? "Cancel" : "+ New Task"}
        </button>
      )}

      {isOpen && (
        <div className="mt-4 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">{editTask ? "Edit Task" : "Create New Task"}</h3>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={editTask?.title || ""}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={editTask?.description || ""}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={editTask?.status || "pending"}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label htmlFor="due_date" className="block text-sm font-medium mb-1">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  id="due_date"
                  name="due_date"
                  defaultValue={formatDateForInput(editTask?.due_date || null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="client_id" className="block text-sm font-medium mb-1">
                  Client
                </label>
                <select
                  id="client_id"
                  name="client_id"
                  defaultValue={editTask?.client_id || ""}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                >
                  <option value="">None</option>
                  {clients?.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="assigned_to" className="block text-sm font-medium mb-1">
                  Assign To
                </label>
                <select
                  id="assigned_to"
                  name="assigned_to"
                  defaultValue={editTask?.assigned_to || ""}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                >
                  <option value="">Unassigned</option>
                  {teamMembers?.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes("success")
                  ? "bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300"
                  : "bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300"
              }`}>
                {message}
              </div>
            )}

            <div className="flex gap-2">
              {editTask && (
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`${editTask ? "flex-1" : "w-full"} bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition`}
              >
                {loading ? (editTask ? "Updating..." : "Creating...") : (editTask ? "Update Task" : "Create Task")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
