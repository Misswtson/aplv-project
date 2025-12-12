"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsArray = exports.ProductsArray = exports.UsersArray = exports.IngredientSchema = exports.ProductSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    passwordHash: zod_1.z.string(),
    createdAt: zod_1.z.string().refine((s) => !isNaN(Date.parse(s)), { message: "Invalid ISO date" })
});
exports.ProductSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    name: zod_1.z.string(),
    brand: zod_1.z.string(),
    category: zod_1.z.string(),
    isSafeForAPLV: zod_1.z.union([zod_1.z.boolean(), zod_1.z.null()]),
    scanCode: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional()
});
exports.IngredientSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    productId: zod_1.z.number().int().positive(),
    name: zod_1.z.string(),
    isMilkOrDeriv: zod_1.z.boolean(),
    aliases: zod_1.z.array(zod_1.z.string()),
    updatedAt: zod_1.z.string().optional()
});
// For arrays:
exports.UsersArray = zod_1.z.array(exports.UserSchema);
exports.ProductsArray = zod_1.z.array(exports.ProductSchema);
exports.IngredientsArray = zod_1.z.array(exports.IngredientSchema);
