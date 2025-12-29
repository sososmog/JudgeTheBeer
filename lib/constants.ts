export const STEPS = [
  { id: 'info', title: '啤酒信息', titleEn: 'Beer Info' },
  { id: 'appearance', title: '外观', titleEn: 'Appearance' },
  { id: 'aroma', title: '香气', titleEn: 'Aroma' },
  { id: 'taste', title: '味道', titleEn: 'Taste' },
  { id: 'mouthfeel', title: '口感', titleEn: 'Mouthfeel' },
  { id: 'overall', title: '整体', titleEn: 'Overall' },
] as const;

export const INITIAL_SCORE = {
  appearance: {
    color: 3,
    clarity: 3,
    hasHopShit: false,
    head: 3,
    headColor: 3,
    headTexture: 3,
    headRetention: 3,
    viscosity: 3,
  },
  aroma: { malt: 3, hops: 3, yeast: 3, other: 3 },
  taste: { sweet: 3, bitter: 3, sour: 3, maltFlavor: 3, hopFlavor: 3 },
  mouthfeel: { body: 3, carbonation: 3, finish: 3 },
  overall: { balance: 3, complexity: 3, enjoyment: 3 },
};

export const TRANSITION_TEXTS = [
  { title: "准备好了吗？", description: "接下来让我们观察这杯啤酒的外观" },
  { title: "色泽观察完毕", description: "现在闭上眼睛，感受啤酒的香气" },
  { title: "香气记录完成", description: "轻啜一口，让味蕾感受风味" },
  { title: "风味探索结束", description: "感受啤酒在口中的质感" },
  { title: "即将完成", description: "最后给出你的整体评价" },
];