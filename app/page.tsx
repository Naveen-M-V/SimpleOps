import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold">Welcome to SimpleOps</h1>
        <p className="text-xl text-center max-w-md">
          A Next.js 14 app with Supabase authentication
        </p>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
