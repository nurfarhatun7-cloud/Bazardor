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
