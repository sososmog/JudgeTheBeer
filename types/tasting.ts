export interface TastingScore {
  appearance: {
    color: number;
    clarity: number;
    hasHopShit: boolean;
    head: number;
    headColor: number;
    headTexture: number;
    headRetention: number;
    viscosity: number;
  };
  aroma: {
    malt: number;
    hops: number;
    yeast: number;
    other: number;
    fruity: number;
    floral: number;
    spicy: number;
    oxidized: number;
    skunky: number;
    metallic: number;
    cardboard: number;
    vinegar: number;
    sulfur: number;
  };
  taste: {
    sweet: number;
    bitter: number;
    sour: number;
    maltFlavor: number;
    hopFlavor: number;
  };
  mouthfeel: {
    body: number;
    carbonation: number;
    finish: number;
  };
  overall: {
    balance: number;
    complexity: number;
    enjoyment: number;
  };
}

export interface BeerInfo {
  name: string;
  style: string;
  brewery: string;
}