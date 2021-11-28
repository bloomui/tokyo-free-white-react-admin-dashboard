/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NutritionForRecipe
// ====================================================

export interface NutritionForRecipe_nutritionForRecipe_protein {
  __typename: "Proteins";
  plant: number | null;
  animal: number | null;
  total: number | null;
}

export interface NutritionForRecipe_nutritionForRecipe_carbs {
  __typename: "Carbs";
  carbs: number | null;
  sugar: number | null;
}

export interface NutritionForRecipe_nutritionForRecipe_fat {
  __typename: "Fats";
  satured: number | null;
  singleUnsat: number | null;
  compoundUnsat: number | null;
  total: number | null;
}

export interface NutritionForRecipe_nutritionForRecipe_vitamins {
  __typename: "Vitamins";
  e: number | null;
  c: number | null;
  kTotal: number | null;
  b12: number | null;
  dTotal: number | null;
}

export interface NutritionForRecipe_nutritionForRecipe_iron {
  __typename: "Iron";
  total: number | null;
}

export interface NutritionForRecipe_nutritionForRecipe {
  __typename: "Nutrition";
  kcal: number | null;
  protein: NutritionForRecipe_nutritionForRecipe_protein | null;
  carbs: NutritionForRecipe_nutritionForRecipe_carbs | null;
  fat: NutritionForRecipe_nutritionForRecipe_fat | null;
  starch: number | null;
  polyols: number | null;
  fibres: number | null;
  nitrogen: number | null;
  polysachhariden: number | null;
  alcohol: number | null;
  water: number | null;
  organicAcids: number | null;
  vitamins: NutritionForRecipe_nutritionForRecipe_vitamins | null;
  foliumAcid: number | null;
  pholate: number | null;
  pholatEquivalents: number | null;
  nicotinAcid: number | null;
  lycopeans: number | null;
  betaCrypto: number | null;
  zeacanthine: number | null;
  lutein: number | null;
  ash: number | null;
  jodium: number | null;
  sink: number | null;
  selenium: number | null;
  cupper: number | null;
  iron: NutritionForRecipe_nutritionForRecipe_iron | null;
  magnesium: number | null;
  fosfor: number | null;
  calcium: number | null;
  kalium: number | null;
  natrium: number | null;
  cholesterol: number | null;
  famstxr: number | null;
}

export interface NutritionForRecipe {
  nutritionForRecipe: NutritionForRecipe_nutritionForRecipe | null;
}

export interface NutritionForRecipeVariables {
  id: string;
  quantity: number;
  unit: string;
}
