export interface TastingScore {
  appearance: {
    color: number;
    clarity: number;
    head: number;
  };
  aroma: {
    malt: number;
    hops: number;
    yeast: number;
    other: number;
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