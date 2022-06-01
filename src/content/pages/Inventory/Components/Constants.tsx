import { InventoryForm } from "src/globalTypes";

export const emptyInventoryForm: InventoryInputForm = {
  ingredientid: "",
  ingredientname: "",
  quantity: "",
  unit: "",
  brand: "",
  price: "",
  expiration: "",
  rating: "",
  origin: "",
  number: "",
};
export const inputInventory = {
  inputForm: [emptyInventoryForm],
};

export type InventoryInputForm = {
  ingredientid: string;
  ingredientname: string;
  quantity: string;
  unit: string;
  brand: string;
  price: string;
  expiration: string;
  rating: string;
  origin: string;
  number: string;
};

export const toInput = (input: InventoryInputForm[]): InventoryForm[] => {
  const result: InventoryForm[] = input.map((i) => ({
    ingredientid: i.ingredientid,
    quantity: Number(i.quantity),
    ingredientname: i.ingredientname,
    unit: i.unit,
    brand: i.brand,
    price: Number(i.price),
    expiration: i.expiration,
    rating: Number(i.rating),
    origin: i.origin,
    number: Number(i.number),
  }));
  return result;
};

export const emptyFormToNumber = {
  form: emptyInventoryForm,
  number: 0,
};
export type InventoryFormToNumber = {
  form: InventoryInputForm;
  number: number;
};

export type EditInventoryForm = {
  number: number;
  delete: boolean;
  index: number;
};
