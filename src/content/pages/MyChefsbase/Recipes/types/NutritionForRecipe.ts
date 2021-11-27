/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NutritionForRecipe
// ====================================================

export interface NutritionForRecipe_nutritionForRecipe_vitamins {
  __typename: "Vitamins";
  c: number | null;
  e: number | null;
  dTotal: number | null;
  kTotal: number | null;
}

export interface NutritionForRecipe_nutritionForRecipe_carbs {
  __typename: "Carbs";
  carbs: number | null;
  sugar: number | null;
}

export interface NutritionForRecipe_nutritionForRecipe_protein {
  __typename: "Proteins";
  total: number | null;
}

export interface NutritionForRecipe_nutritionForRecipe_fat {
  __typename: "Fats";
  total: number | null;
}

export interface NutritionForRecipe_nutritionForRecipe {
  __typename: "Nutrition";
  vitamins: NutritionForRecipe_nutritionForRecipe_vitamins | null;
  carbs: NutritionForRecipe_nutritionForRecipe_carbs | null;
  protein: NutritionForRecipe_nutritionForRecipe_protein | null;
  fat: NutritionForRecipe_nutritionForRecipe_fat | null;
  kcal: number | null;
}

export interface NutritionForRecipe {
  nutritionForRecipe: NutritionForRecipe_nutritionForRecipe | null;
}

export interface NutritionForRecipeVariables {
  id: string;
  quantity: number;
  unit: string;
}
