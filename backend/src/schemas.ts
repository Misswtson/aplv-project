import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
  passwordHash: z.string(),
  createdAt: z.string().refine((s) => !isNaN(Date.parse(s)), { message: "Invalid ISO date" })
});

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  brand: z.string(),
  category: z.string(),
  isSafeForAPLV: z.union([z.boolean(), z.null()]),
  scanCode: z.string().optional(),
  updatedAt: z.string().optional()
});

export const IngredientSchema = z.object({
  id: z.number().int().positive(),
  productId: z.number().int().positive(),
  name: z.string(),
  isMilkOrDeriv: z.boolean(),
  aliases: z.array(z.string()),
  updatedAt: z.string().optional()
});

// For arrays:
export const UsersArray = z.array(UserSchema);
export const ProductsArray = z.array(ProductSchema);
export const IngredientsArray = z.array(IngredientSchema);
