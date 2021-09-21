import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { Formik } from "formik";
import React from "react";
import { FormField } from "src/components/form/FormField";
import { DishInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAllRecipesQuery, useUpdateDish } from "../api";
import { FilterDishes, FilterDishes_filterDishes } from "../types/FilterDishes";
import { UpdateDishVariables } from "../types/UpdateDish";

export const UpdateDishDialog = ({
    dish,
    open,
    onClose,
}: {
    dish: FilterDishes_filterDishes,
    open: boolean,
    onClose: () => void
}) => {
  const {data} = useAllRecipesQuery()


    const { updateDish, loading, error } = useUpdateDish({
        onCompleted: () => window.location.reload(),
      });

    const formInput: DishInput = {
        id: dish.id,
        name: dish.name,
        rating: dish.rating,
        comment: dish.comment,
        theme: dish.theme,
    }
    const formRecipes: QuantityToId[] | null = (dish.recipes? (dish.recipes.map((quantityToRecipe) => (
            {
                quantity: quantityToRecipe.quantity.quantity,
                unit: quantityToRecipe.quantity.unit,
                id: quantityToRecipe.recipe.id,
            }
    )
    )) : null)

    const formMethods: StepToMethodInput[] | null = (dish.method? (dish.method.map((method) => (
        {
            step: method.step,
            method: method.method,
        }
)
)) : null)

const formState : UpdateDishVariables = {
        input: formInput,
        recipes: formRecipes,
        method: formMethods
    }

    return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateDish({
            variables: {
                method: values.method,
                recipes: values.recipes,
                input: {
                id: dish.id,
                name: values.input.name,
                rating: values.input.rating,
                comment: values.input.comment,
                theme: values.input.theme,
              },
            },
          });
        }}
      >
        {({ submitForm, setFieldValue }) => {
          return (
            <>
              <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">
                Gerecht Aanpassen
              </DialogTitle>
              <DialogContent>
                <FormField
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                <FormField
                  name="input.comment"
                  label="Opmerking"
                />
                <FormField
                  name="input.theme"
                  label="Thema"
                />
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                Recepten:
                {dish.recipes?.map((quantityToRecipe, index) => (
                    <>
                    {quantityToRecipe.recipe.name}
                    {data && (
                        <>
                        <Autocomplete
                multiple
                id="tags-standard"
                options={data.recipes.map((option) => (option))}
                getOptionLabel={(option) => option.name}
                onChange={(event,  values) => setFieldValue(`recipes.${index}.id`, values.map((option) => option))}
                renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Gerechten"
                />
                )}
                />
                        </>
                    )} 
                </>
                ))}
                {error && (
                  <Typography color="error">
                    Er is een fout opgetreden, probeer het opnieuw.
                  </Typography>
                )}
              </DialogContent>

              <DialogActions>
                <Button disabled={loading} onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => submitForm()}
                  color="primary"
                >
                  Gegevens toevoegen
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};