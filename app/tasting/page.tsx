"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STEPS, INITIAL_SCORE, TRANSITION_TEXTS } from "@/lib/constants";
import { TastingScore, BeerInfo } from "@/types/tasting";
import { ProgressBar } from "@/components/ProgressBar";
import { TransitionPage } from "@/components/TransitionPage";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

const BEER_STYLES = [
  "IPA",
  "Double IPA",
  "New England IPA",
  "Pale Ale",
  "Amber Ale",
  "Brown Ale",
  "Stout",
  "Porter",
  "Pilsner",
  "Lager",
  "Wheat Beer",
  "Hefeweizen",
  "Saison",
  "Sour",
  "Gose",
  "Lambic",
  "Belgian Tripel",
  "Belgian Dubbel",
  "Barleywine",
  "其他",
];

export default function TastingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [beerInfo, setBeerInfo] = useState<BeerInfo & { drinkDate?: Date; packageDate?: Date }>({
    name: "",
    style: "",
    brewery: "",
    drinkDate: undefined,
    packageDate: undefined,
  });
  const [score, setScore] = useState<TastingScore>(INITIAL_SCORE);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionIndex, setTransitionIndex] = useState(0);
  const [aromaSubPage, setAromaSubPage] = useState<"main" | "good" | "bad" | "good-malt" | "good-hop" | "good-fruit" | "good-floral" | "good-spice" | "good-yeast" | "good-roast" | "good-caramel" | "good-wood" | "good-other" | "bad-oxidized" | "bad-sulfur" | "bad-ferment" | "bad-microbial" | "bad-chemical" | "bad-other">("main");

  const updateScore = (
    category: keyof TastingScore,
    field: string,
    value: number
  ) => {
    setScore((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setTransitionIndex(currentStep);
      setShowTransition(true);
    }
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {showTransition && (
        <TransitionPage
          title={TRANSITION_TEXTS[transitionIndex].title}
          description={TRANSITION_TEXTS[transitionIndex].description}
          onComplete={handleTransitionComplete}
          duration={2000}
        />
      )}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8" style={{ backgroundColor: "rgb(31, 31, 31)" }}>
        <div className="w-full max-w-2xl">
          {/* 进度条 */}
          <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />

          {/* 步骤标题 */}
          <h1 className="text-2xl font-bold text-amber-400 mb-6 text-center">
            {STEPS[currentStep].title}
          </h1>

          <Card className="p-6 bg-neutral-800 border-neutral-700">
            {/* 步骤 0: 啤酒信息 */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    啤酒名称
                  </label>
                  <input
                    type="text"
                    value={beerInfo.name}
                    onChange={(e) =>
                      setBeerInfo({ ...beerInfo, name: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-600 rounded-lg bg-neutral-700 text-white placeholder-gray-400"
                    placeholder="输入啤酒名称"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    啤酒风格
                  </label>
                  <Select
                    value={beerInfo.style}
                    onValueChange={(value) =>
                      setBeerInfo({ ...beerInfo, style: value })
                    }
                  >
                    <SelectTrigger className="w-full p-3 border border-neutral-600 rounded-lg bg-neutral-700 text-white">
                      <SelectValue placeholder="选择啤酒风格" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      {BEER_STYLES.map((style) => (
                        <SelectItem
                          key={style}
                          value={style}
                          className="text-white hover:bg-neutral-700 focus:bg-neutral-700"
                        >
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    酒厂
                  </label>
                  <input
                    type="text"
                    value={beerInfo.brewery}
                    onChange={(e) =>
                      setBeerInfo({ ...beerInfo, brewery: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-600 rounded-lg bg-neutral-700 text-white placeholder-gray-400"
                    placeholder="输入酒厂名称"
                  />
                </div>

                {/* 日期选择 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      品饮日期
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full p-3 border border-neutral-600 rounded-lg bg-neutral-700 text-white hover:bg-neutral-600 justify-start"
                        >
                          {beerInfo.drinkDate
                            ? format(beerInfo.drinkDate, "yyyy-MM-dd", { locale: zhCN })
                            : "选择日期"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-neutral-800 border-neutral-700">
                        <Calendar
                          mode="single"
                          selected={beerInfo.drinkDate}
                          onSelect={(date) =>
                            setBeerInfo({ ...beerInfo, drinkDate: date })
                          }
                          className="bg-neutral-800 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      灌装日期
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full p-3 border border-neutral-600 rounded-lg bg-neutral-700 text-white hover:bg-neutral-600 justify-start"
                        >
                          {beerInfo.packageDate
                            ? format(beerInfo.packageDate, "yyyy-MM-dd", { locale: zhCN })
                            : "选择日期"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-neutral-800 border-neutral-700">
                        <Calendar
                          mode="single"
                          selected={beerInfo.packageDate}
                          onSelect={(date) =>
                            setBeerInfo({ ...beerInfo, packageDate: date })
                          }
                          className="bg-neutral-800 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            )}

            {/* 步骤 1: 外观 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* 颜色 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">颜色 (Color)</span>
                      <span className="text-sm font-bold text-amber-400">{score.appearance.color.toFixed(1)}</span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 h-2 rounded-full bg-gradient-to-r from-yellow-200 via-amber-500 to-stone-900" style={{ top: '10px' }} />
                      <Slider
                        value={[score.appearance.color]}
                        onValueChange={(v) => updateScore("appearance", "color", v[0])}
                        min={1}
                        max={5}
                        step={0.1}
                        className="w-full relative z-10"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>浅色</span>
                      <span>深色</span>
                    </div>
                    {/* 图片区域 */}
                    <div className="mt-4 h-32 rounded-lg overflow-hidden">
                      <img
                        src="/img/beer-color.jpg"
                        alt="啤酒颜色参考"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* 清澈度 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">清澈度 (Clarity)</span>
                      <span className="text-sm font-bold text-amber-400">
                        {score.appearance.clarity <= 2 ? "透明" : score.appearance.clarity <= 4 ? "浑浊" : "不透明"}
                      </span>
                    </div>
                    <Slider
                      value={[score.appearance.clarity]}
                      onValueChange={(v) => updateScore("appearance", "clarity", v[0])}
                      min={1}
                      max={5}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>透明</span>
                      <span>浑浊</span>
                      <span>不透明</span>
                    </div>
                    {/* Hop Shit 勾选框 */}
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hopshit"
                        checked={score.appearance.hasHopShit || false}
                        onChange={(e) => updateScore("appearance", "hasHopShit", e.target.checked ? 1 : 0)}
                        className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-amber-500 focus:ring-amber-500"
                      />
                      <label htmlFor="hopshit" className="text-sm text-gray-300">
                        含有 Hop Shit（酒花沉淀物）
                      </label>
                    </div>
                  </div>

                  {/* 泡沫 */}
                  <div>
                    <span className="text-sm font-medium text-gray-300 block mb-4">泡沫 (Head)</span>
                    
                    {/* 泡沫颜色 */}
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-400">颜色</span>
                        <span className="text-xs font-bold text-amber-400">{score.appearance.headColor?.toFixed(1) || "3.0"}</span>
                      </div>
                      <Slider
                        value={[score.appearance.headColor || 3]}
                        onValueChange={(v) => updateScore("appearance", "headColor", v[0])}
                        min={1}
                        max={5}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>白色</span>
                        <span>米色</span>
                        <span>棕色</span>
                      </div>
                    </div>

                    {/* 泡沫质地 */}
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-400">质地</span>
                        <span className="text-xs font-bold text-amber-400">{score.appearance.headTexture?.toFixed(1) || "3.0"}</span>
                      </div>
                      <Slider
                        value={[score.appearance.headTexture || 3]}
                        onValueChange={(v) => updateScore("appearance", "headTexture", v[0])}
                        min={1}
                        max={5}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>稀疏</span>
                        <span>细腻</span>
                        <span>绵密</span>
                      </div>
                    </div>

                    {/* 消散速度 */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-400">消散速度</span>
                        <span className="text-xs font-bold text-amber-400">{score.appearance.headRetention?.toFixed(1) || "3.0"}</span>
                      </div>
                      <Slider
                        value={[score.appearance.headRetention || 3]}
                        onValueChange={(v) => updateScore("appearance", "headRetention", v[0])}
                        min={1}
                        max={5}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>快速消散</span>
                        <span>持久</span>
                      </div>
                    </div>
                  </div>

                  {/* 粘稠度 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">粘稠度 (Viscosity)</span>
                      <span className="text-sm font-bold text-amber-400">{score.appearance.viscosity?.toFixed(1) || "3.0"}</span>
                    </div>
                    <Slider
                      value={[score.appearance.viscosity || 3]}
                      onValueChange={(v) => updateScore("appearance", "viscosity", v[0])}
                      min={1}
                      max={5}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>稀薄</span>
                      <span>粘稠</span>
                    </div>
                  </div>
                </div>
              )}

            {/* 步骤 2: 香气 */}
            {currentStep === 2 && (
              <>
                {/* 香气主页面 */}
                {aromaSubPage === "main" && (
                  <div className="space-y-6">
                    <p className="text-center text-gray-400 mb-6">
                      请选择你闻到的香气类型
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 好的香气按钮 */}
                      <button
                        onClick={() => setAromaSubPage("good")}
                        className="p-8 rounded-xl border-2 border-green-600 bg-green-900/20 hover:bg-green-900/40 transition-all duration-300 group"
                      >
                        <div className="text-5xl mb-4">😊</div>
                        <h3 className="text-xl font-bold text-green-400 mb-2">好的 / 愉悦的香气</h3>
                        <p className="text-sm text-gray-400">
                          果香、花香、麦芽香、酒花香等
                        </p>
                      </button>

                      {/* 不好的香气按钮 */}
                      <button
                        onClick={() => setAromaSubPage("bad")}
                        className="p-8 rounded-xl border-2 border-red-600 bg-red-900/20 hover:bg-red-900/40 transition-all duration-300 group"
                      >
                        <div className="text-5xl mb-4">😕</div>
                        <h3 className="text-xl font-bold text-red-400 mb-2">不好的 / 不愉悦的香气</h3>
                        <p className="text-sm text-gray-400">
                          氧化味、臭鼬味、金属味等
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* 好的香气子页面 - 分类选择 */}
                {aromaSubPage === "good" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setAromaSubPage("main")}
                        className="text-amber-400 hover:text-amber-300 flex items-center gap-2"
                      >
                        ← 返回
                      </button>
                      <h2 className="text-lg font-bold text-green-400">好的 / 愉悦的香气</h2>
                      <div className="w-16"></div>
                    </div>

                    <p className="text-center text-gray-400 mb-4">选择香气类别进行详细评价</p>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {/* 麦芽香 */}
                      <button
                        onClick={() => setAromaSubPage("good-malt")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">水果</h4>
                        <p className="text-xs text-gray-400 mb-2">面包、饼干、谷物</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 酒花香 */}
                      <button
                        onClick={() => setAromaSubPage("good-hop")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">花香</h4>
                        <p className="text-xs text-gray-400 mb-2">松脂、草本、柑橘</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 果香 */}
                      <button
                        onClick={() => setAromaSubPage("good-fruit")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">草本</h4>
                        <p className="text-xs text-gray-400 mb-2">苹果、柑橘、热带水果</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 花香 */}
                      <button
                        onClick={() => setAromaSubPage("good-floral")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">香辛料</h4>
                        <p className="text-xs text-gray-400 mb-2">玫瑰、茉莉、薰衣草</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 香料香 */}
                      <button
                        onClick={() => setAromaSubPage("good-spice")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">谷物及制品</h4>
                        <p className="text-xs text-gray-400 mb-2">胡椒、丁香、肉桂</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 酵母香 */}
                      <button
                        onClick={() => setAromaSubPage("good-yeast")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">甜香</h4>
                        <p className="text-xs text-gray-400 mb-2">面包、酯类、酚类</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 烘烤香 */}
                      <button
                        onClick={() => setAromaSubPage("good-roast")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">焦香</h4>
                        <p className="text-xs text-gray-400 mb-2">咖啡、巧克力、烟熏</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 焦糖香 */}
                      <button
                        onClick={() => setAromaSubPage("good-caramel")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">陈化</h4>
                        <p className="text-xs text-gray-400 mb-2">蜂蜜、太妃糖、糖浆</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 木质香 */}
                      <button
                        onClick={() => setAromaSubPage("good-wood")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">酸味</h4>
                        <p className="text-xs text-gray-400 mb-2">橡木、香草、椰子</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 其他好的香气 */}
                      <button
                        onClick={() => setAromaSubPage("good-other")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">其他</h4>
                        <p className="text-xs text-gray-400 mb-2">蜂蜜、坚果、奶油</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>
                    </div>

                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 mt-4"
                      onClick={() => {
                        setAromaSubPage("main");
                        nextStep();
                      }}
                    >
                      完成好的香气评价，继续下一步
                    </Button>
                  </div>
                )}

                {/* 不好的香气子页面 - 分类选择 */}
                {aromaSubPage === "bad" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setAromaSubPage("main")}
                        className="text-amber-400 hover:text-amber-300 flex items-center gap-2"
                      >
                        ← 返回
                      </button>
                      <h2 className="text-lg font-bold text-red-400">不好的 / 不愉悦的香气</h2>
                      <div className="w-16"></div>
                    </div>

                    <p className="text-center text-gray-400 mb-4">选择异味类别进行详细评价</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {/* 氧化味 */}
                      <button
                        onClick={() => setAromaSubPage("bad-oxidized")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">酒精</h4>
                        <p className="text-xs text-gray-400 mb-2">纸板、陈旧、雪莉酒</p>
                        <span className="text-xs text-red-500">点击查看 →</span>
                      </button>

                      {/* 硫化物 */}
                      <button
                        onClick={() => setAromaSubPage("bad-sulfur")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">有机溶剂</h4>
                        <p className="text-xs text-gray-400 mb-2">指甲油、油漆</p>
                        <span className="text-xs text-red-500">点击查看 →</span>
                      </button>

                      {/* 发酵异味 */}
                      <button
                        onClick={() => setAromaSubPage("bad-ferment")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">硫/磷/臭鸡蛋</h4>
                        <p className="text-xs text-gray-400 mb-2">溶剂、指甲油、过熟水果</p>
                        <span className="text-xs text-red-500">点击查看 →</span>
                      </button>

                      {/* 微生物污染 */}
                      <button
                        onClick={() => setAromaSubPage("bad-microbial")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">硫醇</h4>
                        <p className="text-xs text-gray-400 mb-2">醋酸、马厩味、药味</p>
                        <span className="text-xs text-red-500">点击查看 →</span>
                      </button>

                      {/* 化学异味 */}
                      <button
                        onClick={() => setAromaSubPage("bad-chemical")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">氧化</h4>
                        <p className="text-xs text-gray-400 mb-2">金属、塑料、消毒水</p>
                        <span className="text-xs text-red-500">点击查看 →</span>
                      </button>

                      {/* 其他异味 */}
                      <button
                        onClick={() => setAromaSubPage("bad-other")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">其他</h4>
                        <p className="text-xs text-gray-400 mb-2">臭鼬味、日光味、蔬菜味</p>
                        <span className="text-xs text-red-500">点击查看 →</span>
                      </button>
                    </div>

                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 mt-4"
                      onClick={() => {
                        setAromaSubPage("main");
                        nextStep();
                      }}
                    >
                      完成不好的香气评价，继续下一步
                    </Button>
                  </div>
                )}

                {/* 好的香气详细子页面 - 麦芽香 */}
                {aromaSubPage === "good-malt" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "maltA1" },
                          { label: "Lorem sub A2", key: "maltA2" },
                          { label: "Lorem sub A3", key: "maltA3" },
                        ],
                      },
                      {
                        label: "Lorem Ipsum B",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          { label: "Lorem sub B1", key: "maltB1" },
                          { label: "Lorem sub B2", key: "maltB2" },
                        ],
                      },
                      {
                        label: "Lorem Ipsum C",
                        description: "Ut enim ad minim veniam quis",
                        subItems: [
                          { label: "Lorem sub C1", key: "maltC1" },
                          { label: "Lorem sub C2", key: "maltC2" },
                          { label: "Lorem sub C3", key: "maltC3" },
                          { label: "Lorem sub C4", key: "maltC4" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 酒花香 */}
                {aromaSubPage === "good-hop" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "hopA1" },
                          { label: "Lorem sub A2", key: "hopA2" },
                        ],
                      },
                      {
                        label: "Lorem Ipsum B",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          { label: "Lorem sub B1", key: "hopB1" },
                          { label: "Lorem sub B2", key: "hopB2" },
                          { label: "Lorem sub B3", key: "hopB3" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 果香 */}
                {aromaSubPage === "good-fruit" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "fruitA1" },
                          { label: "Lorem sub A2", key: "fruitA2" },
                        ],
                      },
                      {
                        label: "Lorem Ipsum B",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          { label: "Lorem sub B1", key: "fruitB1" },
                          { label: "Lorem sub B2", key: "fruitB2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 花香 */}
                {aromaSubPage === "good-floral" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "floralA1" },
                          { label: "Lorem sub A2", key: "floralA2" },
                        ],
                      },
                      {
                        label: "Lorem Ipsum B",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          { label: "Lorem sub B1", key: "floralB1" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 香料香 */}
                {aromaSubPage === "good-spice" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "spiceA1" },
                          { label: "Lorem sub A2", key: "spiceA2" },
                        ],
                      },
                      {
                        label: "Lorem Ipsum B",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          { label: "Lorem sub B1", key: "spiceB1" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 酵母香 */}
                {aromaSubPage === "good-yeast" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "yeastA1" },
                          { label: "Lorem sub A2", key: "yeastA2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 烘烤香 */}
                {aromaSubPage === "good-roast" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "roastA1" },
                          { label: "Lorem sub A2", key: "roastA2" },
                        ],
                      },
                      {
                        label: "Lorem Ipsum B",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          { label: "Lorem sub B1", key: "roastB1" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 焦糖香 */}
                {aromaSubPage === "good-caramel" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "caramelA1" },
                          { label: "Lorem sub A2", key: "caramelA2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 木质香 */}
                {aromaSubPage === "good-wood" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "woodA1" },
                          { label: "Lorem sub A2", key: "woodA2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 其他 */}
                {aromaSubPage === "good-other" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "otherGoodA1" },
                          { label: "Lorem sub A2", key: "otherGoodA2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 氧化味 */}
                {aromaSubPage === "bad-oxidized" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "oxidizedA1" },
                          { label: "Lorem sub A2", key: "oxidizedA2" },
                        ],
                      },
                      {
                        label: "Lorem Ipsum B",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          { label: "Lorem sub B1", key: "oxidizedB1" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 硫化物 */}
                {aromaSubPage === "bad-sulfur" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "sulfurA1" },
                          { label: "Lorem sub A2", key: "sulfurA2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 发酵异味 */}
                {aromaSubPage === "bad-ferment" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "fermentA1" },
                          { label: "Lorem sub A2", key: "fermentA2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 微生物污染 */}
                {aromaSubPage === "bad-microbial" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "microbialA1" },
                          { label: "Lorem sub A2", key: "microbialA2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 化学异味 */}
                {aromaSubPage === "bad-chemical" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "chemicalA1" },
                          { label: "Lorem sub A2", key: "chemicalA2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 其他异味 */}
                {aromaSubPage === "bad-other" && (
                  <AromaDetailPage
                    title="Lorem Ipsum"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    items={[
                      {
                        label: "Lorem Ipsum A",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "otherBadA1" },
                          { label: "Lorem sub A2", key: "otherBadA2" },
                        ],
                      },
                    ]}
                  />
                )}
              </>
            )}

            {/* 步骤 3: 味道 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <ScoreSlider
                  label="甜度 (Sweet)"
                  value={score.taste.sweet}
                  onChange={(v) => updateScore("taste", "sweet", v)}
                />
                <ScoreSlider
                  label="苦度 (Bitter)"
                  value={score.taste.bitter}
                  onChange={(v) => updateScore("taste", "bitter", v)}
                />
                <ScoreSlider
                  label="酸度 (Sour)"
                  value={score.taste.sour}
                  onChange={(v) => updateScore("taste", "sour", v)}
                />
                <ScoreSlider
                  label="麦芽味 (Malt Flavor)"
                  value={score.taste.maltFlavor}
                  onChange={(v) => updateScore("taste", "maltFlavor", v)}
                />
                <ScoreSlider
                  label="酒花味 (Hop Flavor)"
                  value={score.taste.hopFlavor}
                  onChange={(v) => updateScore("taste", "hopFlavor", v)}
                />
              </div>
            )}

            {/* 步骤 4: 口感 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <ScoreSlider
                  label="酒体 (Body)"
                  value={score.mouthfeel.body}
                  onChange={(v) => updateScore("mouthfeel", "body", v)}
                />
                <ScoreSlider
                  label="碳酸化程度 (Carbonation)"
                  value={score.mouthfeel.carbonation}
                  onChange={(v) => updateScore("mouthfeel", "carbonation", v)}
                />
                <ScoreSlider
                  label="收尾 (Finish)"
                  value={score.mouthfeel.finish}
                  onChange={(v) => updateScore("mouthfeel", "finish", v)}
                />
              </div>
            )}

            {/* 步骤 5: 整体 */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <ScoreSlider
                  label="平衡度 (Balance)"
                  value={score.overall.balance}
                  onChange={(v) => updateScore("overall", "balance", v)}
                />
                <ScoreSlider
                  label="复杂度 (Complexity)"
                  value={score.overall.complexity}
                  onChange={(v) => updateScore("overall", "complexity", v)}
                />
                <ScoreSlider
                  label="愉悦度 (Enjoyment)"
                  value={score.overall.enjoyment}
                  onChange={(v) => updateScore("overall", "enjoyment", v)}
                />
              </div>
            )}
          </Card>

          {/* 导航按钮 */}
          <div className={`flex mt-6 ${currentStep === 2 && aromaSubPage === "main" ? 'justify-center' : 'justify-between'}`}>
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-neutral-600 text-gray-300 hover:bg-neutral-700"
            >
              上一步
            </Button>

            {currentStep === STEPS.length - 1 ? (
              <Button
                className="bg-amber-600 hover:bg-amber-700"
                onClick={() => {
                  const avgAppearance = (
                    (score.appearance.color + score.appearance.clarity + score.appearance.head) / 3
                  ).toFixed(1);
                  const avgAroma = (
                    (score.aroma.malt + score.aroma.hops + score.aroma.yeast + score.aroma.other) / 4
                  ).toFixed(1);
                  const avgTaste = (
                    (score.taste.sweet + score.taste.bitter + score.taste.sour + score.taste.maltFlavor + score.taste.hopFlavor) / 5
                  ).toFixed(1);
                  const avgMouthfeel = (
                    (score.mouthfeel.body + score.mouthfeel.carbonation + score.mouthfeel.finish) / 3
                  ).toFixed(1);
                  const avgOverall = (
                    (score.overall.balance + score.overall.complexity + score.overall.enjoyment) / 3
                  ).toFixed(1);

                  const params = new URLSearchParams({
                    name: beerInfo.name,
                    style: beerInfo.style,
                    brewery: beerInfo.brewery,
                    appearance: avgAppearance,
                    aroma: avgAroma,
                    taste: avgTaste,
                    mouthfeel: avgMouthfeel,
                    overall: avgOverall,
                  });

                  window.location.href = `/result?${params.toString()}`;
                }}
              >
                完成评分
              </Button>
            ) : currentStep !== 2 ? (
              <Button
                className="bg-amber-600 hover:bg-amber-700"
                onClick={nextStep}
              >
                下一步
              </Button>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}

// 评分滑块组件
function ScoreSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-bold text-amber-400">{value}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        min={1}
        max={5}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </div>
  );
}

// 香气详细评价页面组件
function AromaDetailPage({
  title,
  description,
  color,
  onBack,
  items,
}: {
  title: string;
  description: string;
  color: "green" | "red";
  onBack: () => void;
  items: { 
    label: string; 
    description: string;
    subItems: { label: string; key: string }[];
  }[];
}) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    // 选中时自动展开
    if (!checkedItems[key]) {
      setExpandedItems(prev => ({ ...prev, [key]: true }));
    }
  };

  const toggleExpand = (key: string) => {
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const colorClasses = {
    green: {
      title: "text-green-400",
      border: "border-green-600/50",
      bg: "bg-green-900/10",
      bgHover: "hover:bg-green-900/20",
      checkbox: "accent-green-500",
      button: "bg-green-600 hover:bg-green-700",
    },
    red: {
      title: "text-red-400",
      border: "border-red-600/50",
      bg: "bg-red-900/10",
      bgHover: "hover:bg-red-900/20",
      checkbox: "accent-red-500",
      button: "bg-red-600 hover:bg-red-700",
    },
  };

  const classes = colorClasses[color];

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <h2 className={`text-2xl font-bold ${classes.title} mb-2`}>{title}</h2>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      {/* 选项列表 */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg border ${classes.border} ${classes.bg} overflow-hidden`}
          >
            {/* 选项头部 */}
            <div
              className={`p-4 flex items-center justify-between cursor-pointer ${classes.bgHover} transition-all`}
              onClick={() => toggleCheck(item.label)}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checkedItems[item.label] || false}
                  onChange={() => toggleCheck(item.label)}
                  className={`w-5 h-5 rounded ${classes.checkbox}`}
                  onClick={(e) => e.stopPropagation()}
                />
                <div>
                  <h4 className="font-medium text-white">{item.label}</h4>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(item.label);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {expandedItems[item.label] ? "▲" : "▼"}
              </button>
            </div>

            {/* 展开内容 */}
            {expandedItems[item.label] && (
              <div className="px-4 pb-4 pt-2 border-t border-neutral-700">
                <div className="space-y-2 ml-8">
                  {item.subItems.map((subItem, subIndex) => (
                    <label
                      key={subIndex}
                      className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white"
                    >
                      <input
                        type="checkbox"
                        className={`w-4 h-4 rounded ${classes.checkbox}`}
                      />
                      {subItem.label}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 返回按钮 */}
      <Button
        variant="outline"
        className="w-full border-neutral-600 text-gray-300 hover:bg-neutral-700"
        onClick={onBack}
      >
        ← 返回上一页
      </Button>
    </div>
  );
}