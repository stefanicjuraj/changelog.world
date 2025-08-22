"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(
      date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setMounted(true);
  }, []);

  return (
    <nav
      style={{ backgroundColor: "var(--app-navbar-color)" }}
      className="sticky top-0 max-w-screen-lg mx-auto rounded-b-lg shadow-sm z-50"
    >
      <div className="px-4 mx-auto max-w-7xl py-7">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              changelog.world
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="items-center hidden space-x-8 sm:flex">
            <a
              href="https://github.com/stefanicjuraj/changelog.world"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/icons/github.svg"
                alt="GitHub"
                className="w-5 h-5 dark:invert"
              />
            </a>
            {mounted && <div className="hidden sm:block">{currentDate}</div>}
          </div>
        </div>
      </div>
    </nav>
  );
}
