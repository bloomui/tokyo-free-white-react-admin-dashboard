import { Grid, Autocomplete, TextField, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { FormField, FormFieldEdit } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { H3 } from "src/content/pages/Components/TextTypes";
import { useSearchIngredientFilterQuery } from "src/content/pages/MyChefsbase/Ingredients/AddIngredient/api";
import { searchIngredient_searchIngredient } from "src/content/pages/MyChefsbase/Ingredients/AddIngredient/types/searchIngredient";
import { IngredientNamesForm, IngredientIdsForm, IngredientsForm } from "src/content/pages/MyChefsbase/Recipes/AddRecipe";
import {
  getUnitsForMaterial,
  units,
} from "src/content/pages/MyChefsbase/Recipes/AddRecipe/components/IngredientTable";
import { Material } from "src/globalTypes";
import {
  composeValidators,
  required,
  mustBeNumber,
} from "src/utilities/formikValidators";
import { getUnitsForUnit } from "../../../..";

export const IngredientSelectorNew = ({
  form,
  index,
  field,
  setFieldValue,
}: {
  form: IngredientNamesForm;
  index: number;
  field: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  return (
    <>
      <Grid xs={6}>
        <FormField name={`${field}.${index}.name`} label="Naam" />
      </Grid>
      <Grid xs={1}></Grid>
      <Grid xs={2}>
        <FormField
          name={`${field}.${index}.quantity`}
          label="Hoeveelheid"
        />
      </Grid>
      <Grid xs={2}>
        <FormikSelect
          name={`${field}.${index}.unit`}
        >
          {units.map((unit) => (
            <MenuItem key={unit} value={unit}>
              {unit}
            </MenuItem>
          ))}
        </FormikSelect>
      </Grid>
    </>
  );
};

export const EmptySearchIngredient = {
  __typename: "Ingredient",
  id: '',
  name: 'een moment geduld',
  material: Material.SOLID,
  status: '',
}
export const IngredientSelector = ({
  placeholder,
  index,
  setFieldValue,
  field,
  form
}: {
  placeholder?: string;
  form: IngredientsForm;
  index: number;
  field: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  const [name, setName] = useState("");

  const [ingredient, setIngredient] =
    useState<IngredientsForm>(form);
  const { data, loading, error, refetch } = useSearchIngredientFilterQuery({
    name: name,
  });
  const [timer, setTimer] = useState(null);

  function changeDelay(change) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setName(change);
        refetch({ ingredientname: name });
      }, 50)
    );
  }
  return (
    <>
      <Grid xs={6}>
        <Autocomplete
        defaultValue={placeholder}
          id="tags-standard"
          options={
            loading
              ? [EmptySearchIngredient]
              : data ? data.searchIngredient? data.searchIngredient.map((option) => option) : [EmptySearchIngredient] : [EmptySearchIngredient]
          }
          getOptionLabel={(option) => (option.name ? `${option.name} (${option?.status})` : placeholder)}
          onChange={(event, value: searchIngredient_searchIngredient) => {
            setIngredient({
              id: value? value.id : '',
              name: value? value.name : '',
              quantity: form.quantity,
              unit: form.unit,
            });
            setFieldValue(`${field}.${index}.id`, value ? value.id : "");
            setFieldValue(`${field}.${index}.name`, value ? value.name : "")
          }}
          renderInput={(params) => (
            <TextField
              placeholder={form? form.name : placeholder}
              {...params}
              onChange={(e) => {
                changeDelay(e.target.value);
              }}
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid xs={1}></Grid>
      <Grid xs={2}>
        <FormFieldEdit
          placeholder={form.quantity}
          name={`${field}.${index}.quantity`}
          label="Hoeveelheid"
          validator={composeValidators(required, mustBeNumber)}
        />
      </Grid>
      <Grid xs={2}>
        <FormikSelect
          placeholder={form.unit}
          validate={composeValidators(required)}
          name={`${field}.${index}.unit`}
        >
          {(ingredient.unit == "") ? units.map((unit) => (
            <MenuItem key={unit} value={unit}>
              {unit}
            </MenuItem>
          )) : getUnitsForUnit(ingredient.unit).map((unit) => (
            <MenuItem key={unit} value={unit}>
            {unit}
          </MenuItem>
        ))}
        </FormikSelect>
      </Grid>
    </>
  );
};

export const IngredientSelectorInventory1 = ({
  index,
  setFieldValue,
  placeholder,
  form,
}: {
  placeholder;
  index: number;
  form: IngredientsForm;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  const [name, setName] = useState("");

  const [ingredient, setIngredient] =
    useState<IngredientsForm>();
  const { data, loading, error, refetch } = useSearchIngredientFilterQuery({
    name: name,
  });

  const [timer, setTimer] = useState(null);

  function changeDelay(change) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setName(change);
        refetch({ ingredientname: name });
      }, 50)
    );
  }
  return (
    <>
      <Grid xs={12}>
        <Autocomplete
          id="tags-standard"
          options={
            loading
              ? [EmptySearchIngredient]
              : data ? data.searchIngredient? data.searchIngredient.map((option) => option) : [EmptySearchIngredient] : [EmptySearchIngredient]
          }
          getOptionLabel={(option) => (option.name ? `${option.name} (${option?.status})` : placeholder)}
          onChange={(event, value: searchIngredient_searchIngredient) => {
            setIngredient({
              id: value? value.id : '',
              name: value? value.name : '',
              quantity: form.quantity,
              unit: form.unit,
            });
            setFieldValue(`inputForm.${index}.ingredientid`, value ? value.id : "");
            setFieldValue(`inputForm.${index}.ingredientname`, value ? value.name : "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => {
                changeDelay(e.target.value);
              }}
              fullWidth
            />
          )}
        />
      </Grid>
    </>
  );
};

