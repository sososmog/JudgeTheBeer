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
  const [aromaSubPage, setAromaSubPage] = useState<"main" | "good" | "bad" | "good-fruit" | "good-floral" | "good-grass" | "good-spice" | "good-yeast" | "good-sweet" | "good-roast" | "good-aged" | "good-sour" | "good-other" | "bad-alcohol" | "bad-chemical" | "bad-sulfur" | "bad-thiol" | "bad-oxidized" | "bad-other">("main");
  const [aromaChecked, setAromaChecked] = useState<Record<string, boolean>>({});
  const [aromaSubChecked, setAromaSubChecked] = useState<Record<string, boolean>>({});


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
                      你闻到了什么？
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
                      {/* 水果 good-fruit*/}
                      <button
                        onClick={() => setAromaSubPage("good-fruit")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">水果</h4>
                        <p className="text-xs text-gray-400 mb-2">柑橘、热带水果、核果、浆果</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 花香 good-floral*/}
                      <button
                        onClick={() => setAromaSubPage("good-floral")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">花香</h4>
                        <p className="text-xs text-gray-400 mb-2">玫瑰、茉莉、薰衣草</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 草本 good-grass*/}
                      <button
                        onClick={() => setAromaSubPage("good-grass")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">草本</h4>
                        <p className="text-xs text-gray-400 mb-2">青草、草药、茶叶、木质</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 香辛料 good-spice*/}
                      <button
                        onClick={() => setAromaSubPage("good-spice")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">香辛料</h4>
                        <p className="text-xs text-gray-400 mb-2">胡椒、丁香、肉桂、肉豆蔻</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 谷物及制品 good-yeast*/}
                      <button
                        onClick={() => setAromaSubPage("good-yeast")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">谷物及制品</h4>
                        <p className="text-xs text-gray-400 mb-2">面包、麸质、酵母、发面</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 甜香 good-sweet*/}
                      <button
                        onClick={() => setAromaSubPage("good-sweet")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">甜香</h4>
                        <p className="text-xs text-gray-400 mb-2">蜂蜜、太妃糖、糖浆</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 焦香 good-roast*/}
                      <button
                        onClick={() => setAromaSubPage("good-roast")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">焦香</h4>
                        <p className="text-xs text-gray-400 mb-2">咖啡、巧克力、烟熏</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 陈化 good-aged*/}
                      <button
                        onClick={() => setAromaSubPage("good-aged")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">陈化</h4>
                        <p className="text-xs text-gray-400 mb-2">陈味、桶味</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 酸味 good-sour*/}
                      <button
                        onClick={() => setAromaSubPage("good-sour")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">酸味</h4>
                        <p className="text-xs text-gray-400 mb-2">乳酸、醋酸</p>
                        <span className="text-xs text-green-500">点击查看 →</span>
                      </button>

                      {/* 其他好的香气 good-other*/}
                      <button
                        onClick={() => setAromaSubPage("good-other")}
                        className="p-4 rounded-lg border border-green-600/50 bg-green-900/10 hover:bg-green-900/30 transition-all"
                      >
                        <h4 className="font-bold text-green-400 mb-1">其他</h4>
                        <p className="text-xs text-gray-400 mb-2">马厩、皮革、泥土</p>
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
                      {/* 酒精 bad-alcohol*/}
                      <button
                        onClick={() => setAromaSubPage("bad-alcohol")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">酒精</h4>
                        <p className="text-xs text-gray-400 mb-2">乙醇刺激</p>
                        <span className="text-xs text-red-500">点击查看 →</span>
                      </button>

                      {/* 溶剂 bad-chemical*/}
                      <button
                        onClick={() => setAromaSubPage("bad-chemical")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">溶剂</h4>
                        <p className="text-xs text-gray-400 mb-2">指甲油、油漆</p>
                        <span className="text-xs text-red-500">点击查看 →</span>
                      </button>

                      {/* 硫/磷 bad-sulfur*/}
                      <button
                        onClick={() => setAromaSubPage("bad-sulfur")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">硫/磷</h4>
                        <p className="text-xs text-gray-400 mb-2">矿物质、火柴划燃、臭鸡蛋</p>
                        <span className="text-xs text-red-500">点击查看 →</span>
                      </button>

                      {/* 硫醇 bad-thiol*/}
                      <button
                        onClick={() => setAromaSubPage("bad-thiol")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">硫醇</h4>
                        <p className="text-xs text-gray-400 mb-2">洋葱、大蒜、橡胶</p>
                        <span className="text-xs text-red-500">点击查看 →</span>
                      </button>

                      {/* 氧化 bad-oxidized*/}
                      <button
                        onClick={() => setAromaSubPage("bad-oxidized")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">氧化</h4>
                        <p className="text-xs text-gray-400 mb-2">纸板、湿纸、皮革、旧书</p>
                        <span className="text-xs text-red-500">点击查看 →</span>
                      </button>

                      {/* 其他异味 bad-other*/}
                      <button
                        onClick={() => setAromaSubPage("bad-other")}
                        className="p-4 rounded-lg border border-red-600/50 bg-red-900/10 hover:bg-red-900/30 transition-all"
                      >
                        <h4 className="font-bold text-red-400 mb-1">其他</h4>
                        <p className="text-xs text-gray-400 mb-2">臭鼬味、光臭味、蔬菜味</p>
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

                {/* 好的香气详细子页面 - 水果 */}
                {aromaSubPage === "good-fruit" && (
                  <AromaDetailPage
                    title="水果"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "柑橘",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "葡萄柚", key: "fruitCitrusA1" },
                          { label: "橙子", key: "fruitCitrusA2" },
                          { label: "柠檬", key: "fruitCitrusA3" },
                        ],
                      },
                      {
                        label: "热带水果",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          { label: "百香果", key: "fruitTropicalB1" },
                          { label: "芒果", key: "fruitTropicalB2" },
                          { label: "荔枝", key: "fruitTropicalB3" },
                          { label: "番石榴", key: "fruitTropicalB4" },
                        ],
                      },
                      {
                        label: "核果(Stonefruit)",
                        description: "Ut enim ad minim veniam quis",
                        subItems: [
                          { label: "桃子", key: "fruitStoneC1" },
                          { label: "杏子", key: "fruitStoneC2" },
                        ],
                      },
                      {
                        label: "浆果",
                        description: "Duis aute irure dolor in reprehenderit",
                        subItems: [
                          { label: "黑醋栗", key: "fruitBerryD1" },
                          { label: "樱桃", key: "fruitBerryD2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 花香 */}
                {aromaSubPage === "good-floral" && (
                  <AromaDetailPage
                    title="花香"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "清甜型（Fresh / Sweet Floral）",
                        description: "清新、甜润、不厚重，像“春天、阳光、空气感”，清新 / 干净 / 透明 / 轻甜，很好闻但不抢",
                        subItems: [
                          { label: "铃兰", key: "floralRoseA1" },
                          { label: "白色小苍兰", key: "floralRoseA2" },
                          { label: "樱花", key: "floralRoseA3" },
                          { label: "洋甘菊", key: "floralRoseA4" },
                        ],
                      },
                      {
                        label: "浓甜型（Rich Sweet Floral）",
                        description: "明显甜感、饱满，一闻就知道是花香",
                        subItems: [
                          { label: "玫瑰", key: "floralJasmineB1" },
                          { label: "牡丹", key: "floralJasmineB2" },
                          { label: "风信子", key: "floralJasmineB3" },
                        ],
                      },
                      {
                        label: "白花奶香型（White Floral / Creamy）",
                        description: "奶香，浓郁，脂粉感",
                        subItems: [
                          { label: "茉莉", key: "floralLavenderC1" },
                          { label: "栀子花", key: "floralLavenderC2" },
                          { label: "晚香玉", key: "floralLavenderC3" },
                          { label: "依兰", key: "floralLavenderC4" },
                        ],
                      },
                      {
                        label: "粉感 / 脂粉型（Powdery Floral）",
                        description: "爽身粉，香气柔软、不刺激",
                        subItems: [
                          { label: "紫罗兰", key: "floralRoseD1" },
                          { label: "鸢尾花", key: "floralRoseD2" },
                        ],
                      },
                      {
                        label: "绿感 / 草本花香型（Green Floral）",
                        description: "花香中带明显叶子、茎秆、青草味，不甜，偏自然，青绿 / 清苦 / 自然",
                        subItems: [
                          { label: "百合", key: "floralRoseE1" },
                          { label: "郁金香", key: "floralRoseE2" },
                          { label: "小菊花", key: "floralRoseE3" },
                        ],
                      },
                      {
                        label: "果香/蜂蜜感花香（Fruity / Honeyed Floral）",
                        description: "花香中混合水果或蜂蜜气息，香气活泼、圆润，蜜甜 / 果香 / 暖",
                        subItems: [
                          { label: "金银花", key: "floralRoseF1" },
                          { label: "忍冬", key: "floralRoseF2" },
                          { label: "桂花", key: "floralRoseF3" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 草本 */}
                {aromaSubPage === "good-grass" && (
                  <AromaDetailPage
                    title="草本"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "草香（Grassy）",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "青草香", key: "herbalGrassA1" },
                          { label: "干草香", key: "herbalGrassA2" },
                        ],
                      },
                      {
                        label: "草药（Herbal）",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          { label: "迷迭香", key: "herbalHerbB1" },
                          { label: "百里香", key: "herbalHerbB2" },
                          { label: "鼠尾草", key: "herbalHerbB3" },
                        ],
                      },
                      {
                        label: "茶叶",
                        description: "Ut enim ad minim veniam quis",
                        subItems: [
                          { label: "发酵茶（红茶、普洱茶）", key: "herbalTeaC1" },
                          { label: "未发酵茶（绿茶）", key: "herbalTeaC2" },
                          { label: "高香茶（乌龙、水仙）", key: "herbalTeaC3" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 香辛料 */}
                {aromaSubPage === "good-spice" && (
                  <AromaDetailPage
                    title="香辛料"
                    description="胡椒感、温热、干燥、刺激鼻腔、收口"
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "胡椒",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "黑胡椒", key: "spicePepperA1" },
                          { label: "白胡椒", key: "spicePepperA2" },
                        ],
                      },
                      {
                        label: "丁香",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                        ],
                      },
                      {
                        label: "干香料",
                        description: "Ut enim ad minim veniam quis",
                        subItems: [
                          { label: "肉桂", key: "spiceCinnamonC1" },
                          { label: "肉豆蔻", key: "spiceCinnamonC2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 谷物及制品 */}
                {aromaSubPage === "good-yeast" && (
                  <AromaDetailPage
                    title="谷物及制品"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "生谷物 / 淀粉型（Raw Grain / Starchy）",
                        description: "生、粉、淡、没有香气深度",
                        subItems: [
                          { label: "生面粉", key: "grainBreadA1" },
                          { label: "生大米 / 玉米渣", key: "grainBreadA2" },
                          { label: "生燕麦", key: "grainBreadA3" },
                          { label: "湿面糊", key: "grainBreadA4" },
                        ],
                      },
                      {
                        label: "面包 / 烘焙型（Bready / Doughy）",
                        description: "温和、柔软、熟面粉",
                        subItems: [
                          { label: "新鲜面包", key: "grainGlutenB1" },
                          { label: "面团/发好的面", key: "grainGlutenB2" },
                          { label: "白吐司内部", key: "grainGlutenB3" },
                        ],
                      },
                      {
                        label: "烘烤谷物型（Toasty / Biscuit / Crackery）",
                        description: "干、脆、烤过",
                        subItems: [
                          { label: "饼干/苏打饼", key: "grainYeastC1" },
                          { label: "烤吐司边", key: "grainYeastC2" },
                        ],
                      },
                      {
                        label: "麦芽甜香型（Malty / Sweet Grain）",
                        description: "温暖、甜润、不焦",
                        subItems: [
                          { label: "麦芽糖", key: "grainDoughD1" },
                          { label: "蜂蜜麦片", key: "grainDoughD2" },
                          { label: "谷物甜香", key: "grainDoughD3" },
                        ],
                      },
                      {
                        label: "酵母 / 面团发酵型（Yeasty / Fermentation Dough）",
                        description: "发酵、湿、面包房",
                        subItems: [
                          { label: "酵母", key: "grainDoughE1" },
                          { label: "发酵面包房", key: "grainDoughE2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 甜香 */}
                {aromaSubPage === "good-sweet" && (
                  <AromaDetailPage
                    title="甜香"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "自然甜香(Honey / Floral Sweet)",
                        description: "清甜、花感、轻盈",
                        subItems: [
                          { label: "蜂蜜", key: "sweetHoneyA1" },
                          { label: "蜂蜡（轻度）", key: "sweetHoneyA2" },
                        ],
                      },
                      {
                        label: "糖浆型甜香(Syrupy Sweet)",
                        description: "流动感、暖、不花、不焦",
                        subItems: [
                          { label: "枫糖浆/甘蔗糖浆", key: "sweetToffeeB1" },
                          { label: "热糖水", key: "sweetToffeeB2" },
                        ],
                      },
                      {
                        label: "乳脂 / 奶糖型甜香(Caramelized Milk Sugar / Creamy Sweet)",
                        description: "奶感、圆润、黏口",
                        subItems: [
                          { label: "太妃糖(Toffee)", key: "sweetSyrupC1" },
                          { label: "奶糖", key: "sweetSyrupC2" },
                          { label: "焦糖布丁", key: "sweetSyrupC3" },
                        ],
                      },
                      {
                        label: "焦糖型甜香(Caramel / Burnt Sugar)",
                        description: "暖、厚、明显甜",
                        subItems: [
                          { label: "焦糖", key: "sweetSyrupD1" },
                          { label: "红糖", key: "sweetSyrupD2" },
                        ],
                      },
                      {
                        label: "深焦糖/烧糖甜(Molasses/Treacle/Dark Syrup)",
                        description: "深色、浓厚、复杂、轻微苦",
                        subItems: [
                          { label: "黑枫糖", key: "sweetSyrupE1" },
                          { label: "比利时深色糖浆(D-90 / D-180)", key: "sweetSyrupE2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 焦香 */}
                {aromaSubPage === "good-roast" && (
                  <AromaDetailPage
                    title="焦香"
                    description="Roasted & Burnt aromas"
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "巧克力 / 可可",
                        description: "干、苦甜平衡",
                        subItems: [
                          { label: "黑巧克力", key: "roastCoffeeA1" },
                          { label: "可可粉", key: "roastCoffeeA2" },
                        ],
                      },
                      {
                        label: "咖啡",
                        description: "苦、干、深",
                        subItems: [
                          { label: "浓缩咖啡", key: "roastChocolateB1" },
                          { label: "深烘咖啡豆", key: "roastChocolateB2" },
                          { label: "咖啡渣", key: "roastChocolateB3" },
                        ],
                      },
                      {
                        label: "烟熏",
                        description: "Ut enim ad minim veniam quis",
                        subItems: [
                          { label: "木质烟熏", key: "roastSmokyC1" },
                          { label: "烟熏制品（火腿/培根）", key: "roastSmokyC2" },
                        ],
                      },
                      {
                        label: "烧焦 / 灰烬型",
                        description: "灰、苦、刺",
                        subItems: [
                          { label: "烧焦面包", key: "roastSmokyD1" },
                          { label: "炭灰/焦炭", key: "roastSmokyD2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 陈化 */}
                {aromaSubPage === "good-aged" && (
                  <AromaDetailPage
                    title="陈化"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "陈味",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "干果 / 雪莉", key: "agedOldA1" },
                          { label: "氧化甜：蜂蜜 / 太妃", key: "agedOldA2" },
                        ],
                      },
                      {
                        label: "桶味",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          { label: "波本桶", key: "agedBarrelB1" },
                          { label: "朗姆桶", key: "agedBarrelB2" },
                          { label: "葡萄酒桶", key: "agedBarrelB3" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 酸味 */}
                {aromaSubPage === "good-sour" && (
                  <AromaDetailPage
                    title="酸味"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "乳酸",
                        description: "柔和、圆润、干净",
                        subItems: [
                          { label: "酸奶", key: "sourLacticA1" },
                          { label: "乳清", key: "sourLacticA2" },
                        ],
                      },
                      {
                        label: "果酸",
                        description: "明亮、清爽、尖",
                        subItems: [
                          { label: "柠檬皮", key: "sourAceticB1" },
                          { label: "青苹果", key: "sourAceticB2" },
                          { label: "未熟水果", key: "sourAceticB3" },
                        ],
                      },
                      {
                        label: "醋酸",
                        description: "刺鼻、挥发、锐利",
                        subItems: [
                          { label: "白醋", key: "sourAceticC1" },
                          { label: "果醋", key: "sourAceticC2" },
                          { label: "陈醋", key: "sourAceticC3" },
                        ],
                      },
                      {
                        label: "酒石酸 / 葡萄酒酸",
                        description: "干、涩、酒感",
                        subItems: [
                          { label: "干红葡萄酒", key: "sourAceticD1" },
                          { label: "葡萄皮", key: "sourAceticD2" },
                          { label: "酒石", key: "sourAceticD3" },
                        ],
                      },
                      {
                        label: "野生菌酸 / Funky 酸",
                        description: "野、干、复杂",
                        subItems: [
                          { label: "马厩", key: "sourAceticE1" },
                          { label: "皮革", key: "sourAceticE2" },
                          { label: "土腥", key: "sourAceticE3" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 好的香气详细子页面 - 其他 */}
                {aromaSubPage === "good-other" && (
                  <AromaDetailPage
                    title="其他"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="green"
                    onBack={() => setAromaSubPage("good")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "TBD",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          { label: "Lorem sub A1", key: "otherBarnyardA1" },
                          { label: "Lorem sub A2", key: "otherBarnyardA2" },
                        ],
                      },
                      {
                        label: "TBD",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          { label: "Lorem sub B1", key: "otherLeatherB1" },
                          { label: "Lorem sub B2", key: "otherLeatherB2" },
                        ],
                      },
                      {
                        label: "TBD",
                        description: "Ut enim ad minim veniam quis",
                        subItems: [
                          { label: "Lorem sub C1", key: "otherEarthyC1" },
                          { label: "Lorem sub C2", key: "otherEarthyC2" },
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 酒精 */}
                {aromaSubPage === "bad-alcohol" && (
                  <AromaDetailPage
                    title="酒精"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "乙醇刺激",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 溶剂 */}
                {aromaSubPage === "bad-chemical" && (
                  <AromaDetailPage
                    title="溶剂"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "指甲油",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          
                        ],
                      },
                      {
                        label: "油漆",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 硫/磷 */}
                {aromaSubPage === "bad-sulfur" && (
                  <AromaDetailPage
                    title="硫/磷"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "矿物质",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          
                        ],
                      },
                      {
                        label: "火柴划燃",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          
                        ],
                      },
                      {
                        label: "臭鸡蛋",
                        description: "Ut enim ad minim veniam quis",
                        subItems: [
                          
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 硫醇 */}
                {aromaSubPage === "bad-thiol" && (
                  <AromaDetailPage
                    title="硫醇"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "洋葱",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          
                        ],
                      },
                      {
                        label: "大蒜",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          
                        ],
                      },
                      {
                        label: "橡胶",
                        description: "Ut enim ad minim veniam quis",
                        subItems: [
                          
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 氧化 */}
                {aromaSubPage === "bad-oxidized" && (
                  <AromaDetailPage
                    title="氧化"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "纸板",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          
                        ],
                      },
                      {
                        label: "湿纸",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          
                        ],
                      },
                      {
                        label: "皮革",
                        description: "Ut enim ad minim veniam quis",
                        subItems: [
                          
                        ],
                      },
                      {
                        label: "旧书",
                        description: "Duis aute irure dolor in reprehenderit",
                        subItems: [
                          
                        ],
                      },
                    ]}
                  />
                )}

                {/* 不好的香气详细子页面 - 其他 */}
                {aromaSubPage === "bad-other" && (
                  <AromaDetailPage
                    title="其他"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="red"
                    onBack={() => setAromaSubPage("bad")}
                    checkedItems={aromaChecked}
                    setCheckedItems={setAromaChecked}
                    subCheckedItems={aromaSubChecked}
                    setSubCheckedItems={setAromaSubChecked}
                    items={[
                      {
                        label: "臭鼬味",
                        description: "Sed do eiusmod tempor incididunt",
                        subItems: [
                          
                        ],
                      },
                      {
                        label: "光臭味",
                        description: "Ut labore et dolore magna aliqua",
                        subItems: [
                          
                        ],
                      },
                      {
                        label: "蔬菜味",
                        description: "Ut enim ad minim veniam quis",
                        subItems: [
                          
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
  checkedItems,
  setCheckedItems,
  subCheckedItems,
  setSubCheckedItems,
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
  checkedItems: Record<string, boolean>;
  setCheckedItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  subCheckedItems: Record<string, boolean>;
  setSubCheckedItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    // 选中时自动展开
    if (!checkedItems[key]) {
      setExpandedItems(prev => ({ ...prev, [key]: true }));
    }
  };

  const toggleSubCheck = (key: string) => {
    setSubCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
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
                        checked={subCheckedItems[subItem.key] || false}
                        onChange={() => toggleSubCheck(subItem.key)}
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