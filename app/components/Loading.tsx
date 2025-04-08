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
    <div className="max-w-screen-lg mx-auto mt-24 flex flex-col items-center">
      <img
        src="/assets/icons/loading.svg"
        alt="Loading"
        className="w-8 h-8 animate-spin text-center mx-auto"
      />
      <p className="mt-4 text-black text-sm">{loadingTexts[textIndex]}</p>
    </div>
  );
}
