/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipeFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: FilterRecipes
// ====================================================

export interface FilterRecipes_filterRecipes_method {
  __typename: "StepToMethod";
  step: number;
  method: string;
}

export interface FilterRecipes_filterRecipes_ingredients_ingredient {
  __typename: "Ingredient";
  id: string;
  name: string;
}

export interface FilterRecipes_filterRecipes_ingredients_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface FilterRecipes_filterRecipes_ingredients {
  __typename: "QuantityToIngredient";
  ingredient: FilterRecipes_filterRecipes_ingredients_ingredient;
  quantity: FilterRecipes_filterRecipes_ingredients_quantity;
}

export interface FilterRecipes_filterRecipes {
  __typename: "Recipe";
  id: string;
  name: string;
  rating: number | null;
  type: string | null;
  method: FilterRecipes_filterRecipes_method[] | null;
  ingredients: FilterRecipes_filterRecipes_ingredients[] | null;
}

export interface FilterRecipes {
  filterRecipes: FilterRecipes_filterRecipes[] | null;
}

export interface FilterRecipesVariables {
  input?: RecipeFilterInput | null;
}
