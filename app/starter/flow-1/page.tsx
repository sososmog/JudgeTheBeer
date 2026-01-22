"use client";

import { useState } from "react";
import Link from "next/link";

// 流程节点数据结构
interface FlowNode {
  id: string;
  question: string;
  options: { label: string; next: string; value?: string }[];
  type?: "single" | "multi" | "end";
}

// 根据 drawio 文件构建的流程数据
const flowData: Record<string, FlowNode> = {
  start: {
    id: "start",
    question: "🍺 Hazy IPA 品鉴之旅",
    options: [{ label: "开始品鉴", next: "smell" }],
  },
  smell: {
    id: "smell",
    question: "你闻到了什么？",
    options: [{ label: "继续", next: "smell_direction" }],
  },
  smell_direction: {
    id: "smell_direction",
    question: "你更愿意用什么来描述香味的主要走向？",
    options: [
      { label: "没有酸感的甜", next: "sweet_type" },
      { label: "酸甜（复合果汁感）", next: "sour_sweet" },
      { label: "苦涩的清香/辛辣感", next: "bitter_spicy" },
    ],
  },
  // 没有酸感的甜 分支
  sweet_type: {
    id: "sweet_type",
    question: "你对于甜度的形容？",
    options: [
      { label: "水果熟透的甜", next: "tropical_fruit" },
      { label: "柔和的粉甜", next: "stone_fruit" },
    ],
  },
  tropical_fruit: {
    id: "tropical_fruit",
    question: "热带水果类 (Tropical Fruit) - 具体是哪一种香气？",
    options: [
      { label: "芒果", next: "alcohol_check", value: "芒果" },
      { label: "凤梨（菠萝）", next: "alcohol_check", value: "凤梨" },
      { label: "百香果", next: "alcohol_check", value: "百香果" },
      { label: "番石榴", next: "alcohol_check", value: "番石榴" },
      { label: "木瓜", next: "alcohol_check", value: "木瓜" },
    ],
  },
  stone_fruit: {
    id: "stone_fruit",
    question: "核果与浆果类 (Stone Fruit & Berry) - 具体是哪一种香气？",
    options: [
      { label: "桃子/水蜜桃", next: "alcohol_check", value: "桃子" },
      { label: "杏", next: "alcohol_check", value: "杏" },
      { label: "李子", next: "alcohol_check", value: "李子" },
      { label: "蓝莓", next: "alcohol_check", value: "蓝莓" },
      { label: "草莓", next: "alcohol_check", value: "草莓" },
      { label: "红醋栗", next: "alcohol_check", value: "红醋栗" },
    ],
  },
  // 酸甜分支
  sour_sweet: {
    id: "sour_sweet",
    question: "酸甜（复合果汁感）- 更偏向哪种？",
    options: [
      { label: "甜", next: "sweet_type" },
      { label: "酸", next: "citrus" },
    ],
  },
  citrus: {
    id: "citrus",
    question: "柑橘类 (Citrus) - 具体是哪一种香气？",
    options: [
      { label: "葡萄柚（西柚）", next: "alcohol_check", value: "葡萄柚" },
      { label: "甜橙", next: "alcohol_check", value: "甜橙" },
      { label: "橘子皮", next: "alcohol_check", value: "橘子皮" },
      { label: "柠檬", next: "alcohol_check", value: "柠檬" },
      { label: "青柠", next: "alcohol_check", value: "青柠" },
    ],
  },
  // 苦涩清香分支
  bitter_spicy: {
    id: "bitter_spicy",
    question: "植物与辛辣类 (Vegetal & Resin)",
    options: [
      { label: "刚割下的青草、松针、碎叶子", next: "vegetal_detail" },
      { label: "类似白胡椒或淡淡的辛香料味", next: "vegetal_detail" },
    ],
  },
  vegetal_detail: {
    id: "vegetal_detail",
    question: "在这种基调下是否有其他描述？",
    options: [
      { label: "否", next: "alcohol_check" },
      { label: "是，还有甜感或酸感", next: "smell_direction" },
    ],
  },
  // 酒精检查
  alcohol_check: {
    id: "alcohol_check",
    question: "是否有酒精味？",
    options: [
      { label: "是", next: "smell_end" },
      { label: "否", next: "smell_end" },
    ],
  },
  smell_end: {
    id: "smell_end",
    question: "闻香结束",
    options: [{ label: "开始品尝", next: "taste_start" }],
  },
  // 品尝阶段
  taste_start: {
    id: "taste_start",
    question: "你尝到了什么？整口吞咽，感受初始味觉",
    options: [{ label: "继续", next: "initial_taste" }],
  },
  initial_taste: {
    id: "initial_taste",
    question: "你会怎么形容初始味觉？",
    options: [
      { label: "明亮中带有酸甜，像柠檬/柚子/柑橘，很清新", next: "taste_citrus_detail" },
      { label: "更加厚重，热带水果走向，浓郁粘稠", next: "taste_tropical_detail" },
      { label: "圆润但愉悦的轻甜香，核果类走向，类似软糖", next: "taste_stone_detail" },
      { label: "狂野的重口味，复杂且刺激，有强烈的酒花感", next: "taste_hop_detail" },
    ],
  },
  taste_citrus_detail: {
    id: "taste_citrus_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "锐利酸爽，柠檬类", next: "taste_citrus_specific" },
      { label: "苦甜交织，柚子类", next: "taste_citrus_specific" },
      { label: "甜美多汁，柑橘类", next: "taste_citrus_specific" },
    ],
  },
  taste_citrus_specific: {
    id: "taste_citrus_specific",
    question: "具体风味",
    options: [
      { label: "青柠/柠檬草", next: "mouth_feel" },
      { label: "红西柚/佛手柑", next: "mouth_feel" },
      { label: "血橙/金桔", next: "mouth_feel" },
    ],
  },
  taste_tropical_detail: {
    id: "taste_tropical_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "浓郁厚重，高糖分", next: "taste_tropical_specific" },
      { label: "甜中带酸，果汁感", next: "taste_tropical_specific" },
      { label: "其他风味（梨/草莓/椰子）", next: "taste_tropical_specific" },
    ],
  },
  taste_tropical_specific: {
    id: "taste_tropical_specific",
    question: "具体风味",
    options: [
      { label: "芒果/木瓜", next: "mouth_feel" },
      { label: "百香果/菠萝", next: "mouth_feel" },
      { label: "番石榴/椰子/奶油", next: "mouth_feel" },
    ],
  },
  taste_stone_detail: {
    id: "taste_stone_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "圆润肉质，水蜜桃/黄桃", next: "taste_stone_specific" },
      { label: "微酸果酱，杏/油桃", next: "taste_stone_specific" },
      { label: "清甜甜果，哈密瓜/香梨", next: "taste_stone_specific" },
      { label: "加工甜香，软糖/棉花糖", next: "taste_stone_specific" },
      { label: "轻盈干爽，冰白葡萄酒", next: "taste_stone_specific" },
    ],
  },
  taste_stone_specific: {
    id: "taste_stone_specific",
    question: "具体风味",
    options: [
      { label: "水蜜桃皮/白桃肉", next: "mouth_feel" },
      { label: "黄杏/杏脯/油桃/果酱", next: "mouth_feel" },
      { label: "哈密瓜/甜甜/香梨", next: "mouth_feel" },
      { label: "水果软糖/棉花糖/香草", next: "mouth_feel" },
      { label: "冰干白/长相思/醋栗", next: "mouth_feel" },
    ],
  },
  taste_hop_detail: {
    id: "taste_hop_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "清新木质，松针/冷杉", next: "taste_hop_specific" },
      { label: "碎叶青草，辛辣感", next: "taste_hop_specific" },
      { label: "阴湿泥土，树脂感", next: "taste_hop_specific" },
      { label: "辛辣香料，刺激灼烧", next: "taste_hop_specific" },
    ],
  },
  taste_hop_specific: {
    id: "taste_hop_specific",
    question: "具体风味",
    options: [
      { label: "松针/冷杉/雪松/松脂", next: "mouth_feel" },
      { label: "青草味/绿色/辛辣", next: "mouth_feel" },
      { label: "阴冷潮湿/树脂/大麻", next: "mouth_feel" },
      { label: "黑白胡椒/薄荷/温热", next: "mouth_feel" },
    ],
  },
  // 口感阶段
  mouth_feel: {
    id: "mouth_feel",
    question: "再喝一口，感受前段入口，停留，铺满整个舌面",
    options: [
      { label: "舌尖：甜感先出", next: "sweet_feel" },
      { label: "舌侧：酸感先出", next: "sour_feel" },
      { label: "舌根：苦感先出", next: "bitter_feel" },
    ],
  },
  sweet_feel: {
    id: "sweet_feel",
    question: "甜感程度",
    options: [
      { label: "甜感先出", next: "nose_aroma" },
      { label: "有甜感", next: "nose_aroma" },
      { label: "无甜感", next: "nose_aroma" },
    ],
  },
  sour_feel: {
    id: "sour_feel",
    question: "酸感程度",
    options: [
      { label: "酸感先出", next: "nose_aroma" },
      { label: "有酸感", next: "nose_aroma" },
      { label: "无酸感", next: "nose_aroma" },
    ],
  },
  bitter_feel: {
    id: "bitter_feel",
    question: "苦感程度",
    options: [
      { label: "苦感先出", next: "nose_aroma" },
      { label: "有苦感", next: "nose_aroma" },
      { label: "无苦感", next: "nose_aroma" },
    ],
  },
  nose_aroma: {
    id: "nose_aroma",
    question: "感受鼻腔香气，是否修改香味描述？",
    options: [
      { label: "是，返回修改", next: "smell_direction" },
      { label: "否，继续", next: "body" },
    ],
  },
  // 中段酒体
  body: {
    id: "body",
    question: "再喝一口，感受中段酒体厚度",
    options: [{ label: "继续", next: "body_complexity" }],
  },
  body_complexity: {
    id: "body_complexity",
    question: "味道是否持续、复杂",
    options: [
      { label: "有支撑", next: "balance" },
      { label: "一般", next: "balance" },
      { label: "无支撑", next: "balance" },
    ],
  },
  balance: {
    id: "balance",
    question: "味道是否平衡，没有哪一方面过于突出？",
    options: [
      { label: "好", next: "finish" },
      { label: "一般", next: "finish" },
      { label: "不好", next: "finish" },
    ],
  },
  // 尾段收口
  finish: {
    id: "finish",
    question: "再喝一口，感受尾段收口，味道消失的方式",
    options: [{ label: "继续", next: "bitter_finish" }],
  },
  bitter_finish: {
    id: "bitter_finish",
    question: "苦味收口",
    options: [
      { label: "时间短，干净利落", next: "sweet_finish" },
      { label: "时间长，拖沓绵长", next: "sweet_finish" },
    ],
  },
  sweet_finish: {
    id: "sweet_finish",
    question: "甜味收口",
    options: [
      { label: "清爽，残糖少", next: "carbonation" },
      { label: "平衡，甜苦抵消", next: "carbonation" },
      { label: "余甜，残糖多", next: "carbonation" },
    ],
  },
  carbonation: {
    id: "carbonation",
    question: "碳酸感",
    options: [
      { label: "强", next: "alcohol_feel" },
      { label: "弱", next: "alcohol_feel" },
    ],
  },
  alcohol_feel: {
    id: "alcohol_feel",
    question: "酒精感：在当前温度下",
    options: [
      { label: "Single (低酒精)", next: "alcohol_single" },
      { label: "Double/Imperial (中高酒精)", next: "alcohol_double" },
      { label: "Triple/Quadruple (高酒精)", next: "alcohol_triple" },
    ],
  },
  alcohol_single: {
    id: "alcohol_single",
    question: "Single 酒精感评价",
    options: [
      { label: "明显酒精刺激 (-1分)", next: "drinkability" },
      { label: "微弱酒精感 (-0.5分)", next: "drinkability" },
      { label: "完全包裹无酒精感 (+0.25分)", next: "drinkability" },
    ],
  },
  alcohol_double: {
    id: "alcohol_double",
    question: "Double/Imperial 酒精感评价",
    options: [
      { label: "明显酒精刺激 (-0.5分)", next: "drinkability" },
      { label: "微弱酒精感 (0分)", next: "drinkability" },
      { label: "完全包裹无酒精感 (+0.25分)", next: "drinkability" },
    ],
  },
  alcohol_triple: {
    id: "alcohol_triple",
    question: "Triple/Quadruple 酒精感评价",
    options: [
      { label: "明显酒精刺激 (-0.2分)", next: "drinkability" },
      { label: "微弱酒精感 (+0.2分)", next: "drinkability" },
      { label: "完全包裹无酒精感 (+0.5分)", next: "drinkability" },
    ],
  },
  // 总体评价
  drinkability: {
    id: "drinkability",
    question: "易饮性评价",
    options: [
      { label: "Single (低酒精)", next: "drink_single" },
      { label: "Double/Imperial (中高酒精)", next: "drink_double" },
      { label: "Triple/Quadruple (高酒精)", next: "drink_triple" },
    ],
  },
  drink_single: {
    id: "drink_single",
    question: "Single 易饮性",
    options: [
      { label: "无压力，易饮性好 (+0.1分)", next: "complete" },
      { label: "一般 (0分)", next: "complete" },
      { label: "压力大，易饮性差 (-0.5分)", next: "complete" },
    ],
  },
  drink_double: {
    id: "drink_double",
    question: "Double/Imperial 易饮性",
    options: [
      { label: "无压力，易饮性好 (+0.25分)", next: "complete" },
      { label: "一般 (+0.1分)", next: "complete" },
      { label: "压力大，易饮性差 (-0.25分)", next: "complete" },
    ],
  },
  drink_triple: {
    id: "drink_triple",
    question: "Triple/Quadruple 易饮性",
    options: [
      { label: "无压力，易饮性好 (+0.5分)", next: "complete" },
      { label: "一般 (+0.25分)", next: "complete" },
      { label: "压力大，易饮性差 (-0.1分)", next: "complete" },
    ],
  },
  complete: {
    id: "complete",
    question: "🎉 品鉴完成！",
    options: [],
    type: "end",
  },
};

