/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DishFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: FilterDishes
// ====================================================

export interface FilterDishes_filterDishes_nutrition_protein {
  __typename: "Proteins";
  total: number | null;
}

export interface FilterDishes_filterDishes_nutrition_carbs {
  __typename: "Carbs";
  carbs: number | null;
  sugar: number | null;
}

export interface FilterDishes_filterDishes_nutrition_fat {
  __typename: "Fats";
  satured: number | null;
  singleUnsat: number | null;
  compoundUnsat: number | null;
  total: number | null;
}

export interface FilterDishes_filterDishes_nutrition {
  __typename: "Nutrition";
  kcal: number | null;
  protein: FilterDishes_filterDishes_nutrition_protein | null;
  carbs: FilterDishes_filterDishes_nutrition_carbs | null;
  fibres: number | null;
  fat: FilterDishes_filterDishes_nutrition_fat | null;
}

export interface FilterDishes_filterDishes_method {
  __typename: "StepToMethod";
  step: number;
  method: string;
}

export interface FilterDishes_filterDishes_recipes_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface FilterDishes_filterDishes_recipes_recipe {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface FilterDishes_filterDishes_recipes {
  __typename: "QuantityToRecipe";
  quantity: FilterDishes_filterDishes_recipes_quantity;
  recipe: FilterDishes_filterDishes_recipes_recipe;
}

export interface FilterDishes_filterDishes {
  __typename: "Dish";
  id: string;
  type: string | null;
  comment: string | null;
  name: string;
  rating: number | null;
  theme: string | null;
  nutrition: FilterDishes_filterDishes_nutrition | null;
  method: FilterDishes_filterDishes_method[] | null;
  recipes: FilterDishes_filterDishes_recipes[] | null;
}

export interface FilterDishes {
  numberOfDishes: number | null;
  filterDishes: FilterDishes_filterDishes[] | null;
}

export interface FilterDishesVariables {
  input?: DishFilterInput | null;
  limit?: number | null;
  offset?: number | null;
}
