/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IngredientFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: FilterIngredients
// ====================================================

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
  products: FilterIngredients_filterIngredients_products[] | null;
}

export interface FilterIngredients {
  numberOfIngredients: number | null;
  filterIngredients: FilterIngredients_filterIngredients[] | null;
}

export interface FilterIngredientsVariables {
  input?: IngredientFilterInput | null;
  offset?: number | null;
  limit?: number | null;
}
