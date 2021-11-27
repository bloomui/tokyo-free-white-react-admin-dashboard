/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IngredientsForMenu
// ====================================================

export interface IngredientsForMenu_ingredientsForMenu_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface IngredientsForMenu_ingredientsForMenu_ingredient_products_price_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface IngredientsForMenu_ingredientsForMenu_ingredient_products_price {
  __typename: "PricePerQuantity";
  price: number | null;
  quantity: IngredientsForMenu_ingredientsForMenu_ingredient_products_price_quantity | null;
}

export interface IngredientsForMenu_ingredientsForMenu_ingredient_products {
  __typename: "Product";
  id: string;
  name: string;
  price: IngredientsForMenu_ingredientsForMenu_ingredient_products_price | null;
}

export interface IngredientsForMenu_ingredientsForMenu_ingredient {
  __typename: "Ingredient";
  id: string;
  name: string;
  products: IngredientsForMenu_ingredientsForMenu_ingredient_products[] | null;
}

export interface IngredientsForMenu_ingredientsForMenu {
  __typename: "QuantityToIngredient";
  quantity: IngredientsForMenu_ingredientsForMenu_quantity;
  ingredient: IngredientsForMenu_ingredientsForMenu_ingredient;
}

export interface IngredientsForMenu {
  ingredientsForMenu: IngredientsForMenu_ingredientsForMenu[] | null;
}

export interface IngredientsForMenuVariables {
  id: string;
}
