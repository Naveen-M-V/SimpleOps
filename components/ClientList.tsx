"use client";

import { useState } from "react";
import { deleteClient } from "@/app/dashboard/clients/actions";
import ClientForm from "./ClientForm";

interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  created_at: string;
}

interface ClientListProps {
  clients: Client[];
}

export default function ClientList({ clients }: ClientListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleDelete = async (clientId: string, clientName: string) => {
    if (!confirm(`Are you sure you want to delete "${clientName}"? This will also delete all tasks associated with this client. This action cannot be undone.`)) {
      return;
    }

    setDeletingId(clientId);
    const result = await deleteClient(clientId);
    if (result.error) {
      alert(`Error deleting client: ${result.error}`);
    }
    setDeletingId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (editingClient) {
    return (
      <ClientForm
        editClient={editingClient}
        onEditComplete={() => setEditingClient(null)}
      />
    );
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No clients yet. Create your first client above.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {clients.map((client) => (
        <div
          key={client.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold flex-1">{client.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingClient(client)}
                disabled={deletingId === client.id}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium disabled:opacity-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(client.id, client.name)}
                disabled={deletingId === client.id}
                className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium disabled:opacity-50"
              >
                {deletingId === client.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            {client.company && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Company:</span>
                <p className="font-medium">{client.company}</p>
              </div>
            )}

            {client.email && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Email:</span>
                <p className="font-medium break-all">{client.email}</p>
              </div>
            )}

            {client.phone && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                <p className="font-medium">{client.phone}</p>
              </div>
            )}

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Created:</span>
              <p className="text-xs font-medium">
                {formatDate(client.created_at)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
