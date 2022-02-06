/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: dish
// ====================================================

export interface dish_dish_nutrition_protein {
  __typename: "Proteins";
  plant: number | null;
  animal: number | null;
  total: number | null;
}

export interface dish_dish_nutrition_carbs {
  __typename: "Carbs";
  carbs: number | null;
  sugar: number | null;
}

export interface dish_dish_nutrition_fat {
  __typename: "Fats";
  satured: number | null;
  singleUnsat: number | null;
  compoundUnsat: number | null;
  total: number | null;
}

export interface dish_dish_nutrition_vitamins {
  __typename: "Vitamins";
  e: number | null;
  c: number | null;
  kTotal: number | null;
  b12: number | null;
  dTotal: number | null;
}

export interface dish_dish_nutrition_iron {
  __typename: "Iron";
  total: number | null;
}

export interface dish_dish_nutrition {
  __typename: "Nutrition";
  kcal: number | null;
  protein: dish_dish_nutrition_protein | null;
  carbs: dish_dish_nutrition_carbs | null;
  fat: dish_dish_nutrition_fat | null;
  starch: number | null;
  polyols: number | null;
  fibres: number | null;
  nitrogen: number | null;
  polysachhariden: number | null;
  alcohol: number | null;
  water: number | null;
  organicAcids: number | null;
  vitamins: dish_dish_nutrition_vitamins | null;
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
  iron: dish_dish_nutrition_iron | null;
  magnesium: number | null;
  fosfor: number | null;
  calcium: number | null;
  kalium: number | null;
  natrium: number | null;
  cholesterol: number | null;
  famstxr: number | null;
}

export interface dish_dish_method {
  __typename: "StepToMethod";
  step: number;
  method: string;
}

export interface dish_dish_recipes_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface dish_dish_recipes_recipe {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface dish_dish_recipes {
  __typename: "QuantityToRecipe";
  quantity: dish_dish_recipes_quantity;
  recipe: dish_dish_recipes_recipe;
}

export interface dish_dish {
  __typename: "Dish";
  id: string;
  type: string | null;
  comment: string | null;
  name: string;
  rating: number | null;
  theme: string | null;
  nutrition: dish_dish_nutrition | null;
  method: dish_dish_method[];
  recipes: dish_dish_recipes[] | null;
}

export interface dish {
  dish: dish_dish | null;
}

export interface dishVariables {
  id: string;
}
