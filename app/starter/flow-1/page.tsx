"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/wavy-background";
import { FocusCards } from "@/components/ui/focus-cards";

import React from "react";

// Yes or No
import { DecisionLayout } from "@/components/ui/decision-layout";
import { X, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// taste-analyzer
import { TasteAnalyzer } from "@/components/ui/taste-analyzer";

// Rating (only use the last one)
import { MultiStepRating } from "@/components/ui/rating-step";
import { Wind, Droplets, Thermometer, Zap, GlassWater, Star } from "lucide-react";
import { SingleRating } from "@/components/ui/rating-step";

// Report
import { TastingReport } from "@/components/ui/tasting-report";


// 流程节点数据结构
interface FlowNode {
  id: string;
  question: string;
  options: { label: string; next: string; value?: string; image?: string }[];
  type?: "single" | "multi" | "end" | "taste" | "rating";
}

// 根据 drawio 文件构建的流程数据
const flowData: Record<string, FlowNode> = {
  start: {
    id: "start",
    question: "先闻几秒钟... \n你闻到了什么？",
    options: [{ label: "继续", next: "smell_direction" }],
  },
  smell_direction: {
    id: "smell_direction",
    question: "你更愿意用什么来描述\n香味的主要走向？",
    options: [
      { label: "没有酸感的甜", next: "sweet_type", value: "没有酸感的甜", image: "/img/flow-1/sweet.png" },
      { label: "酸甜(复合果汁感)", next: "sour_sweet", value: "", image: "/img/flow-1/sour_sweet.png" },
      { label: "苦涩的清香/辛辣感", next: "bitter_spicy", value: "", image: "/img/flow-1/spicy_bitter.png" },
    ],
  },
  sweet_type: {
    id: "sweet_type",
    question: "你对于甜度的形容？",
    options: [
      { label: "水果熟透的甜", next: "tropical_fruit", value: "", image: "/img/flow-1/sweet_heavy.png" },
      { label: "柔和的粉甜", next: "stone_fruit", value: "", image: "/img/flow-1/sweet_light.png" },
    ],
  },
  tropical_fruit: {
    id: "tropical_fruit",
    question: "热带水果类 (Tropical Fruit) - 具体是哪一种\n香气？",
    options: [
      { label: "芒果", next: "alcohol_check", value: "芒果", image: "/img/flow-1/mango.jpg" },
      { label: "凤梨（菠萝）", next: "alcohol_check", value: "凤梨", image: "/img/flow-1/pineapple.png" },
      { label: "百香果", next: "alcohol_check", value: "百香果", image: "/img/flow-1/passionfruit.jpg" },
      { label: "番石榴", next: "alcohol_check", value: "番石榴", image: "/img/flow-1/guava.png" },
      { label: "木瓜", next: "alcohol_check", value: "木瓜", image: "/img/flow-1/papaya.png" },
    ],
  },
  stone_fruit: {
    id: "stone_fruit",
    question: "核果与浆果类 (Stone \nFruit & Berry) - 具体\n是哪一种香气？",
    options: [
      { label: "桃子/水蜜桃", next: "alcohol_check", value: "桃子", image: "/img/flow-1/peach.png" },
      { label: "杏", next: "alcohol_check", value: "杏", image: "/img/flow-1/apricot.png" },
      { label: "李子", next: "alcohol_check", value: "李子", image: "/img/flow-1/plum.png" },
      { label: "蓝莓", next: "alcohol_check", value: "蓝莓", image: "/img/flow-1/blueberry.png" },
      { label: "草莓", next: "alcohol_check", value: "草莓", image: "/img/flow-1/strawberry.png" },
      { label: "红醋栗", next: "alcohol_check", value: "红醋栗", image: "/img/flow-1/currant.png" },
    ],
  },
  sour_sweet: {
    id: "sour_sweet",
    question: "酸甜(复合果汁感)-\n更偏向哪种？",
    options: [
      { label: "甜", next: "sweet_type", value: "", image: "/img/flow-1/ss_sweet.png" },
      { label: "酸", next: "citrus", value: "", image: "/img/flow-1/ss_sour.png" },
    ],
  },
  citrus: {
    id: "citrus",
    question: "柑橘类 (Citrus) - 具体\n是哪一种香气？",
    options: [
      { label: "葡萄柚（西柚）", next: "alcohol_check", value: "葡萄柚", image: "/img/flow-1/grapefruit.png" },
      { label: "甜橙", next: "alcohol_check", value: "甜橙", image: "/img/flow-1/orange.png" },
      { label: "橘子皮", next: "alcohol_check", value: "橘子皮", image: "/img/flow-1/orange_peel.png" },
      { label: "柠檬", next: "alcohol_check", value: "柠檬", image: "/img/flow-1/lemon.png" },
      { label: "青柠", next: "alcohol_check", value: "青柠", image: "/img/flow-1/lime.png" },
    ],
  },
  bitter_spicy: {
    id: "bitter_spicy",
    question: "植物与辛辣类 \n(Vegetal & Resin)",
    options: [
      { label: "刚割下的青草、松针、碎叶子", next: "vegetal_detail", value: "刚割下的青草、松针、碎叶子", image: "/img/flow-1/bitter_spicy_1.png" },
      { label: "类似白胡椒或淡淡的辛香料味", next: "vegetal_detail", value: "", image: "/img/flow-1/resin.png" },
    ],
  },
  vegetal_detail: {
    id: "vegetal_detail",
    question: "在这种基调下是否有\n其他描述？",
    options: [
      { label: "否", next: "alcohol_check" },
      { label: "是，还有甜感或酸感", next: "smell_direction" },
    ],
  },
  alcohol_check: {
    id: "alcohol_check",
    question: "是否有酒精味？",
    options: [
      { label: "是", next: "taste_start" },
      { label: "否", next: "taste_start" },
    ],
  },
  // smell_end: {
  //   id: "smell_end",
  //   question: "闻香结束",
  //   options: [{ label: "开始品尝", next: "taste_start" }],
  // },
  taste_start: {
    id: "taste_start",
    question: "闻香结束... 吞咽一整口，感受初始味觉",
    options: [{ label: "继续", next: "initial_taste" }],
  },
  initial_taste: {
    id: "initial_taste",
    question: "你会怎么形容初始味觉？",
    options: [
      { label: "明亮中带有酸甜，像柠檬/柚子/柑橘，很清新", next: "taste_citrus_detail", value: "柑橘", image: "/img/flow-1/citrus.png" },
      { label: "更加厚重，热带水果走向，浓郁粘稠", next: "taste_tropical_detail", value: "", image: "/img/flow-1/tropical_fruit.png"},
      { label: "圆润但愉悦的轻甜香，核果类走向，类似软糖", next: "taste_stone_detail", value: "", image: "/img/flow-1/stone_fruit.png"},
      { label: "狂野的重口味，复杂且刺激，有强烈的酒花感", next: "taste_hop_detail", value: "", image: "/img/flow-1/hops.png" },
    ],
  },
  taste_citrus_detail: {
    id: "taste_citrus_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "锐利酸爽，柠檬类", next: "taste_citrus_specific", value: "", image: "/img/flow-1/citrus_1.png" },
      { label: "苦甜交织，柚子类", next: "taste_citrus_specific", value: "", image: "/img/flow-1/pomelo.png" },
      { label: "甜美多汁，柑橘类", next: "taste_citrus_specific", value: "", image: "/img/flow-1/citrus_3.png" },
    ],
  },
  taste_citrus_specific: {
    id: "taste_citrus_specific",
    question: "选择具体风味",
    type: "multi",  //多选
    options: [
      { label: "青柠/柠檬草", next: "mouth_feel", value: "", image: "/img/flow-1/lemon_grass.png" },
      { label: "红西柚", next: "mouth_feel", value: "", image: "/img/flow-1/red_grapefruit.png" },
      { label: "佛手柑", next: "mouth_feel", value: "", image: "/img/flow-1/bergamot.png" },
      { label: "血橙", next: "mouth_feel", value: "", image: "/img/flow-1/bloodorange.png" },
      { label: "金桔", next: "mouth_feel", value: "", image: "/img/flow-1/kumquat.png" },
    ],
  },
  taste_tropical_detail: {
    id: "taste_tropical_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "浓郁厚重，高糖分", next: "taste_tropical_specific", value: "", image: "/img/flow-1/sweet.png" },
      { label: "甜中带酸，果汁感", next: "taste_tropical_specific", value: "", image: "/img/flow-1/sour_sweet.png" },
      { label: "其他风味（梨/草莓/椰子）", next: "taste_tropical_specific", value: "", image: "/img/flow-1/pear_coconut.png" },
    ],
  },
  taste_tropical_specific: {
    id: "taste_tropical_specific",
    question: "选择具体风味",
    type: "multi",  //多选
    options: [
      { label: "芒果/木瓜", next: "mouth_feel", value: "", image: "/img/flow-1/mango_papaya.png" },
      { label: "百香果", next: "mouth_feel", value: "", image: "/img/flow-1/passionfruit.jpg" },
      { label: "菠萝", next: "mouth_feel", value: "", image: "/img/flow-1/pineapple.png" },
      { label: "番石榴", next: "mouth_feel", value: "", image: "/img/flow-1/guava.png" },
      { label: "梨", next: "mouth_feel", value: "", image: "/img/flow-1/pear.png" },
      { label: "草莓", next: "mouth_feel", value: "", image: "/img/flow-1/strawberry.png" },
      { label: "椰子", next: "mouth_feel", value: "", image: "/img/flow-1/coconut.png" },
      { label: "奶油", next: "mouth_feel", value: "", image: "/img/flow-1/cream.png" },
    ],
  },
  taste_stone_detail: {
    id: "taste_stone_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "圆润肉质，水蜜桃/黄桃", next: "taste_stone_specific", value: "", image: "/img/flow-1/taste_stone_1.png" },
      { label: "微酸果酱，杏/油桃", next: "taste_stone_specific", value: "", image: "/img/flow-1/taste_stone_2.png" },
      { label: "清甜水果，哈密瓜/香梨", next: "taste_stone_specific", value: "", image: "/img/flow-1/taste_stone_3.png" },
      { label: "加工甜香，软糖/棉花糖", next: "taste_stone_specific", value: "", image: "/img/flow-1/taste_stone_4.png" },
      { label: "轻盈干爽，冰白葡萄酒", next: "taste_stone_specific", value: "", image: "/img/flow-1/taste_stone_5.png" },
    ],
  },
  taste_stone_specific: {
    id: "taste_stone_specific",
    question: "选择具体风味",
    type: "multi",  //多选
    options: [
      { label: "水蜜桃皮/白桃肉", next: "mouth_feel", value: "", image: "/img/flow-1/peach-peel.png" },
      { label: "黄杏/杏脯", next: "mouth_feel", value: "", image: "/img/flow-1/apricot_preserve.png" },
      { label: "油桃", next: "mouth_feel", value: "", image: "/img/flow-1/nectarine.png" },
      { label: "果酱", next: "mouth_feel", value: "", image: "/img/flow-1/jam.png" },
      { label: "哈密瓜/甜瓜", next: "mouth_feel", value: "", image: "/img/flow-1/melon.png" },
      { label: "香梨", next: "mouth_feel", value: "", image: "/img/flow-1/pear.png" },
      { label: "水果软糖/棉花糖", next: "mouth_feel", value: "", image: "/img/flow-1/taste_stone_4.png" },
      { label: "香草/香草荚", next: "mouth_feel", value: "", image: "/img/flow-1/vanilla.png" },
      { label: "冰干白/长相思", next: "mouth_feel", value: "", image: "/img/flow-1/taste_stone_5.png" },
      { label: "醋栗", next: "mouth_feel", value: "", image: "/img/flow-1/currant_mix.png" },
    ],
  },
  taste_hop_detail: {
    id: "taste_hop_detail",
    question: "你怎么去形容这种味道？",
    options: [
      { label: "清新木质，松针/冷杉", next: "taste_hop_specific" , value: "", image: "/img/flow-1/pine.webp"},
      { label: "碎叶青草，辛辣感", next: "taste_hop_specific" , value: "", image: "/img/flow-1/grassy.webp"},
      { label: "阴湿泥土，树脂感", next: "taste_hop_specific", value: "", image: "/img/flow-1/dank.png" },
      { label: "辛辣香料，刺激灼烧", next: "taste_hop_specific", value: "", image: "/img/flow-1/spicy.png" },
    ],
  },
  taste_hop_specific: {
    id: "taste_hop_specific",
    question: "选择具体风味",
    type: "multi",  //多选
    options: [
      { label: "松针/冷杉/雪松/松脂", next: "mouth_feel", value: "", image: "/img/flow-1/pine.webp" },
      { label: "青草味/绿色/辛辣", next: "mouth_feel", value: "", image: "/img/flow-1/grassy.webp" },
      { label: "阴冷潮湿/树脂/大麻", next: "mouth_feel", value: "", image: "/img/flow-1/dank.png" },
      { label: "黑白胡椒/薄荷/温热", next: "mouth_feel", value: "", image: "/img/flow-1/spicy.png" },
    ],
  },
  //味觉感受页面
  mouth_feel: {
    id: "mouth_feel",
    question: "再喝一口，感受前段入口，停留，铺满整个舌面",
    type: "taste",  // 新增类型
    options: [
      { label: "", next: "nose_aroma" },  // 只需要一个 next
    ],
  },
  // Old flow:
  // mouth_feel: {
  //   id: "mouth_feel",
  //   question: "再喝一口，感受前段入口，停留，铺满整个舌面",
  //   options: [
  //     { label: "舌尖：甜感先出", next: "sweet_feel", value: "", image: "/img/flow-1/" },
  //     { label: "舌侧：酸感先出", next: "sour_feel", value: "", image: "/img/flow-1/" },
  //     { label: "舌根：苦感先出", next: "bitter_feel", value: "", image: "/img/flow-1/" },
  //   ],
  // },
  // sweet_feel: {
  //   id: "sweet_feel",
  //   question: "甜感程度",
  //   options: [
  //     { label: "甜感先出", next: "nose_aroma", value: "", image: "/img/flow-1/" },
  //     { label: "有甜感", next: "nose_aroma", value: "", image: "/img/flow-1/" },
  //     { label: "无甜感", next: "nose_aroma", value: "", image: "/img/flow-1/" },
  //   ],
  // },
  // sour_feel: {
  //   id: "sour_feel",
  //   question: "酸感程度",
  //   options: [
  //     { label: "酸感先出", next: "nose_aroma", value: "", image: "/img/flow-1/" },
  //     { label: "有酸感", next: "nose_aroma", value: "", image: "/img/flow-1/" },
  //     { label: "无酸感", next: "nose_aroma", value: "", image: "/img/flow-1/" },
  //   ],
  // },
  // bitter_feel: {
  //   id: "bitter_feel",
  //   question: "苦感程度",
  //   options: [
  //     { label: "苦感先出", next: "nose_aroma", value: "", image: "/img/flow-1/" },
  //     { label: "有苦感", next: "nose_aroma", value: "", image: "/img/flow-1/" },
  //     { label: "无苦感", next: "nose_aroma", value: "", image: "/img/flow-1/" },
  //   ],
  // },

  // YON
  nose_aroma: {
    id: "nose_aroma",
    question: "感受鼻腔香气:\n是否修改香味描述？",
    options: [
      { label: "是，返回修改", next: "smell_direction" },
      { label: "否，继续", next: "body" },
    ],
  },
  // Wavy
  body: {
    id: "body",
    question: "再喝一口，感受中段\n酒体厚度",
    options: [{ label: "继续", next: "body_complexity" }],
  },
  body_complexity: {
    id: "body_complexity",
    question: "味道是否持续、复杂",
    type: "rating",
    options: [
      { label: "有支撑", next: "balance", value: "0.2" },
      { label: "一般", next: "balance", value: "0" },
      { label: "无支撑", next: "balance", value: "-0.2" },
    ],
  },
  balance: {
    id: "balance",
    question: "味道是否平衡，没有哪一方面过于突出？",
    type: "rating",
    options: [
      { label: "好", next: "finish", value: "0.2" },
      { label: "一般", next: "finish", value: "0" },
      { label: "不好", next: "finish", value: "-0.2" },
    ],
  },
  // Wavy
  finish: {
    id: "finish",
    question: "再喝一口，感受尾段收口",
    options: [{ label: "继续", next: "bitter_finish" }],
  },

  bitter_finish: {
    id: "bitter_finish",
    question: "苦味收口",
    type: "rating",
    options: [
      { label: "时间短，干净利落", next: "sweet_finish", value: "0.2" },
      { label: "时间长，拖沓绵长", next: "sweet_finish", value: "-0.2" },
    ],
  },
  sweet_finish: {
    id: "sweet_finish",
    question: "甜味收口",
    type: "rating",
    options: [
      { label: "清爽，残糖少", next: "carbonation", value: "0.1" },
      { label: "平衡，甜苦抵消", next: "carbonation", value: "0.1" },
      { label: "余甜，残糖多", next: "carbonation", value: "0" },
    ],
  },
  carbonation: {
    id: "carbonation",
    question: "碳酸感",
    type: "rating",
    options: [
      { label: "强", next: "alcohol_feel", value: "0.1" },
      { label: "弱", next: "alcohol_feel", value: "0" },
    ],
  },
  alcohol_feel: {
    id: "alcohol_feel",
    question: "选择当前IPA的酒精倍数：",
    options: [
      { label: "Single (低酒精度)", next: "alcohol_single" },
      { label: "Double/Imperial (中高酒精度)", next: "alcohol_double" },
      { label: "Triple/Quad/More (高酒精度)", next: "alcohol_triple" },
    ],
  },
  alcohol_single: {
    id: "alcohol_single",
    question: "Single 酒精感评价",
    type: "rating",
    options: [
      { label: "明显酒精刺激", next: "drink_single", value: "-1" },
      { label: "微弱酒精感", next: "drink_single", value: "-0.5" },
      { label: "完全包裹无酒精感", next: "drink_single", value: "0.25" },
    ],
  },
  alcohol_double: {
    id: "alcohol_double",
    question: "Double/Imperial 酒精感评价",
    type: "rating",
    options: [
      { label: "明显酒精刺激", next: "drink_double", value: "-0.5" },
      { label: "微弱酒精感", next: "drink_double", value: "0" },
      { label: "完全包裹无酒精感", next: "drink_double", value: "0.25" },
    ],
  },
  alcohol_triple: {
    id: "alcohol_triple",
    question: "Triple/Quadruple/More 酒精感评价",
    type: "rating",
    options: [
      { label: "明显酒精刺激", next: "drink_triple", value: "-0.2" },
      { label: "微弱酒精感", next: "drink_triple", value: "0.2" },
      { label: "完全包裹无酒精感", next: "drink_triple", value: "0.5" },
    ],
  },
  //与alcohol_feel重复
  // drinkability: {
  //   id: "drinkability",
  //   question: "易饮性评价",
  //   options: [
  //     { label: "Single (低酒精)", next: "drink_single" },
  //     { label: "Double/Imperial (中高酒精)", next: "drink_double" },
  //     { label: "Triple/Quadruple (高酒精)", next: "drink_triple" },
  //   ],
  // },
  drink_single: {
    id: "drink_single",
    question: "Single 易饮性",
    type: "rating",
    options: [
      { label: "无压力，易饮性好", next: "complete", value: "0.1" },
      { label: "一般", next: "complete", value: "0" },
      { label: "压力大，易饮性差", next: "complete", value: "-0.5" },
    ],
  },
  drink_double: {
    id: "drink_double",
    question: "Double/Imperial 易饮性",
    type: "rating",
    options: [
      { label: "无压力，易饮性好", next: "complete", value: "0.25" },
      { label: "一般", next: "complete", value: "0.1" },
      { label: "压力大，易饮性差", next: "complete", value: "-0.25" },
    ],
  },
  drink_triple: {
    id: "drink_triple",
    question: "Triple/Quadruple 易饮性",
    type: "rating",
    options: [
      { label: "无压力，易饮性好", next: "complete", value: "0.5" },
      { label: "一般", next: "complete", value: "0.25" },
      { label: "压力大，易饮性差", next: "complete", value: "-0.1" },
    ],
  },
  // Wavy
  complete: {
    id: "complete",
    question: "品鉴完成！",
    options: [],
    type: "end",
  },
};

