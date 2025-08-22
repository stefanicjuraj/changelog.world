"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangelogType } from "@/types/changelog";

export function useURLFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialLoad = useRef(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ChangelogType[]>([]);

  useEffect(() => {
    const categoriesFromURL = searchParams.get("categories");
    const typesFromURL = searchParams.get("types");

    if (categoriesFromURL) {
      setSelectedCategories(categoriesFromURL.split(",").filter(Boolean));
    }

    if (typesFromURL) {
      const validTypes = typesFromURL
        .split(",")
        .filter((type): type is ChangelogType =>
          [
            "Added",
            "Changed",
            "Deprecated",
            "Removed",
            "Fixed",
            "Security",
          ].includes(type)
        );
      setSelectedTypes(validTypes);
    }

    isInitialLoad.current = false;
  }, [searchParams]);

  const updateURL = useCallback(
    (categories: string[], types: ChangelogType[]) => {
      const params = new URLSearchParams();

      if (categories.length > 0) {
        params.set("categories", categories.join(","));
      }

      if (types.length > 0) {
        params.set("types", types.join(","));
      }

      const query = params.toString();
      const newURL = query ? `?${query}` : "";

      router.replace(newURL, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    if (!isInitialLoad.current) {
      updateURL(selectedCategories, selectedTypes);
    }
  }, [selectedCategories, selectedTypes, updateURL]);

  const handleCategoryToggle = useCallback((category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category];

      return newCategories;
    });
  }, []);

  const handleTypeToggle = useCallback((type: ChangelogType) => {
    setSelectedTypes((prev) => {
      const newTypes = prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];

      return newTypes;
    });
  }, []);

  return {
    selectedCategories,
    selectedTypes,
    handleCategoryToggle,
    handleTypeToggle,
  };
}
