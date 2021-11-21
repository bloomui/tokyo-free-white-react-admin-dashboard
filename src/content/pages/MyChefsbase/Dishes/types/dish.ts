/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: dish
// ====================================================

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
  method: dish_dish_method[] | null;
  recipes: dish_dish_recipes[] | null;
}

export interface dish {
  dish: dish_dish | null;
}

export interface dishVariables {
  id: string;
}
