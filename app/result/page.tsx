"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function ResultPage() {
  const searchParams = useSearchParams();

  // 基本信息
  const beerInfo = {
    name: searchParams.get("name") || "未知啤酒",
    style: searchParams.get("style") || "未知风格",
    brewery: searchParams.get("brewery") || "未知酒厂",
    drinkDate: searchParams.get("drinkDate") || "",
    packageDate: searchParams.get("packageDate") || "",
  };

  // 评分数据
  const scores = {
    appearance: Number(searchParams.get("appearance")) || 3,
    mouthfeel: Number(searchParams.get("mouthfeel")) || 3,
    finish: Number(searchParams.get("finish")) || 3,
  };

  // 收口与回温数据
  const finishData = {
    cleanliness: Number(searchParams.get("cleanliness")) || 3,
    duration: Number(searchParams.get("duration")) || 30,
    alcoholWarmth: Number(searchParams.get("alcoholWarmth")) || 0,
  };

  // 香气数据
  const aromasString = searchParams.get("aromas") || "";
  const selectedAromas = aromasString ? aromasString.split(",").filter(Boolean) : [];

  // 风味数据
  const flavorsString = searchParams.get("flavors") || "{}";
  let flavorValues: Record<string, number> = {};
  try {
    flavorValues = JSON.parse(flavorsString);
  } catch {
    flavorValues = {};
  }

  // 计算总分
  const totalScore = (
    (scores.appearance + scores.mouthfeel + scores.finish) / 3
  ).toFixed(1);

  // 雷达图数据
  const radarData = [
    { subject: "外观", value: scores.appearance, fullMark: 5 },
    { subject: "口感", value: scores.mouthfeel, fullMark: 5 },
    { subject: "收口", value: scores.finish, fullMark: 5 },
  ];

  // 获取评分等级
  const getScoreLevel = (score: number) => {
    if (score >= 4.5) return { text: "卓越", color: "text-amber-400" };
    if (score >= 4) return { text: "优秀", color: "text-green-400" };
    if (score >= 3) return { text: "良好", color: "text-blue-400" };
    if (score >= 2) return { text: "一般", color: "text-gray-400" };
    return { text: "较差", color: "text-red-400" };
  };

  const level = getScoreLevel(Number(totalScore));

  // 获取干净度文本
  const getCleanlinessText = (value: number) => {
    if (value === 5) return "干净";
    if (value === 3) return "适中";
    return "不干净";
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    if (!dateString) return "未填写";
    try {
      return new Date(dateString).toLocaleDateString("zh-CN");
    } catch {
      return "未填写";
    }
  };

  // 获取强度描述
  const getIntensityText = (value: number) => {
    if (value >= 4) return "浓郁的";
    if (value >= 3) return "明显的";
    if (value >= 2) return "适中的";
    if (value >= 1) return "淡淡的";
    return "";
  };

  // 生成风味描述
  const generateFlavorDescription = () => {
    const activeFlavorEntries = Object.entries(flavorValues).filter(([_, v]) => v > 0);
    
    if (activeFlavorEntries.length === 0) return "";

    // 按强度排序，取最突出的风味
    const sortedFlavors = activeFlavorEntries.sort((a, b) => b[1] - a[1]);
    
    // 分组：强烈风味 (>=3) 和 较弱风味 (<3)
    const strongFlavors = sortedFlavors.filter(([_, v]) => v >= 3);
    const mildFlavors = sortedFlavors.filter(([_, v]) => v > 0 && v < 3);

    const descriptions: string[] = [];

    if (strongFlavors.length > 0) {
      const flavorNames = strongFlavors.slice(0, 3).map(([key, value]) => {
        const flavorName = key.split("-")[1] || key;
        return `${getIntensityText(value)}${flavorName}`;
      });
      
      if (flavorNames.length === 1) {
        descriptions.push(`风味上呈现出${flavorNames[0]}。`);
      } else {
        descriptions.push(`风味上呈现出${flavorNames.join("、")}等特点。`);
      }
    }

    if (mildFlavors.length > 0 && strongFlavors.length === 0) {
      const flavorNames = mildFlavors.slice(0, 3).map(([key, value]) => {
        const flavorName = key.split("-")[1] || key;
        return `${getIntensityText(value)}${flavorName}`;
      });
      descriptions.push(`风味较为柔和，带有${flavorNames.join("、")}。`);
    } else if (mildFlavors.length > 0) {
      const flavorNames = mildFlavors.slice(0, 2).map(([key]) => {
        return key.split("-")[1] || key;
      });
      descriptions.push(`同时伴有轻微的${flavorNames.join("、")}点缀其中。`);
    }

    return descriptions.join("");
  };

  // 生成评语
  const generateComment = () => {
    const comments: string[] = [];

    // 外观评价
    if (scores.appearance >= 4) {
      comments.push("这款啤酒外观出色，色泽诱人，泡沫细腻持久。");
    } else if (scores.appearance >= 3) {
      comments.push("外观表现中规中矩，符合该风格的基本特征。");
    } else {
      comments.push("外观方面有待改善，可能存在一些视觉上的不足。");
    }

    // 香气评价
    if (selectedAromas.length > 5) {
      comments.push("香气层次丰富，展现出复杂的风味特征。");
    } else if (selectedAromas.length > 0) {
      comments.push("香气表现适中，有一定的风味特点。");
    } else {
      comments.push("香气较为简单，风味层次有限。");
    }

    // 风味评价（新增）
    const flavorDesc = generateFlavorDescription();
    if (flavorDesc) {
      comments.push(flavorDesc);
    }

    // 口感评价
    if (scores.mouthfeel >= 4) {
      comments.push("口感饱满，风味平衡度极佳。");
    } else if (scores.mouthfeel >= 3) {
      comments.push("口感适中，整体表现稳定。");
    } else {
      comments.push("口感方面略有不足，需要进一步优化。");
    }

    // 收口评价
    if (finishData.cleanliness === 5) {
      comments.push("收口干净利落，回味悠长。");
    } else if (finishData.cleanliness === 3) {
      comments.push("收口表现一般，回味适中。");
    } else {
      comments.push("收口略显粗糙，可能有一些杂味残留。");
    }

    // 酒精感
    if (finishData.alcoholWarmth === 1) {
      comments.push("回温后酒精感明显，适合在低温状态下尽快饮用。");
    }

    return comments.join("");
  };

  // 获取活跃的风味类别
  const getActiveFlavorCategories = () => {
    const categories: Record<string, string[]> = {};
    Object.entries(flavorValues).forEach(([key, value]) => {
      if (value > 0) {
        const [category, item] = key.split("-");
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(item);
      }
    });
    return categories;
  };

  const activeFlavorCategories = getActiveFlavorCategories();

  return (
    <main
      className="flex-1 p-4 md:p-8 overflow-y-auto"
      style={{ backgroundColor: "rgb(31, 31, 31)" }}
    >
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-amber-400 mb-6 text-center">
          品鉴报告
        </h1>

        {/* 啤酒信息 */}
        <Card className="p-6 mb-6 bg-neutral-800 border-neutral-700">
          <h2 className="text-xl font-bold text-white mb-4">{beerInfo.name}</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">风格：</span>
              <span className="text-gray-200">{beerInfo.style}</span>
            </div>
            <div>
              <span className="text-gray-400">酒厂：</span>
              <span className="text-gray-200">{beerInfo.brewery}</span>
            </div>
            <div>
              <span className="text-gray-400">品饮日期：</span>
              <span className="text-gray-200">{formatDate(beerInfo.drinkDate)}</span>
            </div>
            <div>
              <span className="text-gray-400">灌装日期：</span>
              <span className="text-gray-200">{formatDate(beerInfo.packageDate)}</span>
            </div>
          </div>
        </Card>

        {/* 综合评分 */}
        <Card className="p-6 mb-6 text-center bg-neutral-800 border-neutral-700">
          <p className="text-gray-400 mb-2">综合评分</p>
          <p className="text-5xl font-bold text-amber-400 mb-2">{totalScore}</p>
          <p className={`text-lg font-medium ${level.color}`}>{level.text}</p>
        </Card>

        {/* 风味分布雷达图 */}
        <Card className="p-6 mb-6 bg-neutral-800 border-neutral-700">
          <h3 className="text-lg font-medium text-gray-300 mb-4 text-center">
            风味分布
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#404040" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: "#9ca3af" }} />
                <Radar
                  name="评分"
                  dataKey="value"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 详细得分 */}
        <Card className="p-6 mb-6 bg-neutral-800 border-neutral-700">
          <h3 className="text-lg font-medium text-gray-300 mb-4">详细得分</h3>
          <div className="space-y-3">
            {radarData.map((item) => (
              <div key={item.subject} className="flex items-center">
                <span className="w-16 text-gray-400">{item.subject}</span>
                <div className="flex-1 h-2 bg-neutral-600 rounded mx-3">
                  <div
                    className="h-2 bg-amber-500 rounded"
                    style={{ width: `${(item.value / 5) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right font-medium text-amber-400">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* 风味信息 */}
        <Card className="p-6 mb-6 bg-neutral-800 border-neutral-700">
          <h3 className="text-lg font-medium text-gray-300 mb-4">香气信息</h3>
          {selectedAromas.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedAromas.map((aroma, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-900/30 border border-green-600/50 text-green-400 rounded-full text-sm"
                >
                  {aroma}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">未选择香气</p>
          )}

          {Object.keys(activeFlavorCategories).length > 0 && (
            <>
              <h4 className="text-md font-medium text-gray-300 mt-6 mb-3">口感风味</h4>
              <div className="space-y-3">
                {Object.entries(activeFlavorCategories).map(([category, items]) => (
                  <div key={category}>
                    <span className="text-sm text-gray-400">{category}：</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {items.map((item, index) => {
                        const key = `${category}-${item}`;
                        const intensity = flavorValues[key] || 0;
                        return (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-amber-900/30 border border-amber-600/50 text-amber-400 rounded text-xs"
                          >
                            {item} ({getIntensityText(intensity).replace("的", "") || "微弱"})
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>

        {/* 收口与回温总结 */}
        <Card className="p-6 mb-6 bg-neutral-800 border-neutral-700">
          <h3 className="text-lg font-medium text-gray-300 mb-4">收口与回温</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-neutral-700/50 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">干净度</p>
              <p className="text-white font-medium">
                {getCleanlinessText(finishData.cleanliness)}
              </p>
            </div>
            <div className="p-3 bg-neutral-700/50 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">收口时长</p>
              <p className="text-white font-medium">
                {finishData.duration >= 60 ? "1min" : `${finishData.duration}s`}
              </p>
            </div>
            <div className="p-3 bg-neutral-700/50 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">酒精感</p>
              <p className="text-white font-medium">
                {finishData.alcoholWarmth === 1 ? "有" : "无"}
              </p>
            </div>
          </div>
        </Card>

        {/* 评语 */}
        <Card className="p-6 mb-6 bg-neutral-800 border-neutral-700">
          <h3 className="text-lg font-medium text-gray-300 mb-4">品鉴评语</h3>
          <p className="text-gray-300 leading-relaxed">{generateComment()}</p>
        </Card>

        {/* 操作按钮 */}
        <div className="flex gap-4">
          <Link href="/tasting" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-neutral-600 text-gray-300 hover:bg-neutral-700"
            >
              重新品鉴
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full bg-amber-600 hover:bg-amber-700">
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}