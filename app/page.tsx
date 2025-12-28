import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">
          🍺 JudgeTheBeer
        </h1>
        <p className="text-amber-700 mb-8">
          从外观、香气、味道、口感多维度品鉴一杯啤酒，生成专业评分报告
        </p>
        <Link href="/tasting">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg">
            开始品鉴
          </Button>
        </Link>
      </div>
    </main>
  );
}