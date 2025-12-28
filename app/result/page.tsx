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

  const beerInfo = {
    name: searchParams.get("name") || "未知啤酒",
    style: searchParams.get("style") || "未知风格",
    brewery: searchParams.get("brewery") || "未知酒厂",
  };

  const scores = {
    appearance: Number(searchParams.get("appearance")) || 3,
    aroma: Number(searchParams.get("aroma")) || 3,
    taste: Number(searchParams.get("taste")) || 3,
    mouthfeel: Number(searchParams.get("mouthfeel")) || 3,
    overall: Number(searchParams.get("overall")) || 3,
  };

  const totalScore = (
    (scores.appearance + scores.aroma + scores.taste + scores.mouthfeel + scores.overall) / 5
  ).toFixed(1);

  const radarData = [
    { subject: "外观", value: scores.appearance, fullMark: 5 },
    { subject: "香气", value: scores.aroma, fullMark: 5 },
    { subject: "味道", value: scores.taste, fullMark: 5 },
    { subject: "口感", value: scores.mouthfeel, fullMark: 5 },
    { subject: "整体", value: scores.overall, fullMark: 5 },
  ];

  const getScoreLevel = (score: number) => {
    if (score >= 4.5) return { text: "卓越", color: "text-amber-600" };
    if (score >= 4) return { text: "优秀", color: "text-green-600" };
    if (score >= 3) return { text: "良好", color: "text-blue-600" };
    if (score >= 2) return { text: "一般", color: "text-gray-600" };
    return { text: "较差", color: "text-red-600" };
  };

  const level = getScoreLevel(Number(totalScore));

  return (
    <main className="flex-1 flex items-center justify-center p-4 md:p-8" style={{ backgroundColor: "rgb(31, 31, 31)" }}>
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-amber-400 mb-6 text-center">
          品鉴报告
        </h1>

        {/* 啤酒信息 */}
        <Card className="p-6 mb-6 bg-neutral-800 border-neutral-700">
          <h2 className="text-xl font-bold text-white mb-2">
            {beerInfo.name}
          </h2>
          <p className="text-gray-400">
            {beerInfo.style} · {beerInfo.brewery}
          </p>
        </Card>

        {/* 总分 */}
        <Card className="p-6 mb-6 text-center bg-neutral-800 border-neutral-700">
          <p className="text-gray-400 mb-2">综合评分</p>
          <p className="text-5xl font-bold text-amber-600 mb-2">{totalScore}</p>
          <p className={`text-lg font-medium ${level.color}`}>{level.text}</p>
        </Card>

        {/* 雷达图 */}
        <Card className="p-6 mb-6 bg-neutral-800 border-neutral-700">
          <h3 className="text-lg font-medium text-gray-300 mb-4 text-center">
            风味分布
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#78716c" }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: "#78716c" }} />
                <Radar
                  name="评分"
                  dataKey="value"
                  stroke="#d97706"
                  fill="#f59e0b"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 各项得分 */}
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
                <span className="w-8 text-right font-medium text-amber-600">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* 操作按钮 */}
        <div className="flex gap-4">
          <Link href="/tasting" className="flex-1">
            <Button variant="outline" className="w-full">
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