"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { STEPS, INITIAL_SCORE } from "@/lib/constants";
import { TastingScore, BeerInfo } from "@/types/tasting";

export default function TastingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [beerInfo, setBeerInfo] = useState<BeerInfo>({
    name: "",
    style: "",
    brewery: "",
  });
  const [score, setScore] = useState<TastingScore>(INITIAL_SCORE);

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
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-4 md:p-8" style={{ backgroundColor: "rgb(31, 31, 31)" }}>
      <div className="w-full max-w-2xl">
        {/* 进度指示 */}
        <div className="flex justify-between mb-6">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 h-2 mx-1 rounded ${
                index <= currentStep ? "bg-amber-600" : "bg-amber-200"
              }`}
            />
          ))}
        </div>

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
                <input
                  type="text"
                  value={beerInfo.style}
                  onChange={(e) =>
                    setBeerInfo({ ...beerInfo, style: e.target.value })
                  }
                  className="w-full p-3 border border-neutral-600 rounded-lg bg-neutral-700 text-white placeholder-gray-400"
                  placeholder="如 IPA、Stout、Lager"
                />
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
            </div>
          )}

          {/* 步骤 1: 外观 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <ScoreSlider
                label="颜色 (Color)"
                value={score.appearance.color}
                onChange={(v) => updateScore("appearance", "color", v)}
              />
              <ScoreSlider
                label="清澈度 (Clarity)"
                value={score.appearance.clarity}
                onChange={(v) => updateScore("appearance", "clarity", v)}
              />
              <ScoreSlider
                label="泡沫 (Head)"
                value={score.appearance.head}
                onChange={(v) => updateScore("appearance", "head", v)}
              />
            </div>
          )}

          {/* 步骤 2: 香气 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <ScoreSlider
                label="麦芽香 (Malt)"
                value={score.aroma.malt}
                onChange={(v) => updateScore("aroma", "malt", v)}
              />
              <ScoreSlider
                label="酒花香 (Hops)"
                value={score.aroma.hops}
                onChange={(v) => updateScore("aroma", "hops", v)}
              />
              <ScoreSlider
                label="酵母香 (Yeast)"
                value={score.aroma.yeast}
                onChange={(v) => updateScore("aroma", "yeast", v)}
              />
              <ScoreSlider
                label="其他香气 (Other)"
                value={score.aroma.other}
                onChange={(v) => updateScore("aroma", "other", v)}
              />
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
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
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
          ) : (
            <Button
              className="bg-amber-600 hover:bg-amber-700"
              onClick={nextStep}
            >
              下一步
            </Button>
          )}
        </div>
      </div>
    </main>
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