"use client";

import { useEffect, useState } from "react";

interface TransitionPageProps {
  title: string;
  description: string;
  onComplete: () => void;
  duration?: number;
}

export function TransitionPage({
  title,
  description,
  onComplete,
  duration = 2000,
}: TransitionPageProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    const timer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgb(31, 31, 31)" }}>
      <div className="text-center max-w-md px-6">
        <h2 className="text-3xl font-bold text-amber-400 mb-4 animate-pulse">
          {title}
        </h2>
        <p className="text-gray-300 mb-8">{description}</p>
        <div className="w-64 h-2 bg-neutral-700 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}