"use client";

import { useState } from "react";

interface FlavorCategory {
  name: string;
  color: string;
  items: string[];
}

interface FlavorWheelProps {
  values: Record<string, number>;
  onChange: (key: string, value: number) => void;
}

const FLAVOR_CATEGORIES: FlavorCategory[] = [
  {
    name: "果香/花香",
    color: "from-yellow-400 to-orange-400",
    items: ["柑橘", "热带水果", "浆果", "苹果/梨", "花香"],
  },
  {
    name: "植物/草本",
    color: "from-green-400 to-emerald-500",
    items: ["青草", "草本", "松脂", "坚果", "蔬菜"],
  },
  {
    name: "谷物/麦芽",
    color: "from-amber-400 to-yellow-600",
    items: ["面包", "饼干", "谷物", "焦糖", "烘烤"],
  },
  {
    name: "烘焙/焦香",
    color: "from-orange-600 to-red-700",
    items: ["咖啡", "巧克力", "烟熏", "焦糊", "烤面包"],
  },
  {
    name: "酚类/香料",
    color: "from-blue-400 to-cyan-500",
    items: ["丁香", "胡椒", "肉桂", "香草", "药草"],
  },
  {
    name: "酯类/发酵",
    color: "from-pink-400 to-rose-500",
    items: ["香蕉", "溶剂", "酒精", "醋酸", "乳酸"],
  },
  {
    name: "硫化物/缺陷",
    color: "from-purple-400 to-violet-600",
    items: ["硫化物", "臭鼬", "金属", "纸板", "陈腐"],
  },
  {
    name: "口感/质地",
    color: "from-gray-400 to-slate-500",
    items: ["酒体", "碳酸", "涩感", "温热", "油滑"],
  },
];

export function FlavorWheel({ values, onChange }: FlavorWheelProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const getLevelText = (value: number) => {
    if (value === 0) return "无";
    if (value === 1) return "微弱";
    if (value === 2) return "适中";
    return "很强";
  };

  const getLevelColor = (value: number) => {
    if (value === 0) return "bg-neutral-600";
    if (value === 1) return "bg-green-500";
    if (value === 2) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-gray-400 text-sm mb-4">
        点击类别展开详细风味，滑动调节强度
      </p>

      {/* 风味轮可视化 */}
      <div className="relative w-64 h-64 mx-auto mb-6">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {FLAVOR_CATEGORIES.map((category, index) => {
            const angle = (index * 360) / FLAVOR_CATEGORIES.length;
            const nextAngle = ((index + 1) * 360) / FLAVOR_CATEGORIES.length;
            const midAngle = (angle + nextAngle) / 2;
            
            // 计算该类别的平均值
            const categoryValues = category.items.map(
              (item) => values[`${category.name}-${item}`] || 0
            );
            const avgValue = categoryValues.reduce((a, b) => a + b, 0) / categoryValues.length;
            const radius = 30 + avgValue * 20; // 30-90 based on value

            const startRad = (angle - 90) * (Math.PI / 180);
            const endRad = (nextAngle - 90) * (Math.PI / 180);
            const midRad = (midAngle - 90) * (Math.PI / 180);

            const x1 = 100 + radius * Math.cos(startRad);
            const y1 = 100 + radius * Math.sin(startRad);
            const x2 = 100 + radius * Math.cos(endRad);
            const y2 = 100 + radius * Math.sin(endRad);

            const largeArc = nextAngle - angle > 180 ? 1 : 0;

            const pathD = `
              M 100 100
              L ${x1} ${y1}
              A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
              Z
            `;

            const colors = [
              "#facc15", // yellow
              "#22c55e", // green
              "#f59e0b", // amber
              "#dc2626", // red
              "#3b82f6", // blue
              "#ec4899", // pink
              "#8b5cf6", // purple
              "#6b7280", // gray
            ];

            return (
              <g key={category.name}>
                <path
                  d={pathD}
                  fill={colors[index]}
                  fillOpacity={0.6 + avgValue * 0.1}
                  stroke="#1f1f1f"
                  strokeWidth="1"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category.name ? null : category.name
                    )
                  }
                />
                <text
                  x={100 + 55 * Math.cos(midRad)}
                  y={100 + 55 * Math.sin(midRad)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[6px] fill-white font-medium pointer-events-none"
                >
                  {category.name.split("/")[0]}
                </text>
              </g>
            );
          })}
          {/* 中心圆 */}
          <circle cx="100" cy="100" r="25" fill="#1f1f1f" stroke="#333" strokeWidth="2" />
          <text
            x="100"
            y="100"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[8px] fill-amber-400 font-bold"
          >
            风味轮
          </text>
        </svg>
      </div>

      {/* 展开的类别详情 */}
      {expandedCategory && (
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <h3 className="text-amber-400 font-bold mb-4">{expandedCategory}</h3>
          <div className="space-y-4">
            {FLAVOR_CATEGORIES.find((c) => c.name === expandedCategory)?.items.map(
              (item) => {
                const key = `${expandedCategory}-${item}`;
                const value = values[key] || 0;
                return (
                  <div key={item}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">{item}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${getLevelColor(value)} text-white`}>
                        {getLevelText(value)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3].map((level) => (
                        <button
                          key={level}
                          onClick={() => onChange(key, level)}
                          className={`flex-1 py-2 rounded text-xs transition-all ${
                            value === level
                              ? level === 0
                                ? "bg-neutral-600 text-white"
                                : level === 1
                                ? "bg-green-500 text-white"
                                : level === 2
                                ? "bg-amber-500 text-white"
                                : "bg-red-500 text-white"
                              : "bg-neutral-700 text-gray-400 hover:bg-neutral-600"
                          }`}
                        >
                          {getLevelText(level)}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <button
            onClick={() => setExpandedCategory(null)}
            className="w-full mt-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            收起
          </button>
        </div>
      )}

      {/* 快速选择列表 */}
      {!expandedCategory && (
        <div className="space-y-2">
          {FLAVOR_CATEGORIES.map((category) => {
            const categoryValues = category.items.map(
              (item) => values[`${category.name}-${item}`] || 0
            );
            const activeCount = categoryValues.filter((v) => v > 0).length;

            return (
              <button
                key={category.name}
                onClick={() => setExpandedCategory(category.name)}
                className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 hover:border-neutral-600 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                  <span className="text-gray-300">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {activeCount > 0 && (
                    <span className="text-xs text-amber-400">{activeCount} 项已选</span>
                  )}
                  <span className="text-gray-500">→</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}