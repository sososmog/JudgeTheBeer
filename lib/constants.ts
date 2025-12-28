export const STEPS = [
  { id: 'info', title: '啤酒信息', titleEn: 'Beer Info' },
  { id: 'appearance', title: '外观', titleEn: 'Appearance' },
  { id: 'aroma', title: '香气', titleEn: 'Aroma' },
  { id: 'taste', title: '味道', titleEn: 'Taste' },
  { id: 'mouthfeel', title: '口感', titleEn: 'Mouthfeel' },
  { id: 'overall', title: '整体', titleEn: 'Overall' },
] as const;

export const INITIAL_SCORE = {
  appearance: { color: 3, clarity: 3, head: 3 },
  aroma: { malt: 3, hops: 3, yeast: 3, other: 3 },
  taste: { sweet: 3, bitter: 3, sour: 3, maltFlavor: 3, hopFlavor: 3 },
  mouthfeel: { body: 3, carbonation: 3, finish: 3 },
  overall: { balance: 3, complexity: 3, enjoyment: 3 },
};