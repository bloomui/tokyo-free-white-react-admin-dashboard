/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ingredientsForRecipe
// ====================================================

export interface ingredientsForRecipe_ingredientsForRecipe_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface ingredientsForRecipe_ingredientsForRecipe_ingredient {
  __typename: "Ingredient";
  id: string;
  name: string;
}

export interface ingredientsForRecipe_ingredientsForRecipe {
  __typename: "QuantityToIngredient";
  quantity: ingredientsForRecipe_ingredientsForRecipe_quantity;
  ingredient: ingredientsForRecipe_ingredientsForRecipe_ingredient;
}

export interface ingredientsForRecipe {
  ingredientsForRecipe: ingredientsForRecipe_ingredientsForRecipe[] | null;
}

export interface ingredientsForRecipeVariables {
  id: string;
  quantity: number;
  unit: string;
}
