import Link from "next/link";
import { CometCard } from "@/components/ui/comet-card";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ backgroundColor: "rgb(31, 31, 31)" }}>
      
      {/* Spotlight 效果 - 琥珀色 */}
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(38, 100%, 70%, .06) 0, hsla(38, 100%, 50%, .02) 50%, hsla(38, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(38, 100%, 70%, .04) 0, hsla(38, 100%, 50%, .015) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(38, 100%, 70%, .03) 0, hsla(38, 100%, 45%, .01) 80%, transparent 100%)"
      />

      {/* 标题区域 */}
      <div className="text-center mb-12 relative z-10 flex flex-col items-center">
        <h1 
          className="text-5xl md:text-7xl text-amber-400 mb-4"
          style={{ fontFamily: 'OrangeJuice' }}
        >
          JudgeTheBeer
        </h1>
        <p className="text-amber-100 w-full max-w-[320px] md:max-w-[400px]">
          从外观、香气、味道、口感多维度品鉴，生成UT评价
        </p>
      </div>

      {/* 悬浮卡片 */}
      {/* <div className="flex flex-row gap-6 items-center justify-center relative z-10">

        <Link href="/result" className="block w-[160px] md:w-[320px]">
          <CometCard className="p-4 md:p-8 h-40 md:h-80 cursor-pointer flex flex-col items-center justify-center text-center">
            <div className="text-2xl md:text-4xl mb-2 md:mb-4">📊</div>
            <h2 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">历史记录</h2>
            <p className="text-xs md:text-base text-zinc-400">查看过往的品鉴报告</p>
          </CometCard>
        </Link>

        <Link href="/tasting" className="block w-[160px] md:w-[320px]">
          <CometCard className="p-4 md:p-8 h-40 md:h-80 cursor-pointer flex flex-col items-center justify-center text-center">
            <div className="text-2xl md:text-4xl mb-2 md:mb-4">🍺</div>
            <h2 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">开始品鉴</h2>
            <p className="text-xs md:text-base text-zinc-400">开始一次新的啤酒品鉴之旅</p>
          </CometCard>
        </Link>
      </div> */}



    {/* 双卡片入口 */}
      <div className="flex flex-row gap-6 items-center justify-center relative z-10">

        <Link href="/starter" className="block w-[160px] md:w-[320px]">
          <div className="p-4 md:p-8 h-40 md:h-80 rounded-2xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-600 transition-all cursor-pointer flex flex-col items-center justify-center text-center">
            <div className="text-2xl md:text-4xl mb-2 md:mb-4">➡️</div>
            <h2 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">我是新手</h2>
            <p className="text-xs md:text-base text-zinc-400">带你更加了解一杯啤酒</p>
          </div>
        </Link>

        <Link href="/tasting" className="block w-[160px] md:w-[320px]">
          <div className="p-4 md:p-8 h-40 md:h-80 rounded-2xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-600 transition-all cursor-pointer flex flex-col items-center justify-center text-center">
            <div className="text-2xl md:text-4xl mb-2 md:mb-4">🍺</div>
            <h2 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">我很了解</h2>
            <p className="text-xs md:text-base text-zinc-400">从更加细分的风味评价一杯啤酒</p>
          </div>
        </Link>
      </div>

    </div>
  );
}