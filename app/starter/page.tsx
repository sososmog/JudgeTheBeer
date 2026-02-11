"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { FocusCards } from "@/components/ui/focus-cards";

// Alert
import { useAlert } from "@/contexts/alert-context";

// TBD页面路径为null
const cards = [
  { id: 1, title: "Hazy IPA", description: "IPA/Pale Ale/Double IPA/Triple IPA", image: "/img/hazy.png", href: "/starter/flow-1" },
  { id: 2, title: "West Coast IPA", description: "TBD", image: "/img/wc.png", href: null },  // /starter/flow-2
  { id: 3, title: "Lager/Pilsner", description: "TBD", image: "/img/lager.png", href: null }, // /starter/flow-3
  { id: 4, title: "Stout", description: "TBD", image: "/img/stout.png", href: null }, // /starter/flow-4
  { id: 5, title: "Sour", description: "TBD", image: "/img/sour.png", href: null }, // /starter/flow-5
  { id: 6, title: "果泥", description: "TBD", image: "/img/fruit.png", href: null }, // /starter/flow-6
];

// MultiStepLoader 的加载步骤
const loadingSteps = [
  { text: "挑一个你喜欢的杯子..." },
  { text: "用一个合适的角度倒满整杯..." },
  { text: "准备好了吗？" },
  { text: "让我们开始吧..." },
];

export default function StarterPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingKey, setLoadingKey] = useState(0);
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const router = useRouter();
  // Alert
  const { showAlert } = useAlert();

  const handleCardClick = (card: typeof cards[0]) => {
    if (card.href) {
      // 如果是 Hazy IPA (flow-1)，显示 loader
      if (card.href === "/starter/flow-1") {
        setLoadingKey((k) => k + 1); // 重置 loader 状态
        setTargetHref(card.href);
        setLoading(true);
      } else {
        // 其他卡片直接跳转或显示 TBD
        router.push(card.href);
      }
    } else {
      showAlert({
        title: "功能开发中...",
        description: "该品类的品鉴流程正在开发中，敬请期待！",
      });
    }
  };

  // loader 完成后跳转
  useEffect(() => {
    if (loading && targetHref) {
      const totalDuration = loadingSteps.length * 800; // 步骤数 × duration
      const timer = setTimeout(() => {
        setLoading(false);
        router.push(targetHref);
      }, totalDuration);

      return () => clearTimeout(timer);
    }
  }, [loading, targetHref, router]);

  return (
    <div className="min-h-screen bg-zinc-900 py-12 px-4 md:px-8">
      {/* MultiStepLoader */}
      <MultiStepLoader
        key={loadingKey}
        loadingStates={loadingSteps}
        loading={loading}
        duration={800}
        loop={false}
      />

      {/* 返回按钮 */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回首页</span>
        </Link>
      </div>

      {/* 标题 */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">🍺 选择啤酒品类</h1>
        <p className="text-lg md:text-xl text-zinc-400">选择一个品类，开始你的啤酒探索之旅</p>
      </div>

      {/* Focus Cards */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`
                relative h-60 md:h-80 w-full rounded-2xl overflow-hidden cursor-pointer
                transition-all duration-300 ease-out
                ${hovered !== null && hovered !== index ? "blur-sm scale-[0.98]" : ""}
                ${hovered === index ? "scale-[1.02]" : ""}
              `}
            >
              {/* 背景 */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900"
                style={{
                  backgroundImage: card.image ? `url(${card.image})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* 遮罩 */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${hovered === index ? "opacity-100" : "opacity-70"}`} />

              {/* 装饰 */}
              {!card.image && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 text-6xl"></div>
                </div>
              )}

              {/* 内容 */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${hovered === index ? "translate-y-0" : "translate-y-2"}`}>
                <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 transition-all duration-300 ${hovered === index ? "text-amber-400" : ""}`}>
                  {card.title}
                </h3>
                <p className={`text-sm md:text-base text-zinc-300 transition-all duration-300 ${hovered === index ? "opacity-100" : "opacity-80"}`}>
                  {card.description}
                </p>
                <div className={`mt-4 flex items-center gap-2 text-amber-400 transition-all duration-300 ${hovered === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                  <span className="text-sm font-medium">开始!</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* 边框 */}
              <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${hovered === index ? "border-amber-500/50" : "border-zinc-700/50"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}