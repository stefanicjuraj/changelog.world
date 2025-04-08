"use client";

import { useState, useEffect } from "react";
import { NewsEntry } from "@/types/news";
import { ChangelogType } from "@/types/changelog";
import { NewsList } from "./components/NewsList";
import { CategoryFilter } from "./components/CategoryFilter";
import { TypeFilter } from "./components/TypeFilter";
import { Loading } from "./components/Loading";

export default function Home() {
  const [newsData, setNewsData] = useState<NewsEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ChangelogType[]>([]);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        const response = await fetch("/api/all");

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

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleTypeToggle = (type: ChangelogType) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

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
      <main className="max-w-screen-lg mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-screen-lg mx-auto px-4 py-8">
      <header className="mt-4 mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">
          Tech News in a Developer-Friendly Format
        </h1>
      </header>

      <div className="mb-2 max-w-screen-md mx-auto">
        <h2 className="text-lg font-medium mb-1">Filter by tech</h2>
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategoryToggle}
        />
      </div>

      <div className="mb-6 max-w-screen-md mx-auto">
        <h2 className="text-lg font-medium mb-1">Filter by type</h2>
        <TypeFilter
          types={types}
          selectedTypes={selectedTypes}
          onSelectType={handleTypeToggle}
        />
      </div>

      <div className="mb-6 max-w-screen-md mx-auto text-right">
        <p>{filteredNews.length} results</p>
      </div>

      <div className="max-w-screen-md mx-auto rounded-lg shadow-sm border border-gray-200 p-6">
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