// Yes or No
const decisionNodes: Record<string, {
  options: [
    { title: string; description?: string; icon: LucideIcon; colorClass: string; isRecommended?: boolean },
    { title: string; description?: string; icon: LucideIcon; colorClass: string; isRecommended?: boolean }
  ]
}> = {
  vegetal_detail: {
    options: [
      { title: "否", description: "没有其他描述", icon: X, colorClass: "red" },
      { title: "是，还有甜感或酸感", description: "返回重新选择香味走向", icon: Check, colorClass: "amber", isRecommended: true },
    ]
  },
  alcohol_check: {
    options: [
      { title: "是", description: "有酒精味", icon: Check, colorClass: "amber" },
      { title: "否", description: "没有酒精味", icon: X, colorClass: "zinc" },
    ]
  },
  nose_aroma: {
    options: [
      { title: "是", description: "返回修改", icon: Check, colorClass: "amber" },
      { title: "否", description: "确认选择并继续", icon: X, colorClass: "amber" },
    ],
  },
  //TODO
  // bitter_finish: {
  //   options: [
  //     { title: "时间短", description: "干净利落", icon: Check, colorClass: "amber" },
  //     { title: "时间长", description: "拖沓绵长", icon: X, colorClass: "amber" },
  //   ],
  // },
};

