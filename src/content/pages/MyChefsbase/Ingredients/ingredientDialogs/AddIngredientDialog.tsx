import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { AddDishInput, AddIngredientInput, AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddIngredient, useAllProductsQuery } from "../api";
import { AddIngredientVariables } from "../types/AddIngredient";
import { allProducts_products } from "../types/AllProducts";

export const AddIngredientDialog = ({
    open,
    onClose,
}: {
    open: boolean,
    onClose: () => void
}) => {

  const {data} = useAllProductsQuery()

    const [stepHere, setStep] = useState(1)

    const { addIngredient, loading, error } = useAddIngredient({
        onCompleted: () => {window.location.reload()},
      });

    const formInput: AddIngredientInput = {
        name: '',
        rating: 0,
    }
const formState : AddIngredientVariables = {
        input: formInput,
        products: [],
    }

    return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          addIngredient({
            variables: {
                products: values.products,
                input: {
                name: values.input.name,
                rating: values.input.rating
              },
            },
          });
        }}
      >
        {({ values, handleChange, submitForm, setFieldValue }) => {
          return (
            <>
              <DialogTitle id="form-dialog-title">
                Voeg Ingredient toe
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