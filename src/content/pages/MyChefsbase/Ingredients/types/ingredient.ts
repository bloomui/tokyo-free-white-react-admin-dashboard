/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Material } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: ingredient
// ====================================================

export interface ingredient_ingredient_nutrition_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface ingredient_ingredient_nutrition_nutrition_protein {
  __typename: "Proteins";
  plant: number | null;
  animal: number | null;
  total: number | null;
}

export interface ingredient_ingredient_nutrition_nutrition_carbs {
  __typename: "Carbs";
  carbs: number | null;
  sugar: number | null;
}

export interface ingredient_ingredient_nutrition_nutrition_fat {
  __typename: "Fats";
  satured: number | null;
  singleUnsat: number | null;
  compoundUnsat: number | null;
  total: number | null;
}

export interface ingredient_ingredient_nutrition_nutrition_vitamins {
  __typename: "Vitamins";
  e: number | null;
  c: number | null;
  kTotal: number | null;
  b12: number | null;
  dTotal: number | null;
}

export interface ingredient_ingredient_nutrition_nutrition_iron {
  __typename: "Iron";
  total: number | null;
}

export interface ingredient_ingredient_nutrition_nutrition {
  __typename: "Nutrition";
  kcal: number | null;
  protein: ingredient_ingredient_nutrition_nutrition_protein | null;
  carbs: ingredient_ingredient_nutrition_nutrition_carbs | null;
  fat: ingredient_ingredient_nutrition_nutrition_fat | null;
  starch: number | null;
  polyols: number | null;
  fibres: number | null;
  nitrogen: number | null;
  polysachhariden: number | null;
  alcohol: number | null;
  water: number | null;
  organicAcids: number | null;
  vitamins: ingredient_ingredient_nutrition_nutrition_vitamins | null;
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
  iron: ingredient_ingredient_nutrition_nutrition_iron | null;
  magnesium: number | null;
  fosfor: number | null;
  calcium: number | null;
  kalium: number | null;
  natrium: number | null;
  cholesterol: number | null;
  famstxr: number | null;
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
  material: Material | null;
  nutrition: ingredient_ingredient_nutrition | null;
  products: ingredient_ingredient_products[] | null;
}

export interface ingredient {
  ingredient: ingredient_ingredient | null;
}

export interface ingredientVariables {
  id: string;
}
