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
              <div className="space-y-6">
                <p className="text-center text-gray-400 mb-6">
                  请选择你闻到的香气类型
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 好的香气按钮 */}
                  <button
                    onClick={() => {
                      // 后续添加跳转逻辑
                    }}
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
                    onClick={() => {
                      // 后续添加跳转逻辑
                    }}
                    className="p-8 rounded-xl border-2 border-red-600 bg-red-900/20 hover:bg-red-900/40 transition-all duration-300 group"
                  >
                    <div className="text-5xl mb-4">😕</div>
                    <h3 className="text-xl font-bold text-red-400 mb-2">不好的 / 不愉悦的香气</h3>
                    <p className="text-sm text-gray-400">
                      任何你觉得不愉悦的味道
                    </p>
                  </button>
                </div>
              </div>
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
          <div className={`flex mt-6 ${currentStep === 2 ? 'justify-center' : 'justify-between'}`}>
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