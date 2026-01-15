"use client";

import { useState, useRef } from "react";
import { createClientRecord, updateClient } from "@/app/dashboard/clients/actions";

interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
}

interface ClientFormProps {
  editClient?: Client;
  onEditComplete?: () => void;
}

export default function ClientForm({ editClient, onEditComplete }: ClientFormProps) {
  const [isOpen, setIsOpen] = useState(!!editClient);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const result = editClient
      ? await updateClient(editClient.id, formData)
      : await createClientRecord(formData);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage(editClient ? "Client updated successfully!" : "Client created successfully!");
      if (!editClient) {
        formRef.current?.reset();
      }
      setTimeout(() => {
        setIsOpen(false);
        setMessage("");
        if (editClient && onEditComplete) {
          onEditComplete();
        }
      }, 1500);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (editClient && onEditComplete) {
      onEditComplete();
    }
  };

  return (
    <div>
      {!editClient && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isOpen ? "Cancel" : "+ New Client"}
        </button>
      )}

      {isOpen && (
        <div className="mt-4 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">{editClient ? "Edit Client" : "Create New Client"}</h3>
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
                defaultValue={editClient?.name || ""}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={editClient?.email || ""}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={editClient?.phone || ""}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  defaultValue={editClient?.company || ""}
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

            <div className="flex gap-2">
              {editClient && (
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
                className={`${editClient ? "flex-1" : "w-full"} bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition`}
              >
                {loading ? (editClient ? "Updating..." : "Creating...") : (editClient ? "Update Client" : "Create Client")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}