// Rating Component
const ratingNodes: Record<string, { title: string; subtitle?: string; description?: string }> = {
  body_complexity: { title: "酒体复杂度", subtitle: "", description: "味道是否持续、复杂" },
  balance: { title: "平衡度", subtitle: "", description: "味道是否平衡，没有哪一方面过于突出" },
  bitter_finish: { title: "苦味收口", subtitle: "", description: "苦味消失的方式" },
  sweet_finish: { title: "甜味收口", subtitle: "", description: "甜味收口的感受" },
  carbonation: { title: "碳酸感", subtitle: "", description: "气泡的强度" },
  alcohol_single: { title: "酒精感", subtitle: "Single", description: "低酒精度下的酒精感知" },
  alcohol_double: { title: "酒精感", subtitle: "Double/Imperial", description: "中高酒精度下的酒精感知" },
  alcohol_triple: { title: "酒精感", subtitle: "Triple/Quad/More", description: "高酒精度下的酒精感知" },
  drink_single: { title: "易饮性", subtitle: "Single", description: "低酒精度下的易饮程度" },
  drink_double: { title: "易饮性", subtitle: "Double/Imperial", description: "中高酒精度下的易饮程度" },
  drink_triple: { title: "易饮性", subtitle: "Triple/Quad/More", description: "高酒精度下的易饮程度" },
};

