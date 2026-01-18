import Link from "next/link";
import { Button } from "@/components/ui/button";
// Aceternity UI
import { CometCard } from "@/components/ui/comet-card";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6" style={{ backgroundColor: "rgb(31, 31, 31)" }}>
      {/* 标题区域 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-400 mb-4">
          🍺 JudgeTheBeer
        </h1>
        <p className="text-amber-100 max-w-md">
          从外观、香气、味道、口感多维度品鉴一杯啤酒，生成专业评分报告
        </p>
      </div>

      {/* 双卡片入口 */}
      <div className="flex flex-row gap-6 items-center justify-center">

        {/* 新手导向 */}
        <Link href="/result" className="block w-[160px] md:w-[320px]">
          <CometCard className="p-4 md:p-8 h-40 md:h-80 cursor-pointer flex flex-col items-center justify-center text-center">
            <div className="text-2xl md:text-4xl mb-2 md:mb-4">📊</div>
            <h2 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">历史记录</h2>
            <p className="text-xs md:text-base text-zinc-400">查看过往的品鉴报告</p>
          </CometCard>
        </Link>

        {/* 生成专业风味报告 */}
        <Link href="/tasting" className="block w-[160px] md:w-[320px]">
          <CometCard className="p-4 md:p-8 h-40 md:h-80 cursor-pointer flex flex-col items-center justify-center text-center">
            <div className="text-2xl md:text-4xl mb-2 md:mb-4">🍺</div>
            <h2 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">开始品鉴</h2>
            <p className="text-xs md:text-base text-zinc-400">开始一次新的啤酒品鉴之旅</p>
          </CometCard>
        </Link>
      </div>
    </div>
  );
}