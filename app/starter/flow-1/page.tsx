"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/wavy-background";
import { FocusCards } from "@/components/ui/focus-cards";

// 流程节点数据结构
interface FlowNode {
  id: string;
  question: string;
  options: { label: string; next: string; value?: string; image?: string }[];
  type?: "single" | "multi" | "end";
}

// 根据 drawio 文件构建的流程数据
const flowData: Record<string, FlowNode> = {
  start: {
    id: "start",
    question: "先闻几秒钟... 你闻到了什么？",
    options: [{ label: "继续", next: "smell_direction" }],
  },
  smell_direction: {
    id: "smell_direction",
    question: "你更愿意用什么来描述香味的主要走向？",
    options: [
      { label: "没有酸感的甜", next: "sweet_type", value: "", image: "/img/" },
      { label: "酸甜（复合果汁感）", next: "sour_sweet", value: "", image: "/img/" },
      { label: "苦涩的清香/辛辣感", next: "bitter_spicy", value: "", image: "/img/" },
    ],
  },
  sweet_type: {
    id: "sweet_type",
    question: "你对于甜度的形容？",
    options: [
      { label: "水果熟透的甜", next: "tropical_fruit", value: "", image: "/img/" },
      { label: "柔和的粉甜", next: "stone_fruit", value: "", image: "/img/" },
    ],
  },
  tropical_fruit: {
    id: "tropical_fruit",
    question: "热带水果类 (Tropical Fruit) - 具体是哪一种香气？",
    options: [
      { label: "芒果", next: "alcohol_check", value: "芒果", image: "/img/mango.jpg" },
      { label: "凤梨（菠萝）", next: "alcohol_check", value: "凤梨", image: "/img/pineapple.jpg" },
      { label: "百香果", next: "alcohol_check", value: "百香果", image: "/img/passionfruit.jpg" },
      { label: "番石榴", next: "alcohol_check", value: "番石榴", image: "/img/guava.png" },
      { label: "木瓜", next: "alcohol_check", value: "木瓜", image: "/img/papaya.png" },
    ],
  },
  stone_fruit: {
    id: "stone_fruit",
    question: "核果与浆果类 (Stone Fruit & Berry) - 具体是哪一种香气？",
    options: [
      { label: "桃子/水蜜桃", next: "alcohol_check", value: "桃子", image: "/img/peach.png" },
      { label: "杏", next: "alcohol_check", value: "杏", image: "/img/apricot.png" },
      { label: "李子", next: "alcohol_check", value: "李子", image: "/img/plum.png" },
      { label: "蓝莓", next: "alcohol_check", value: "蓝莓", image: "/img/blueberry.png" },
      { label: "草莓", next: "alcohol_check", value: "草莓", image: "/img/strawberry.png" },
      { label: "红醋栗", next: "alcohol_check", value: "红醋栗", image: "/img/currant.png" },
    ],
  },
  sour_sweet: {
    id: "sour_sweet",
    question: "酸甜（复合果汁感）- 更偏向哪种？",
    options: [
      { label: "甜", next: "sweet_type", value: "", image: "/img/" },
      { label: "酸", next: "citrus", value: "", image: "/img/" },
    ],
  },
  citrus: {
    id: "citrus",
    question: "柑橘类 (Citrus) - 具体是哪一种香气？",
    options: [
      { label: "葡萄柚（西柚）", next: "alcohol_check", value: "葡萄柚", image: "/img/grapefruit.png" },
      { label: "甜橙", next: "alcohol_check", value: "甜橙", image: "/img/orange.png" },
      { label: "橘子皮", next: "alcohol_check", value: "橘子皮", image: "/img/orange_peel.png" },
      { label: "柠檬", next: "alcohol_check", value: "柠檬", image: "/img/lemon.png" },
      { label: "青柠", next: "alcohol_check", value: "青柠", image: "/img/lime.png" },
    ],
  },
  bitter_spicy: {
    id: "bitter_spicy",
    question: "植物与辛辣类 (Vegetal & Resin)",
    options: [
      { label: "刚割下的青草、松针、碎叶子", next: "vegetal_detail", value: "刚割下的青草、松针、碎叶子", image: "/img/bitter_spicy_1.png" },
      { label: "类似白胡椒或淡淡的辛香料味", next: "vegetal_detail", value: "", image: "/img/" },
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
  taste_start: {
    id: "taste_start",
    question: "你尝到了什么？整口吞咽，感受初始味觉",
    options: [{ label: "继续", next: "initial_taste" }],
  },
  initial_taste: {
    id: "initial_taste",
    question: "你会怎么形容初始味觉？",
    options: [
      { label: "明亮中带有酸甜，像柠檬/柚子/柑橘，很清新", next: "taste_citrus_detail", value: "柑橘", image: "/img/citrus.webp" },
      { label: "更加厚重，热带水果走向，浓郁粘稠", next: "taste_tropical_detail", value: "", image: "/img/tropical_fruit.webp"},
      { label: "圆润但愉悦的轻甜香，核果类走向，类似软糖", next: "taste_stone_detail", value: "", image: "/img/stone_fruit.webp"},
      { label: "狂野的重口味，复杂且刺激，有强烈的酒花感", next: "taste_hop_detail", value: "", image: "/img/hops.png" },
    ],
  },
  taste_citrus_detail: {
    id: "taste_citrus_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "锐利酸爽，柠檬类", next: "taste_citrus_specific", value: "", image: "/img/" },
      { label: "苦甜交织，柚子类", next: "taste_citrus_specific", value: "", image: "/img/" },
      { label: "甜美多汁，柑橘类", next: "taste_citrus_specific", value: "", image: "/img/" },
    ],
  },
  taste_citrus_specific: {
    id: "taste_citrus_specific",
    question: "具体风味",
    options: [
      { label: "青柠/柠檬草", next: "mouth_feel", value: "", image: "/img/lemon_grass.png" },
      { label: "红西柚/佛手柑", next: "mouth_feel", value: "", image: "/img/bergamot.png" },
      { label: "血橙/金桔", next: "mouth_feel", value: "", image: "/img/bloodorange_kumquat.png" },
    ],
  },
  taste_tropical_detail: {
    id: "taste_tropical_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "浓郁厚重，高糖分", next: "taste_tropical_specific", value: "", image: "/img/" },
      { label: "甜中带酸，果汁感", next: "taste_tropical_specific", value: "", image: "/img/" },
      { label: "其他风味（梨/草莓/椰子）", next: "taste_tropical_specific", value: "", image: "/img/pear_coconut.png" },
    ],
  },
  taste_tropical_specific: {
    id: "taste_tropical_specific",
    question: "具体风味",
    options: [
      { label: "芒果/木瓜", next: "mouth_feel", value: "", image: "/img/mango_papaya.png" },
      { label: "百香果/菠萝", next: "mouth_feel", value: "", image: "/img/passionfruit_pineapple.png" },
      { label: "番石榴/椰子/奶油", next: "mouth_feel", value: "", image: "/img/cream_coconut.png" },
    ],
  },
  taste_stone_detail: {
    id: "taste_stone_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "圆润肉质，水蜜桃/黄桃", next: "taste_stone_specific", value: "", image: "/img/" },
      { label: "微酸果酱，杏/油桃", next: "taste_stone_specific", value: "", image: "/img/" },
      { label: "清甜甜果，哈密瓜/香梨", next: "taste_stone_specific", value: "", image: "/img/" },
      { label: "加工甜香，软糖/棉花糖", next: "taste_stone_specific", value: "", image: "/img/" },
      { label: "轻盈干爽，冰白葡萄酒", next: "taste_stone_specific", value: "", image: "/img/" },
    ],
  },
  taste_stone_specific: {
    id: "taste_stone_specific",
    question: "具体风味",
    options: [
      { label: "水蜜桃皮/白桃肉", next: "mouth_feel", value: "", image: "/img/" },
      { label: "黄杏/杏脯/油桃/果酱", next: "mouth_feel", value: "", image: "/img/" },
      { label: "哈密瓜/甜甜/香梨", next: "mouth_feel", value: "", image: "/img/" },
      { label: "水果软糖/棉花糖/香草", next: "mouth_feel", value: "", image: "/img/" },
      { label: "冰干白/长相思/醋栗", next: "mouth_feel", value: "", image: "/img/" },
    ],
  },
  taste_hop_detail: {
    id: "taste_hop_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "清新木质，松针/冷杉", next: "taste_hop_specific" , value: "", image: "/img/pine.webp"},
      { label: "碎叶青草，辛辣感", next: "taste_hop_specific" , value: "", image: "/img/grassy.webp"},
      { label: "阴湿泥土，树脂感", next: "taste_hop_specific", value: "", image: "/img/" },
      { label: "辛辣香料，刺激灼烧", next: "taste_hop_specific", value: "", image: "/img/" },
    ],
  },
  taste_hop_specific: {
    id: "taste_hop_specific",
    question: "具体风味",
    options: [
      { label: "松针/冷杉/雪松/松脂", next: "mouth_feel", value: "", image: "/img/" },
      { label: "青草味/绿色/辛辣", next: "mouth_feel", value: "", image: "/img/" },
      { label: "阴冷潮湿/树脂/大麻", next: "mouth_feel", value: "", image: "/img/" },
      { label: "黑白胡椒/薄荷/温热", next: "mouth_feel", value: "", image: "/img/" },
    ],
  },
  mouth_feel: {
    id: "mouth_feel",
    question: "再喝一口，感受前段入口，停留，铺满整个舌面",
    options: [
      { label: "舌尖：甜感先出", next: "sweet_feel", value: "", image: "/img/" },
      { label: "舌侧：酸感先出", next: "sour_feel", value: "", image: "/img/" },
      { label: "舌根：苦感先出", next: "bitter_feel", value: "", image: "/img/" },
    ],
  },
  sweet_feel: {
    id: "sweet_feel",
    question: "甜感程度",
    options: [
      { label: "甜感先出", next: "nose_aroma", value: "", image: "/img/" },
      { label: "有甜感", next: "nose_aroma", value: "", image: "/img/" },
      { label: "无甜感", next: "nose_aroma", value: "", image: "/img/" },
    ],
  },
  sour_feel: {
    id: "sour_feel",
    question: "酸感程度",
    options: [
      { label: "酸感先出", next: "nose_aroma", value: "", image: "/img/" },
      { label: "有酸感", next: "nose_aroma", value: "", image: "/img/" },
      { label: "无酸感", next: "nose_aroma", value: "", image: "/img/" },
    ],
  },
  bitter_feel: {
    id: "bitter_feel",
    question: "苦感程度",
    options: [
      { label: "苦感先出", next: "nose_aroma", value: "", image: "/img/" },
      { label: "有苦感", next: "nose_aroma", value: "", image: "/img/" },
      { label: "无苦感", next: "nose_aroma", value: "", image: "/img/" },
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

  // 将选项转换为 FocusCards 需要的格式
  const focusCards = node.options.map((option) => ({
  title: option.label,
  src: option.image,  // 添加这行
  onClick: () => handleSelect(option),
  }));

  // start 节点使用 WavyBackground 特殊渲染
  if (currentNode === "start") {
    return (
      <WavyBackground
        containerClassName="flex-1 w-full"
        className="flex flex-col items-center justify-center"
        colors={["#F59E0B", "#D97706", "#FBBF24", "#FEF3C7", "#FDE68A"]}
        backgroundFill="#181818"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
          {node.question}
        </h1>
        <Button
          onClick={() => handleSelect(node.options[0])}
          className="px-16 py-3 text-lg md:text-xl h-auto"
        >
          {node.options[0].label}
        </Button>
      </WavyBackground>
    );
  }

  // 其余节点使用 Focus Card 风格
  return (
    <div className="flex-1 bg-zinc-900 py-8 px-4 flex flex-col overflow-hidden">
      {/* 顶部导航 */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between w-full px-4">
        <Link href="/starter" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回</span>
        </Link>
        {history.length > 0 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="text-zinc-400 hover:text-white border-zinc-700 hover:border-zinc-500"
          >
            ← 上一步
          </Button>
        )}
      </div>

      {/* 主内容区域 - 垂直居中 */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* 问题标题 */}
        <div className="max-w-4xl mx-auto mb-12 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {node.question}
          </h1>
        </div>

        {/* 选项卡片 - FocusCards */}
        {node.type !== "end" ? (
          <FocusCards cards={focusCards} />
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
              <Button
                variant="outline"
                onClick={handleReset}
                className="px-6 py-3"
              >
                重新品鉴
              </Button>
              <Link href="/starter">
                <Button className="px-6 py-3">
                  返回入门指南
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}