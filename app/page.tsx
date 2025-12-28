import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center p-6" style={{ backgroundColor: "rgb(31, 31, 31)" }}>
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-amber-400 mb-4">
          🍺 JudgeTheBeer
        </h1>
        <p className="text-amber-100 mb-8">
          从外观、香气、味道、口感多维度品鉴一杯啤酒，生成专业评分报告
        </p>
        <Link href="/tasting">
          <Button
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg"
          >
            开始品鉴
          </Button>
        </Link>
      </div>
    </div>
  );
}