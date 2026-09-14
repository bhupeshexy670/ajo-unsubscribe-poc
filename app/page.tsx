"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [params, setParams] = useState("demo");
  const [pid, setPid] = useState("demo");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch(
        `/api/unsubscribe?params=${encodeURIComponent(params)}&pid=${encodeURIComponent(pid)}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unsubscribe request failed");
      }

      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Adobe unsubscribe POC
        </p>
        <h1 className="text-3xl font-bold text-zinc-900">Live profile lookup</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
            params
            <input
              value={params}
              onChange={(event) => setParams(event.target.value)}
              className="rounded-md border border-zinc-300 px-3 py-2 text-base outline-none ring-0 focus:border-zinc-500"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
            pid
            <input
              value={pid}
              onChange={(event) => setPid(event.target.value)}
              className="rounded-md border border-zinc-300 px-3 py-2 text-base outline-none ring-0 focus:border-zinc-500"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          {loading ? "Loading..." : "Fetch profile"}
        </button>
      </form>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {result ? (
        <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-sm text-zinc-100">
          {result}
        </pre>
      ) : null}
    </main>
  );
}
