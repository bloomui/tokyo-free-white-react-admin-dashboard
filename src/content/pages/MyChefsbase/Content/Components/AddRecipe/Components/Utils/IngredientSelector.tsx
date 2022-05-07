import { Grid, Autocomplete, TextField, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { FormField, FormFieldEdit } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { H3 } from "src/content/pages/Components/TextTypes";
import { useSearchIngredientFilterQuery } from "src/content/pages/MyChefsbase/Ingredients/AddIngredient/api";
import { searchIngredient_searchIngredient } from "src/content/pages/MyChefsbase/Ingredients/AddIngredient/types/searchIngredient";
import { IngredientNamesForm, IngredientIdsForm } from "src/content/pages/MyChefsbase/Recipes/AddRecipe";
import {
  getUnitsForMaterial,
  units,
} from "src/content/pages/MyChefsbase/Recipes/AddRecipe/components/IngredientTable";
import {
  composeValidators,
  required,
  mustBeNumber,
} from "src/utilities/formikValidators";

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

export const IngredientSelector = ({
  q,
  u,
  placeholder,
  form,
  index,
  setFieldValue,
  field,
}: {
  q?: string;
  u?: string;
  placeholder?: string;
  form: IngredientIdsForm;
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
    useState<searchIngredient_searchIngredient>();
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
        defaultValue={placeholder || ''}
          id="tags-standard"
          options={
            loading
              ? []
              : data &&
                data.searchIngredient &&
                data.searchIngredient.map((option) => option)
          }
          getOptionLabel={(option) => (option ? option.name ? placeholder : "" : "")}
          onChange={(event, value: searchIngredient_searchIngredient) => {
            setIngredient(value);
            setFieldValue(`${field}.${index}.id`, value.id);
          }}
          renderInput={(params) => (
            <TextField
              placeholder={placeholder}
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
          placeholder={q}
          name={`${field}.${index}.quantity`}
          label="Hoeveelheid"
          validator={composeValidators(required, mustBeNumber)}
        />
      </Grid>
      <Grid xs={2}>
        <FormikSelect
          placeholder={u}
          validate={composeValidators(required)}
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
