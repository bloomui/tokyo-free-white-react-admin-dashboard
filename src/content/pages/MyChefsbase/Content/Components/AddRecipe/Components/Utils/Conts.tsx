import { IngredientIdsForm, IngredientNamesForm, RecipeFormIngredientsForm } from "src/content/pages/MyChefsbase/Recipes/AddRecipe";
import { RecipeIngredientsForm } from "src/globalTypes";


export const emptyIngredientEntry: RecipeIngredientsForm = {
  quantity: 0,
  unit: "",
  id: "",
  name: "",
};
export const emptyIngredientEntryForm: RecipeFormIngredientsForm = {
  quantity: "",
  unit: "",
  id: "",
  name: "",
};

export const emptyIngredientNamesEntryForm: IngredientNamesForm = {
  quantity: "",
  unit: "",
  name: "",
};

export const emptyIngredientIdsEntryForm: IngredientIdsForm = {
  quantity: "",
  unit: "",
  id: "",
};
