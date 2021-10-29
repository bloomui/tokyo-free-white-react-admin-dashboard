/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IngredientFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: FilterIngredients
// ====================================================

export interface FilterIngredients_filterIngredients_nutrition_vitamins {
  __typename: "Vitamins";
  c: number | null;
  e: number | null;
  dTotal: number | null;
  kTotal: number | null;
}

export interface FilterIngredients_filterIngredients_nutrition_carbs {
  __typename: "Carbs";
  carbs: number | null;
  sugar: number | null;
}

export interface FilterIngredients_filterIngredients_nutrition_protein {
  __typename: "Proteins";
  total: number | null;
}

export interface FilterIngredients_filterIngredients_nutrition_fat {
  __typename: "Fats";
  total: number | null;
}

export interface FilterIngredients_filterIngredients_nutrition {
  __typename: "Nutrition";
  vitamins: FilterIngredients_filterIngredients_nutrition_vitamins | null;
  carbs: FilterIngredients_filterIngredients_nutrition_carbs | null;
  protein: FilterIngredients_filterIngredients_nutrition_protein | null;
  fat: FilterIngredients_filterIngredients_nutrition_fat | null;
  kcal: number | null;
}

export interface FilterIngredients_filterIngredients_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface FilterIngredients_filterIngredients {
  __typename: "Ingredient";
  category: string | null;
  id: string;
  name: string;
  rating: number | null;
  nutrition: FilterIngredients_filterIngredients_nutrition | null;
  products: FilterIngredients_filterIngredients_products[] | null;
}

export interface FilterIngredients {
  filterIngredients: FilterIngredients_filterIngredients[] | null;
}

export interface FilterIngredientsVariables {
  input?: IngredientFilterInput | null;
}
