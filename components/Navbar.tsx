import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-50" style={{ backgroundColor: "rgb(24, 24, 24)" }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍺</span>
          <span className="text-xl font-bold text-white">JudgeTheBeer</span>
        </Link>

        {/* 右侧按钮 */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
            功能1
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
            功能2
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
            关于
          </Button>
        </div>
      </div>
    </nav>
  );
}