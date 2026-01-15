import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ClientForm from "@/components/ClientForm";
import ClientList from "@/components/ClientList";
import { getAllClients } from "./actions";

export default async function ClientsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const clientsResult = await getAllClients();
  const clients = clientsResult.data || [];

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
            <h1 className="text-3xl font-bold">Clients</h1>
          </div>

          <div className="mb-8">
            <ClientForm />
          </div>

          <ClientList clients={clients} />
        </div>
      </div>
    </div>
  );
}
