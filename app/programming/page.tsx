"use client";

import { useState, useEffect, Suspense } from "react";
import { NewsEntry } from "@/types/news";
import { ChangelogType } from "@/types/changelog";
import { NewsList } from "@/app/components/NewsList";
import { CategoryFilter } from "@/app/components/CategoryFilter";
import { TypeFilter } from "@/app/components/TypeFilter";
import { Loading } from "@/app/components/Loading";
import { useURLFilters } from "@/app/hooks/useURLFilters";

function ProgrammingContent() {
  const [newsData, setNewsData] = useState<NewsEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    selectedCategories,
    selectedTypes,
    handleCategoryToggle,
    handleTypeToggle,
  } = useURLFilters();

  useEffect(() => {
    async function fetchNewsData() {
      try {
        const response = await fetch("/api/programming");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setNewsData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchNewsData();
  }, []);

  const categories = (() => {
    const uniqueCategories = new Set<string>();
    newsData.forEach((item) => uniqueCategories.add(item.category));
    return Array.from(uniqueCategories);
  })();

  const types = (() => {
    const uniqueTypes = new Set<ChangelogType>();
    newsData.forEach((item) => uniqueTypes.add(item.type));
    return Array.from(uniqueTypes);
  })();

  const filteredNews = (() => {
    return newsData.filter((item) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(item.type);
      return matchesCategory && matchesType;
    });
  })();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className="max-w-screen-lg px-4 py-8 mx-auto">
        <div className="py-12 text-center">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-screen-lg px-4 py-8 mx-auto">
      <div className="mb-4 text-center">
        <h1 className="mb-2 text-2xl font-bold"></h1>
      </div>

      <div className="max-w-screen-md mx-auto mb-2">
        <h2 className="mb-1 text-lg font-medium">Filter by tech</h2>
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategoryToggle}
        />
      </div>

      <div className="max-w-screen-md mx-auto mb-6">
        <h2 className="mb-1 text-lg font-medium">Filter by type</h2>
        <TypeFilter
          types={types}
          selectedTypes={selectedTypes}
          onSelectType={handleTypeToggle}
        />
      </div>

      <div className="max-w-screen-md mx-auto rounded-lg shadow-sm border border-gray-200 p-6 bg-white dark:bg-[#111]">
        {filteredNews.length === 0 ? (
          <p className="py-4 text-center text-gray-500">
            No matching entries found
          </p>
        ) : (
          <NewsList news={filteredNews} />
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <ProgrammingContent />
    </Suspense>
  );
}
