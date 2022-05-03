/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IngredientFilterInput, Material } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: FilterIngredients
// ====================================================

export interface FilterIngredients_filterIngredients {
  __typename: "Ingredient";
  status: string | null;
  category: string | null;
  id: string;
  name: string;
  rating: number | null;
  material: Material;
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
