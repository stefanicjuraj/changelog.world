"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  }, []);

  return (
    <nav
      style={{ backgroundColor: "var(--app-navbar-color)" }}
      className="shadow-sm max-w-screen-lg mx-auto mt-2 sticky top-0"
    >
      <div className="max-w-7xl mx-auto px-4 py-7">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              changelog.world
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex items-center space-x-8">
            <Link prefetch={true} href="/programming">
              Programming
            </Link>
            <Link prefetch={true} href="/frameworks">
              Frameworks
            </Link>
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
            <div className="hidden sm:block">{currentDate}</div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 px-2 space-y-1">
            <Link
              href="/programming"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Programming
            </Link>
            <Link
              href="/frameworks"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Frameworks
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
