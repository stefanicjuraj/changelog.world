"use client";

import { useEffect, useState } from "react";

export default function CliViewPage() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch("/api/cli");

        if (!response.ok) {
          throw new Error("Failed to fetch CLI data");
        }

        const textContent = await response.text();
        setContent(textContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-4">CLI View</h1>
            <div style={{ fontFamily: "monospace", padding: "20px" }}>
              Loading changelog data...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-4">CLI View</h1>
            <div style={{ fontFamily: "monospace", padding: "20px" }}>
              Error: {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            CLI View - changelog.world
          </h1>
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              This is how the content appears when using CLI tools like curl:
            </p>
            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              curl changelog.world/cli
            </code>
          </div>
          <pre
            className="bg-gray-50 dark:bg-gray-900 p-4 rounded border overflow-auto text-sm"
            style={{
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
            }}
          >
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
}
