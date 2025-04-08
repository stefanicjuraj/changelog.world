"use client";

import { useState, useEffect } from "react";

export function Loading() {
  const loadingTexts = [
    "Loading changelogs...",
    "Collecting updates...",
    "Almost ready...",
  ];

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center max-w-screen-lg mx-auto mt-24">
      <img
        src="/assets/icons/loading.svg"
        alt="Loading"
        className="w-8 h-8 mx-auto text-center animate-spin dark:invert"
      />
      <p className="mt-4 text-sm">{loadingTexts[textIndex]}</p>
    </div>
  );
}
