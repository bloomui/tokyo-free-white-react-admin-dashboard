import { Grid, Autocomplete, TextField, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { H3 } from "src/content/pages/Components/TextTypes";
import { useSearchIngredientFilterQuery } from "src/content/pages/MyChefsbase/Ingredients/AddIngredient/api";
import { searchIngredient_searchIngredient } from "src/content/pages/MyChefsbase/Ingredients/AddIngredient/types/searchIngredient";
import {
  getUnitsForMaterial,
  units,
} from "src/content/pages/MyChefsbase/Recipes/AddRecipe/components/IngredientTable";
import { RecipeIngredientsForm } from "src/globalTypes";
import {
  composeValidators,
  required,
  mustBeNumber,
} from "src/utilities/formikValidators";

export const IngredientSelector = ({
  form,
  index,
  setFieldValue,
}: {
  form: RecipeIngredientsForm;
  index: number;
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
      <Grid xs={3}>
        <Autocomplete
          id="tags-standard"
          options={
            loading
              ? []
              : data &&
                data.searchIngredient &&
                data.searchIngredient.map((option) => option)
          }
          getOptionLabel={(option) => (option ? option.name : "")}
          onChange={(event, value: searchIngredient_searchIngredient) => {
            setIngredient(value);
            setFieldValue(`ingredients.${index}.id`, value.id);
            setFieldValue(`ingredients.${index}.name`, value.name);
          }}
          renderInput={(params) => (
            <TextField
              placeholder={form.name}
              {...params}
              onChange={(e) => {
                changeDelay(e.target.value);
              }}
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid xs={1}>Nieuw? Vul in:</Grid>
      <Grid xs={2}>
        {ingredient ? (
          <TextField disabled placeholder={ingredient.name} />
        ) : (
          <FormField name={`ingredients.${index}.name`} label="Naam" />
        )}
      </Grid>
      <Grid xs={1}></Grid>
      <Grid xs={2}>
        <FormField
          name={`ingredients.${index}.quantity`}
          label="Hoeveelheid"
          validator={composeValidators(required, mustBeNumber)}
        />
      </Grid>
      <Grid xs={2}>
        <FormikSelect
          validate={composeValidators(required)}
          name={`ingredients.${index}.unit`}
        >
          {ingredient
            ? getUnitsForMaterial(ingredient.material).map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))
            : units.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
        </FormikSelect>
      </Grid>
    </>
  );
};
