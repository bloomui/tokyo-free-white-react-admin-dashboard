/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum KitchenType {
  Course = "Course",
  Dish = "Dish",
  Ingredient = "Ingredient",
  Menu = "Menu",
  Product = "Product",
  Recipe = "Recipe",
  Supplier = "Supplier",
}

export enum Material {
  LIQUID = "LIQUID",
  SOLID = "SOLID",
  UNIT = "UNIT",
}

export interface AddCourseToDishesInput {
  coursetype: string;
  dishes?: string[] | null;
}

export interface AddDishInput {
  name: string;
  rating?: number | null;
  type?: string | null;
  theme?: string | null;
  comment?: string | null;
}

export interface AddIngredientInput {
  name: string;
  rating?: number | null;
  category?: string | null;
  nutrition?: QuantityToNutritionInput | null;
  material: Material;
  status?: string | null;
}

export interface AddMenuInput {
  name: string;
  rating?: number | null;
  season?: string | null;
  theme?: string | null;
  periodstartdate?: string | null;
  periodenddate?: string | null;
}

export interface AddProductInput {
  name: string;
  price?: number | null;
  quantity?: number | null;
  unit?: string | null;
  brand?: string | null;
  rating?: number | null;
  origin?: string | null;
}

export interface AddRecipeInput {
  name: string;
  rating?: number | null;
  type?: string | null;
  quantity?: number | null;
  unit?: string | null;
}

export interface AddSupplierInput {
  name: string;
  email?: string | null;
  rating?: number | null;
}

export interface DishFilterInput {
  suppliers?: string[] | null;
  products?: string[] | null;
  ingredients?: string[] | null;
  recipes?: string[] | null;
  rating?: number | null;
  menus?: string[] | null;
  types?: string[] | null;
  themes?: string[] | null;
  comment?: string[] | null;
  course?: string[] | null;
  name?: string | null;
}

export interface DishInput {
  id: string;
  name: string;
  rating?: number | null;
  type?: string | null;
  theme?: string | null;
  comment?: string | null;
}

export interface IngredientFilterInput {
  suppliers?: string[] | null;
  products?: string[] | null;
  recipes?: string[] | null;
  dishes?: string[] | null;
  categories?: string[] | null;
  rating?: number | null;
  menus?: string[] | null;
  name?: string | null;
  exact: number;
}

export interface IngredientInput {
  id: string;
  name: string;
  rating?: number | null;
  category?: string | null;
  nutrition?: QuantityToNutritionInput | null;
  material: Material;
  status?: string | null;
}

export interface MenuFilterInput {
  suppliers?: string[] | null;
  products?: string[] | null;
  ingredients?: string[] | null;
  recipes?: string[] | null;
  rating?: number | null;
  dishes?: string[] | null;
  type?: string[] | null;
  themes?: string[] | null;
  periodstartdate?: string | null;
  periodenddate?: string | null;
  seasons?: string[] | null;
  name?: string | null;
}

export interface MenuInput {
  id: string;
  name: string;
  rating?: number | null;
  season?: string | null;
  theme?: string | null;
  periodstartdate?: string | null;
  periodenddate?: string | null;
}

export interface NutritionInput {
  kcal?: number | null;
  carbscarbs?: number | null;
  carbssugar?: number | null;
  fatstotal?: number | null;
  fatsfacid?: number | null;
  fatstotalfacid?: number | null;
  fatssatured?: number | null;
  fatssingleUnsat?: number | null;
  fatscompoundUnsat?: number | null;
  fatsn3?: number | null;
  fatsn6?: number | null;
  fatsother?: number | null;
  protplant?: number | null;
  protanimal?: number | null;
  prottotal?: number | null;
  starch?: number | null;
  polyols?: number | null;
  fibres?: number | null;
  nitrogen?: number | null;
  polysachhariden?: number | null;
  alcohol?: number | null;
  water?: number | null;
  organicAcids?: number | null;
  vite?: number | null;
  vitc?: number | null;
  vitkTotal?: number | null;
  vitb12?: number | null;
  vitb6?: number | null;
  vitb2?: number | null;
  vitb1?: number | null;
  vitk2?: number | null;
  vitk1?: number | null;
  vitcholecalciferolE?: number | null;
  vithidro25D?: number | null;
  vitdTotal?: number | null;
  foliumAcid?: number | null;
  pholate?: number | null;
  pholatEquivalents?: number | null;
  nicotinAcid?: number | null;
  tocoalfa?: number | null;
  tocobeta?: number | null;
  tocogamma?: number | null;
  tocodelta?: number | null;
  lycopeans?: number | null;
  betaCrypto?: number | null;
  zeacanthine?: number | null;
  lutein?: number | null;
  caralfa?: number | null;
  carbeta?: number | null;
  retrae?: number | null;
  retre?: number | null;
  rettotal?: number | null;
  ash?: number | null;
  jodium?: number | null;
  sink?: number | null;
  selenium?: number | null;
  cupper?: number | null;
  irontotal?: number | null;
  ironnonhaem?: number | null;
  ironhaem?: number | null;
  magnesium?: number | null;
  fosfor?: number | null;
  calcium?: number | null;
  kalium?: number | null;
  natrium?: number | null;
  cholesterol?: number | null;
  famstxr?: number | null;
}

export interface ProductFilterInput {
  suppliers?: string[] | null;
  ingredients?: string[] | null;
  recipes?: string[] | null;
  dishes?: string[] | null;
  brands?: string[] | null;
  origins?: string[] | null;
  maxPrice?: number | null;
  minPrice?: number | null;
  rating?: number | null;
  menus?: string[] | null;
  name?: string | null;
}

export interface ProductInput {
  id: string;
  name: string;
  price?: number | null;
  quantity?: number | null;
  unit?: string | null;
  brand?: string | null;
  rating?: number | null;
  origin?: string | null;
}

export interface QuantityToId {
  id: string;
  quantity: number;
  unit: string;
}

export interface QuantityToNutritionInput {
  quantity: number;
  unit: string;
  nutrition: NutritionInput;
}

export interface RecipeFilterInput {
  suppliers?: string[] | null;
  products?: string[] | null;
  ingredients?: string[] | null;
  dishes?: string[] | null;
  rating?: number | null;
  menus?: string[] | null;
  types?: string[] | null;
  name?: string | null;
}

export interface RecipeIngredients {
  name?: string | null;
  quantity: number;
  unit: string;
  status?: string | null;
}

export interface RecipeIngredientsForm {
  id?: string | null;
  name?: string | null;
  quantity: number;
  unit: string;
  status?: string | null;
}

export interface RecipeInput {
  id: string;
  name: string;
  rating?: number | null;
  type?: string | null;
  quantity?: number | null;
  unit?: string | null;
}

export interface StepToMethodInput {
  step: number;
  method: string;
}

export interface SupplierFilterInput {
  products?: string[] | null;
  ingredients?: string[] | null;
  dishes?: string[] | null;
  rating?: number | null;
  menus?: string[] | null;
  name?: string | null;
  recipes?: string[] | null;
}

export interface SupplierInput {
  id: string;
  name: string;
  email?: string | null;
  rating?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
