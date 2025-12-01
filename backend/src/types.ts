// src/types.ts
export type User = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string; // ISO date
};

export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  isSafeForAPLV: boolean | null;
  scanCode?: string;
  updatedAt?: string;
};

export type Ingredient = {
  id: number;
  productId: number;
  name: string;
  isMilkOrDeriv: boolean;
  aliases: string[];
  updatedAt?: string;
};
