"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FlavorSearchModal } from "@/components/FlavorSearchModal";

export function Navbar() {
  const [isFlavorModalOpen, setIsFlavorModalOpen] = useState(false);

  return (
    <>
      <nav
        className="w-full fixed top-0 z-50 h-[8vh] min-h-[50px]"
        style={{ backgroundColor: "rgb(24, 24, 24)" }}
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍺</span>
            <span className="text-xl font-bold text-amber-400">JudgeTheBeer</span>
          </Link>

          {/* 风味搜索按钮 */}
          <Button
            onClick={() => setIsFlavorModalOpen(true)}
            className="text-gray-300 hover:text-amber-400 border border-neutral-600"
            style={{ backgroundColor: "rgb(31, 31, 31)" }}
          >
            🔍 风味搜索
          </Button>
        </div>
      </nav>

      {/* 风味搜索弹窗 */}
      <FlavorSearchModal
        isOpen={isFlavorModalOpen}
        onClose={() => setIsFlavorModalOpen(false)}
      />
    </>
  );
}