export default function FlowPage() {
  const [currentNode, setCurrentNode] = useState("start");
  const [history, setHistory] = useState<string[]>([]);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const node = flowData[currentNode];

  const handleSelect = (option: { label: string; next: string; value?: string }) => {
    setSelections((prev) => ({ ...prev, [currentNode]: option.value || option.label }));
    setHistory((prev) => [...prev, currentNode]);
    setCurrentNode(option.next);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setCurrentNode(prev);
    }
  };

  const handleReset = () => {
    setCurrentNode("start");
    setHistory([]);
    setSelections({});
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4">
      {/* 顶部导航 */}
      <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
        <Link href="/starter" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回</span>
        </Link>
        {history.length > 0 && (
          <button onClick={handleBack} className="text-zinc-400 hover:text-white transition-colors text-sm">
            ← 上一步
          </button>
        )}
      </div>

      {/* 进度指示 */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${Math.min((history.length / 20) * 100, 100)}%` }}
          />
        </div>
        <p className="text-zinc-500 text-xs mt-2 text-center">步骤 {history.length + 1}</p>
      </div>

      {/* 问题卡片 */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 md:p-8 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-white">{node.question}</h1>
        </div>
      </div>

      {/* 选项卡片 */}
      {node.type !== "end" ? (
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {node.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className="p-5 bg-zinc-800/50 border border-zinc-700 rounded-xl hover:bg-zinc-800 hover:border-amber-500/50 transition-all text-left group"
            >
              <span className="text-white group-hover:text-amber-400 transition-colors">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {/* 显示选择记录 */}
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4">你的品鉴记录</h3>
            <div className="space-y-2 text-left">
              {Object.entries(selections).map(([key, value]) => (
                <div key={key} className="text-zinc-400 text-sm">
                  <span className="text-zinc-500">{flowData[key]?.question}：</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors"
            >
              重新品鉴
            </button>
            <Link
              href="/starter"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-xl transition-colors"
            >
              返回入门指南
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}