"use client";

import { useState, useRef } from "react";
import { createTeamMember, updateTeamMember } from "@/app/dashboard/team/actions";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string | null;
  phone: string | null;
}

interface TeamFormProps {
  editMember?: TeamMember;
  onEditComplete?: () => void;
}

export default function TeamForm({ editMember, onEditComplete }: TeamFormProps) {
  const [isOpen, setIsOpen] = useState(!!editMember);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const result = editMember
      ? await updateTeamMember(editMember.id, formData)
      : await createTeamMember(formData);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage(editMember ? "Team member updated successfully!" : "Team member created successfully!");
      if (!editMember) {
        formRef.current?.reset();
      }
      setTimeout(() => {
        setIsOpen(false);
        setMessage("");
        if (editMember && onEditComplete) {
          onEditComplete();
        }
      }, 1500);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (editMember && onEditComplete) {
      onEditComplete();
    }
  };

  return (
    <div>
      {!editMember && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isOpen ? "Cancel" : "+ New Team Member"}
        </button>
      )}

      {isOpen && (
        <div className="mt-4 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">{editMember ? "Edit Team Member" : "Add Team Member"}</h3>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                defaultValue={editMember?.name || ""}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                defaultValue={editMember?.email || ""}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-1">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="e.g., Developer, Designer"
                  defaultValue={editMember?.role || ""}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={editMember?.phone || ""}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                />
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

            <div className={editMember ? "flex gap-2" : ""}>
              {editMember && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`${editMember ? "flex-1" : "w-full"} bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition`}
              >
                {loading 
                  ? (editMember ? "Updating..." : "Adding...") 
                  : (editMember ? "Update Team Member" : "Add Team Member")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
