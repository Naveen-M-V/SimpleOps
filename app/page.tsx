import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 gap-20">
        <section className="max-w-3xl text-center flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100">
            Simple internal dashboard for clients, tasks, and teams
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Built for freelancers and small teams who want clarity without bloated tools.
          </p>
          <div className="flex justify-center">
            <Link
              href="/login"
              className="px-7 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
            >
              Try Demo Dashboard
            </Link>
          </div>
        </section>

        <section className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col gap-3">
            <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">
              Client Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Store client details and track related work in one place.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col gap-3">
            <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">
              Task Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create, assign, and update tasks with clear status indicators.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col gap-3">
            <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">
              Team Visibility
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Know who’s working on what without endless messages.
            </p>
          </div>
        </section>

        <section className="max-w-md w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center flex flex-col gap-3">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            Demo Credentials
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Email: <span className="font-mono">demo@simpleops.app</span>
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Password: <span className="font-mono">Demo@123</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Shared demo environment. Data may reset.
          </p>
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-700">
        Built by an independent developer. Feedback welcome.
      </footer>
    </div>
  );
}
