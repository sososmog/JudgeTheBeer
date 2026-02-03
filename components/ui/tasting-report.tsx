"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Wine, Flower2, Droplets, Gauge, RotateCcw, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TastingReportProps {
  score: number;
  selections: Record<string, string>;
  flowData: Record<string, { question: string }>;
  onRestart: () => void;
}

// 分数等级判定
const getScoreGrade = (score: number) => {
  if (score >= 4.5) return { grade: "卓越", color: "text-amber-400", bg: "bg-amber-500/20" };
  if (score >= 4.0) return { grade: "优秀", color: "text-emerald-400", bg: "bg-emerald-500/20" };
  if (score >= 3.5) return { grade: "良好", color: "text-blue-400", bg: "bg-blue-500/20" };
  if (score >= 3.0) return { grade: "普通", color: "text-slate-400", bg: "bg-slate-500/20" };
  return { grade: "欠佳", color: "text-rose-400", bg: "bg-rose-500/20" };
};

// 分类选择记录
const categorizeSelections = (selections: Record<string, string>, flowData: Record<string, { question: string }>) => {
  const categories = {
    aroma: { title: "香气特征", icon: Flower2, items: [] as string[] },
    taste: { title: "口感风味", icon: Droplets, items: [] as string[] },
    body: { title: "酒体评价", icon: Gauge, items: [] as string[] },
    finish: { title: "收口余韵", icon: Wine, items: [] as string[] },
  };

  const aromaKeys = ["smell_direction", "sweet_type", "tropical_fruit", "stone_fruit", "citrus", "bitter_spicy", "vegetal_detail"];
  const tasteKeys = ["initial_taste", "taste_citrus_detail", "taste_citrus_specific", "taste_tropical_detail", "taste_tropical_specific", "taste_stone_detail", "taste_stone_specific", "taste_hop_detail", "taste_hop_specific", "mouth_feel"];
  const bodyKeys = ["body_complexity", "balance", "alcohol_feel", "alcohol_single", "alcohol_double", "alcohol_triple"];
  const finishKeys = ["bitter_finish", "sweet_finish", "carbonation", "drink_single", "drink_double", "drink_triple"];

  Object.entries(selections).forEach(([key, value]) => {
    if (!value || value === "继续") return;
    
    if (aromaKeys.includes(key)) {
      categories.aroma.items.push(value);
    } else if (tasteKeys.includes(key)) {
      categories.taste.items.push(value);
    } else if (bodyKeys.includes(key)) {
      categories.body.items.push(value);
    } else if (finishKeys.includes(key)) {
      categories.finish.items.push(value);
    }
  });

  return categories;
};

export const TastingReport: React.FC<TastingReportProps> = ({
  score,
  selections,
  flowData,
  onRestart,
}) => {
  const { grade, color, bg } = getScoreGrade(score);
  const categories = categorizeSelections(selections, flowData);
  const maxScale = 5.0;
  const circumference = 490;
  const targetOffset = circumference - (circumference * (score / maxScale));

  return (
    <div className="min-h-screen bg-[#080705] text-amber-50/90 overflow-x-hidden relative">
      {/* 背景光晕 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[50%] bg-amber-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[50%] bg-amber-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[50%] h-[50%] bg-orange-900/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] bg-orange-900/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-xs uppercase tracking-[0.3em] text-amber-500/80 font-semibold">品鉴报告</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-white mb-2">Tasting Report</h1>
          <p className="text-slate-500 text-sm">您的专属 IPA 品鉴记录</p>
        </motion.div>

        {/* 分数仪表盘 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 176 176">
              <defs>
                <linearGradient id="reportGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
              </defs>
              <circle cx="88" cy="88" r="78" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
              <motion.circle
                cx="88" cy="88" r="78"
                stroke="url(#reportGrad)"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: targetOffset }}
                transform="rotate(-90 88 88)"
                strokeLinecap="round"
                transition={{ type: "spring", stiffness: 30, damping: 15, delay: 0.5 }}
              />
            </svg>

            <div className="flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-6xl md:text-7xl font-extralight tracking-tighter text-white"
              >
                {score.toFixed(1)}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className={`text-sm font-semibold mt-2 px-4 py-1 rounded-full ${bg} ${color}`}
              >
                {grade}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 分类记录 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 mb-12"
        >
          {Object.entries(categories).map(([key, category], index) => (
            category.items.length > 0 && (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <category.icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-medium text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm bg-white/[0.05] border border-white/[0.08] rounded-full text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </motion.div>

        {/* 完整记录折叠 */}
        <motion.details
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white/[0.02] border border-white/[0.05] rounded-2xl mb-12"
        >
          <summary className="px-5 py-4 cursor-pointer text-slate-400 hover:text-white transition-colors">
            查看完整品鉴记录
          </summary>
          <div className="px-5 pb-5 space-y-3 border-t border-white/[0.05] pt-4">
            {Object.entries(selections).map(([key, value]) => (
              value && (
                <div key={key} className="flex justify-between items-start text-sm">
                  <span className="text-slate-500 flex-shrink-0 mr-4">{flowData[key]?.question || key}</span>
                  <span className="text-slate-300 text-right">{value}</span>
                </div>
              )
            ))}
          </div>
        </motion.details>

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={onRestart}
            variant="outline"
            className="flex-1 py-6 rounded-2xl border-white/10 text-slate-400 hover:text-amber-500 hover:border-amber-500/30 transition-all"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            重新品鉴
          </Button>
          <Button
            onClick={() => {
              // TODO: 实现分享功能
              if (navigator.share) {
                navigator.share({
                  title: 'IPA 品鉴报告',
                  text: `我的 IPA 品鉴得分：${score.toFixed(1)} 分 (${grade})`,
                });
              }
            }}
            className="flex-1 py-6 rounded-2xl bg-amber-500 text-black hover:bg-amber-400 transition-all"
          >
            <Share2 className="w-4 h-4 mr-2" />
            分享报告
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TastingReport;