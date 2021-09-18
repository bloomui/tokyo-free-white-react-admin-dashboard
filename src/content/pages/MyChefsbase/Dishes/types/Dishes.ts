/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DishFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: Dishes
// ====================================================

export interface Dishes_filterDishes_method {
  __typename: "StepToMethod";
  step: number;
  method: string;
}

export interface Dishes_filterDishes_recipes_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface Dishes_filterDishes_recipes_recipe {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface Dishes_filterDishes_recipes {
  __typename: "QuantityToRecipe";
  quantity: Dishes_filterDishes_recipes_quantity;
  recipe: Dishes_filterDishes_recipes_recipe;
}

export interface Dishes_filterDishes {
  __typename: "Dish";
  id: string;
  comment: string | null;
  name: string;
  rating: number | null;
  theme: string | null;
  method: Dishes_filterDishes_method[] | null;
  recipes: Dishes_filterDishes_recipes[] | null;
}

export interface Dishes_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
}

export interface Dishes_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface Dishes_ingredients {
  __typename: "Ingredient";
  id: string;
  name: string;
}

export interface Dishes_recipes {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface Dishes_menus {
  __typename: "NewMenu";
  id: string;
  name: string;
}

export interface Dishes {
  allThemes: string[] | null;
  allTypes: string[] | null;
  filterDishes: Dishes_filterDishes[] | null;
  suppliers: Dishes_suppliers[] | null;
  products: Dishes_products[] | null;
  ingredients: Dishes_ingredients[] | null;
  recipes: Dishes_recipes[] | null;
  menus: Dishes_menus[] | null;
}

export interface DishesVariables {
  input?: DishFilterInput | null;
}