// 缓慢滚动至顶部 
// duration参数：500 0.5s, 800 0.8s, 1200 1.2s, 1500 1.5s
const smoothScrollToTop = (duration: number = 800) => {
  const start = window.scrollY;
  const startTime = performance.now();
    
  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
      
    // easeOutCubic 缓动函数，更平滑
    const easeOut = 1 - Math.pow(1 - progress, 3);
      
    window.scrollTo(0, start * (1 - easeOut));
      
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};  

export default function FlowPage() {
  const [currentNode, setCurrentNode] = useState("start");
  const [history, setHistory] = useState<string[]>([]);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [multiSelectIndices, setMultiSelectIndices] = useState<number[]>([]);
  // taste-analyzer
  const [tasteSelections, setTasteSelections] = useState<Record<string, string>>({});
  // 基础分 3.5
  const [totalScore, setTotalScore] = useState(3.5); 
  // 报告状态控制
  const [showReport, setShowReport] = useState(false);
  // 标记是否处于"香味修改模式"
  const [isAromaEditMode, setIsAromaEditMode] = useState(false);

  const node = flowData[currentNode];

  const handleSelect = (option: { label: string; next: string; value?: string }) => {
    setSelections((prev) => ({ ...prev, [currentNode]: option.value || option.label }));
    setHistory((prev) => [...prev, currentNode]);
    
    // 检查：如果在香味修改模式下，且下一个节点是味觉开始（taste_start）
    // 则跳回 nose_aroma 而不是继续味觉流程
    if (isAromaEditMode && option.next === "taste_start") {
      setCurrentNode("nose_aroma");
      setIsAromaEditMode(false); // 退出修改模式
    } else {
      setCurrentNode(option.next);
    }

    // 跳转下一页滚动到页面顶部 （浏览器控制，弃用）
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    // 滚动至顶部
    smoothScrollToTop(800);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      
      const prevNode = flowData[prev];
      // 如果返回的是多选节点，恢复之前的选择
      if (prevNode.type === "multi" && selections[prev]) {
        const selectedValues = selections[prev].split(", ");
        const indices = prevNode.options
          .map((opt, i) => selectedValues.includes(opt.value || opt.label) ? i : -1)
          .filter(i => i !== -1);
        setMultiSelectIndices(indices);
      } else {
        setMultiSelectIndices([]);
      }
      
      setCurrentNode(prev);

      // 返回上一页滚动到页面顶部 （浏览器控制，弃用）
      // window.scrollTo({ top: 0, behavior: 'smooth' });
      // 滚动至顶部
      smoothScrollToTop(800);
    }
  };



  const handleReset = () => {
    setCurrentNode("start");
    setHistory([]);
    setSelections({});
    setMultiSelectIndices([]);
    setTasteSelections({});
    setTotalScore(3.5); //基础分3.5
    setShowReport(false); //默认不显示报告
    setIsAromaEditMode(false); //重置香味修改模式
  };

  // 香味流程的节点列表（用于判断是否在香味修改流程中）
  const aromaNodeIds = [
    "smell_direction",
    "sweet_type", 
    "tropical_fruit",
    "stone_fruit",
    "sour_sweet",
    "citrus",
    "bitter_spicy",
    "vegetal_detail",
    "alcohol_check",
  ];

  // 提取香气相关的选择，用于 nose_aroma 节点展示
  const getAromaTags = (): { label: string; category?: string }[] => {
    const tags: { label: string; category?: string }[] = [];
    
    // 香气相关的节点映射
    const aromaNodes: Record<string, string> = {
      smell_direction: "香味走向",
      sweet_type: "甜度类型",
      tropical_fruit: "热带水果",
      stone_fruit: "核果浆果",
      citrus: "柑橘类",
      bitter_spicy: "植物辛辣",
      alcohol_check: "酒精感",
    };
    
    Object.entries(aromaNodes).forEach(([nodeId, category]) => {
      if (selections[nodeId]) {
        // 处理多选值（逗号分隔）
        const values = selections[nodeId].split(", ");
        values.forEach(value => {
          if (value && value !== "继续") {
            tags.push({ label: value, category });
          }
        });
      }
    });
    
    return tags;
  };

  // 多选确认处理函数
  const handleMultiSelectConfirm = () => {
    const selectedValues = multiSelectIndices
      .map(i => node.options[i].value || node.options[i].label)
      .join(", ");
    
    setSelections((prev) => ({ ...prev, [currentNode]: selectedValues }));
    setHistory((prev) => [...prev, currentNode]);
    setCurrentNode(node.options[0].next);
    setMultiSelectIndices([]);
    // 滚动至顶部
    smoothScrollToTop(800);
  };

  const handleTasteSubmit = (tasteData: Record<string, string>) => {
    // 转换为可读的字符串保存
    const tasteLabels: Record<string, string> = {
      'sweet-first': '甜感先出', 'sweet-yes': '有甜感', 'sweet-no': '无甜感',
      'sour-first': '酸感先出', 'sour-yes': '有酸感', 'sour-no': '无酸感',
      'bitter-first': '苦感先出', 'bitter-yes': '有苦感', 'bitter-no': '无苦感',
    };
    
    const result = Object.entries(tasteData)
      .map(([zone, optionId]) => tasteLabels[optionId] || optionId)
      .join(", ");
    
    setSelections((prev) => ({ ...prev, [currentNode]: result }));
    setTasteSelections(tasteData);
    setHistory((prev) => [...prev, currentNode]);
    setCurrentNode(node.options[0].next);
    //滚动到顶部
    smoothScrollToTop(800);
  };

  //确认打分
  const handleRatingConfirm = (score: number, optionId: string, optionLabel: string) => {
    const newScore = Math.min(5, Math.max(0, totalScore + score));
    setTotalScore(newScore);
    
    // 找到选中的选项
    const selectedOption = node.options.find((_, i) => `${currentNode}-${i}` === optionId);
    
    setSelections((prev) => ({ ...prev, [currentNode]: `${optionLabel} (${score >= 0 ? '+' : ''}${score})` }));
    setHistory((prev) => [...prev, currentNode]);
    setCurrentNode(selectedOption?.next || node.options[0].next);
  };

  // 将选项转换为 FocusCards 需要的格式
  const focusCards = node.options.map((option) => ({
  title: option.label,
  src: option.image,  // 添加这行
  onClick: () => handleSelect(option),
  }));

  // 显示报告页面
  if (showReport) {
    return (
      <TastingReport
        score={totalScore}
        selections={selections}
        flowData={flowData}
        onRestart={() => {
          handleReset();
          setShowReport(false);
        }}
      />
    );
  }

  // // start 节点使用 WavyBackground 特殊渲染
  // if (currentNode === "start") {
  //   return (
  //     <WavyBackground
  //       containerClassName="flex-1 w-full"
  //       className="flex flex-col items-center justify-center"
  //       colors={["#F59E0B", "#D97706", "#FBBF24", "#FEF3C7", "#FDE68A"]}
  //       backgroundFill="#181818"
  //     >
  //       <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
  //         {node.question}
  //       </h1>
  //       <Button
  //         onClick={() => handleSelect(node.options[0])}
  //         className="px-16 py-3 text-lg md:text-xl h-auto"
  //       >
  //         {node.options[0].label}
  //       </Button>
  //     </WavyBackground>
  //   );
  // }

  // 数组
  const wavyNodes = ["start", "taste_start", "body", "finish", "complete"];

  // WavyBackground 节点
  if (wavyNodes.includes(currentNode)) {
    //判断是否为结束节点 complete
    const isEndNode = node.type === "end" || node.options.length === 0;
    return (
      <WavyBackground
      containerClassName="flex-1 w-full"
      className="flex flex-col items-center justify-center"
      colors={["#F59E0B", "#D97706", "#FBBF24", "#FEF3C7", "#FDE68A"]}
      backgroundFill="#181818"
    >
      {/* <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
        {node.question}
      </h1> */}
      {/* 移动端换行 PC端不换行 */}
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
        {node.question.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br className="block sm:hidden" />}
            {i > 0 && <span className="hidden sm:inline"> </span>}
            {line}
          </React.Fragment>
        ))}
      </h1>
      
      <div className="flex gap-4">
        {history.length > 0 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="px-8 py-3 text-lg md:text-xl h-auto border-white/50 bg-white/20 hover:bg-white/30 text-white"
          >
            ← 上一步
          </Button>
        )}

        {/* <Button
          onClick={() => handleSelect(node.options[0])}
          className="px-16 py-3 text-lg md:text-xl h-auto"
        >
          {node.options[0].label}
        </Button> */}
        {!isEndNode && (
          <Button
            onClick={() => handleSelect(node.options[0])}
            className="px-16 py-3 text-lg md:text-xl h-auto"
          >
            {node.options[0].label}
          </Button>
        )}
        {isEndNode && (
          <Button
            onClick={() => setShowReport(true)} // 显示报告
            className="px-16 py-3 text-lg md:text-xl h-auto"
          >
            查看报告
          </Button>
        )}
      </div>
    </WavyBackground>
    );
  }

  // vegetal_detail 节点使用 DecisionLayout
  // if (currentNode === "vegetal_detail") {
  //   return (
  //     <DecisionLayout
  //       mainTitle={node.question}
  //       options={[
  //         {
  //           title: "否",
  //           description: "没有其他描述",
  //           icon: X,
  //           colorClass: "red",
  //           action: () => handleSelect(node.options[0]),
  //         },
  //         {
  //           title: "是，还有甜感或酸感",
  //           description: "返回重新选择香味走向",
  //           icon: Check,
  //           colorClass: "amber",
  //           action: () => handleSelect(node.options[1]),
  //           isRecommended: true,
  //         },
  //       ]}
  //     />
  //   );
  // }


  // DecisionLayout 节点
  // if (decisionNodes[currentNode]) {
  //   const config = decisionNodes[currentNode];
  //   return (
  //     <DecisionLayout
  //       mainTitle={node.question}
  //       options={[
  //         { ...config.options[0], action: () => handleSelect(node.options[0]) },
  //         { ...config.options[1], action: () => handleSelect(node.options[1]) },
  //       ]}
  //     />
  //   );
  // }

  // tag传值的DecisionLayout 节点
  if (decisionNodes[currentNode]) {
    const config = decisionNodes[currentNode];
    
    // nose_aroma 节点特殊处理：展示香气 tags
    const isNoseAroma = currentNode === "nose_aroma";

    // 自定义 nose_aroma 的"是"选项行为
    const handleNoseAromaYes = () => {
      setIsAromaEditMode(true); // 进入香味修改模式
      
      // 清除之前的香味相关选择
      setSelections((prev) => {
        const newSelections = { ...prev };
        aromaNodeIds.forEach((nodeId) => {
          delete newSelections[nodeId];
        });
        return newSelections;
      });
      
      // 清除香味相关的历史记录，避免返回到旧的香味节点
      setHistory((prev) => prev.filter((nodeId) => !aromaNodeIds.includes(nodeId)));
      
      setCurrentNode("smell_direction"); // 直接跳转，不走 handleSelect
      smoothScrollToTop(800);
    };
    
    return (
      <DecisionLayout
        mainTitle={node.question}
        options={[
          { 
            ...config.options[0], 
            action: isNoseAroma ? handleNoseAromaYes : () => handleSelect(node.options[0]) 
          },
          { 
            ...config.options[1], 
            action: () => handleSelect(node.options[1]) 
          },
        ]}
        tags={isNoseAroma ? getAromaTags() : undefined}
        tagsTitle={isNoseAroma ? "你选择的香气" : undefined}
      />
    );
  }

  // TasteAnalyzer 节点
  if (node.type === "taste") {
    return (
      <TasteAnalyzer 
        onSubmit={handleTasteSubmit}
        onBack={handleBack}
        showBack={history.length > 0}
        initialSelections={tasteSelections}
      />
    );
  }

  // Rating 节点
  if (ratingNodes[currentNode]) {
    const config = ratingNodes[currentNode];
    const ratingData = {
      id: currentNode,
      title: config.title,
      subtitle: config.subtitle,
      description: config.description,
      options: node.options.map((opt, i) => ({
        id: `${currentNode}-${i}`,
        label: opt.label.replace(/\s*\([^)]*\)\s*$/, ''), // 移除括号里的分数显示
        score: parseFloat(opt.value || '0'),
      })),
    };
    
    return (
      <SingleRating
        data={ratingData}
        currentTotalScore={totalScore}
        onConfirm={handleRatingConfirm}
        onBack={handleBack}
        showBack={history.length > 0}
      />
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
            {/* 移动端换行 */}
            {node.question.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br className="block sm:hidden" />}
                {i > 0 && <span className="hidden sm:inline"> </span>}
                {line}
              </React.Fragment>
            ))}
          </h1>
        </div>

        {/* 选项卡片 - FocusCards */}
        {node.type !== "end" ? (
          node.type === "multi" ? (
            <FocusCards 
              cards={focusCards} 
              multiSelect={true}
              selectedIndices={multiSelectIndices}
              onSelectionChange={setMultiSelectIndices}
              onConfirm={handleMultiSelectConfirm}
            />
        ) : (
          <FocusCards cards={focusCards} />
        )
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