"use client";

import { useState } from "react";
import { deleteTeamMember } from "@/app/dashboard/team/actions";
import TeamForm from "./TeamForm";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string | null;
  phone: string | null;
  created_at: string;
}

interface TeamListProps {
  teamMembers: TeamMember[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

export default function TeamList({ teamMembers }: TeamListProps) {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (member: TeamMember) => {
    if (deletingId) return;

    const confirmed = confirm(
      `Are you sure you want to delete ${member.name}?\n\nAny tasks assigned to this team member will have their assigned_to field set to null.`
    );

    if (!confirmed) return;

    setDeletingId(member.id);
    try {
      const result = await deleteTeamMember(member.id);
      if (!result.success) {
        alert(result.error || "Failed to delete team member");
      }
    } catch (error) {
      alert("Failed to delete team member");
    } finally {
      setDeletingId(null);
    }
  };

  if (editingMember) {
    return (
      <TeamForm
        editMember={editingMember}
        onEditComplete={() => setEditingMember(null)}
      />
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No team members yet. Add your first team member above.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member) => (
        <div
          key={member.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              {member.role && (
                <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full">
                  {member.role}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingMember(member)}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member)}
                disabled={deletingId === member.id}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium disabled:opacity-50"
              >
                {deletingId === member.id ? "..." : "Delete"}
              </button>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Email:</span>
              <p className="font-medium break-all">{member.email}</p>
            </div>

            {member.phone && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                <p className="font-medium">{member.phone}</p>
              </div>
            )}

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Joined:</span>
              <p className="text-xs font-medium">{formatDate(member.created_at)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
