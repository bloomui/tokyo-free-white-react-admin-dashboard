/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DishFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: FilterDishes
// ====================================================

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
  comment: string | null;
  name: string;
  rating: number | null;
  theme: string | null;
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
