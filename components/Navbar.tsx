import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-50 h-[8vh] min-h-[50px]" style={{ backgroundColor: "rgb(24, 24, 24)" }}>
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍺</span>
          <span className="text-xl font-bold text-amber-400">JudgeTheBeer</span>
        </Link>

        {/* 搜索框 */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="搜索啤酒..."
            className="px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 w-48 md:w-64"
          />
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">
            搜索
          </Button>
        </div>
      </div>
    </nav>
  );
}