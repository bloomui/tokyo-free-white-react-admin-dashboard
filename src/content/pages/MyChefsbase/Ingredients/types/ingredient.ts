/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ingredient
// ====================================================

export interface ingredient_ingredient_nutrition_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface ingredient_ingredient_nutrition_nutrition_vitamins {
  __typename: "Vitamins";
  c: number | null;
  e: number | null;
  dTotal: number | null;
  kTotal: number | null;
}

export interface ingredient_ingredient_nutrition_nutrition_carbs {
  __typename: "Carbs";
  carbs: number | null;
  sugar: number | null;
}

export interface ingredient_ingredient_nutrition_nutrition_protein {
  __typename: "Proteins";
  total: number | null;
}

export interface ingredient_ingredient_nutrition_nutrition_fat {
  __typename: "Fats";
  total: number | null;
}

export interface ingredient_ingredient_nutrition_nutrition {
  __typename: "Nutrition";
  vitamins: ingredient_ingredient_nutrition_nutrition_vitamins | null;
  carbs: ingredient_ingredient_nutrition_nutrition_carbs | null;
  protein: ingredient_ingredient_nutrition_nutrition_protein | null;
  fat: ingredient_ingredient_nutrition_nutrition_fat | null;
  kcal: number | null;
}

export interface ingredient_ingredient_nutrition {
  __typename: "QuantityToNutrition";
  quantity: ingredient_ingredient_nutrition_quantity;
  nutrition: ingredient_ingredient_nutrition_nutrition;
}

export interface ingredient_ingredient_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface ingredient_ingredient {
  __typename: "Ingredient";
  category: string | null;
  id: string;
  name: string;
  rating: number | null;
  nutrition: ingredient_ingredient_nutrition | null;
  products: ingredient_ingredient_products[] | null;
}

export interface ingredient {
  ingredient: ingredient_ingredient | null;
}

export interface ingredientVariables {
  id: string;
}
