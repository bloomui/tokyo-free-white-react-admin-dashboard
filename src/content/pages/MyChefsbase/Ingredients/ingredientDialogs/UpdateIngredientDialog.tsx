import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { RecipeInput, QuantityToId, StepToMethodInput, DishInput, AddIngredientInput, IngredientInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { initialValues } from "../../Dishes/filterdishes";
import { UpdateDishVariables } from "../../Dishes/types/UpdateDish";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAllProductsQuery, useUpdateIngredient } from "../api";
import { AddIngredientVariables } from "../types/AddIngredient";
import { FilterIngredients_filterIngredients } from "../types/FilterIngredients";
import { UpdateIngredient, UpdateIngredientVariables } from "../types/UpdateIngredient";

export const UpdateIngredientDialog = ({
    ingredient,
    open,
    onClose,
}: {
  ingredient: FilterIngredients_filterIngredients,
    open: boolean,
    onClose: () => void
}) => {
  const {data} = useAllProductsQuery()


    const { updateIngredient, loading, error } = useUpdateIngredient({
        onCompleted: () => window.location.reload(),
      });

const formInput: IngredientInput = {
  id: '',
  name: '',
  rating: 0,
}
const formState : UpdateIngredientVariables = {
  input: formInput,
  products: [],
}

    return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateIngredient({
            variables: {
                products: values.products,
                input: {
                id: ingredient.id,
                name: values.input.name,
                rating: values.input.rating,
              },
            },
          });
        }}
      >
        {({ values, submitForm, setFieldValue, handleChange }) => {
          return (
            <>
              <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">
                Ingredient Aanpassen
              </DialogTitle>
              <DialogContent>
                <FormField
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                <Grid container xs={12}>
                    <Grid item xs={12}>
                    Producten:
                <FieldArray
                name="recipes"
                render={arrayHelpers => (
                <div>
                    {data && (
                        <>

                 {values.products?.map((product, index) => (
                     <div key={index}>
                         <FormikSelect 
                         title="Recept"
                         name={`recipes.${index}.id`}
                         >
                             {data.products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    ))}
                             </FormikSelect>
                     </div>
                   ))}
                   </>
                    )}
                </div>
                )}
                />
                </Grid>
                </Grid> 
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