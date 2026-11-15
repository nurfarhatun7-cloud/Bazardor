export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export type Change = {
  dir: string;
  pct: number;
};

export type Product = {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  unit: string;
  image: string;
  today: number;
  change: Change;
};

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type ProductDetail = Product & {
  categoryNameBn: string;
  categoryIcon: string;
  yesterday: number;
  markets: Market[];
};
