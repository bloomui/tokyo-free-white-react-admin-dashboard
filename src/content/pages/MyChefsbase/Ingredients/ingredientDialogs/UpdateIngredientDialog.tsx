import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { RecipeInput, QuantityToId, StepToMethodInput, DishInput, AddIngredientInput, IngredientInput, QuantityToNutritionInput, NutritionInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { initialValues } from "../../Dishes/filterdishes";
import { UpdateDishVariables } from "../../Dishes/types/UpdateDish";
import { Products } from "../../Menus/filtermenus/components/products";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAllProductsQuery, useUpdateIngredient } from "../api";
import { AddIngredientVariables } from "../types/AddIngredient";
import { allProducts_products } from "../types/AllProducts";
import { FilterIngredients_filterIngredients } from "../types/FilterIngredients";
import { UpdateIngredient, UpdateIngredientVariables } from "../types/UpdateIngredient";

export const units = ["grams", "mililiter"]

export const emptyNutrition: NutritionInput = {
  kcal: 0,
  prottotal: 0,
  fatstotal: 0,
  carbscarbs: 0,
  carbssugar: 0,
  fibres: 0
}
export const emptyQuantityToNutrition: QuantityToNutritionInput = {
  quantity: 0,
  unit: '',
  nutrition: emptyNutrition
}
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
  category: '',
  nutrition: emptyQuantityToNutrition,
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
                category: values.input.category,
                rating: values.input.rating,
                nutrition: values.input.nutrition
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
                <FormField
                  name="input.category"
                  label="Categorie"
                />
                <Grid container xs={12}>
                    <Grid item xs={12}>
                    Producten:
                    {data.products && (
                    <Autocomplete
                    multiple
                    id="tags-standard"
                    options={data.products.map((option) => (option))}
                    getOptionLabel={(option) => option? option.name : ""}
                    onChange={(event,  values: allProducts_products[]) => setFieldValue("products", values.map((option) => option.id))}
                    renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Producten"
                />
                )}
                />
                )}
                </Grid>
                </Grid> 
                Voedingswaaarde:
                <Grid container xs={12}>
                <Grid item xs={3}> 
                Per:
                </Grid>
                  <Grid item xs={6}> 
                  <FormField
                  name="input.nutrition.quantity"
                  label="Hoeveelheid"
                  validator={composeValidators(required)}
                />
                  </Grid>
                  <Grid item xs={3}> 
                  <FormikSelect
                      name="input.nutrition.unit"
                      >
              {units.map((unit) => (
                <MenuItem key={unit} value={unit}>{unit}</MenuItem>
              ))}
            </FormikSelect>
                  </Grid>
                  <Table size="small">
                    <TableRow>
                      <TableCell>Kilocalorieën</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.kcal"
                  label="Kcal"
                /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Eiwitten</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.prottotal"
                  label="Eiwitten"
                /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Koolhydraten</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.carbscarbs"
                  label="Koolhydraten"
                /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Suikers</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.carbssugar"
                  label="Suikers"
                /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vetten</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.fatstotal"
                  label="Vetten"
                /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vezels</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.fibres"
                  label="Vezels"
                /></TableCell>
                    </TableRow>
                  </Table>
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