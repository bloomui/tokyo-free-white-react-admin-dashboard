import { NewIngredientInput, QuantityToId } from "src/globalTypes";

export const emptyNewIngredientEntry: NewIngredientInput = {
  quantity: 0,
  unit: "",
  name: "",
};

export const emptyIngredientEntry: QuantityToId = {
  quantity: 0,
  unit: "",
  id: "",
};
