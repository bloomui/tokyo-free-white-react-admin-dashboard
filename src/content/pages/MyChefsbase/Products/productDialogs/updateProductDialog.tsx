import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { RecipeInput, QuantityToId, StepToMethodInput, DishInput, AddIngredientInput, IngredientInput, ProductInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { initialValues } from "../../Dishes/filterdishes";
import { UpdateDishVariables } from "../../Dishes/types/UpdateDish";
import { useAllProductsQuery } from "../../Ingredients/api";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAllSuppliersQuery, useUpdateProduct } from "../api";
import { AllSuppliers_suppliers } from "../types/AllSuppliers";
import { FilterProducts_filterProducts } from "../types/FilterProducts";
import { UpdateProductVariables } from "../types/UpdateProduct";

export const UpdateProductDialog = ({
  product,
    open,
    onClose,
}: {
  product: FilterProducts_filterProducts,
    open: boolean,
    onClose: () => void
}) => {
  const {data} = useAllSuppliersQuery()


    const { updateProduct, loading, error } = useUpdateProduct({
        onCompleted: () => window.location.reload(),
      });
type ProductFormInput = {
  price: string,
  brand: string,
  origin: string,
  id: string,
  name: string,
  rating: string,
}

const formInput: ProductFormInput = {
  price: '',
  brand: '',
  origin: '',
  id: '',
  name: '',
  rating: '',
}

const mapProductInput = (formInput: ProductFormInput) => {
  const mapped: ProductInput = {
    price: Number(formInput.price),
    brand: formInput.brand,
    origin: formInput.origin,
    id: formInput.id,
    name: formInput.name,
    rating: Number(formInput.rating)
  }
  return mapped
}

const formState : UpdateProductVariables = {
  input: mapProductInput(formInput),
  suppliers: [],
}

    return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateProduct({
            variables: {
                suppliers: values.suppliers,
                input: {
                  brand: values.input.brand,
                  origin: values.input.origin,
                  price: values.input.price,
                id: product.id,
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
                Product Aanpassen
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
                  name="input.brand"
                  label="Merk"
                  validator={composeValidators(required)}
                />
                <FormField
                  name="input.origin"
                  label="Herkomst"
                  validator={composeValidators(required)}
                />
                    <Grid container xs={12}>
                    <Grid item xs={12}>
                    Leveranciers:
                    {data.suppliers && (
                    <Autocomplete
                    multiple
                    id="tags-standard"
                    options={data.suppliers.map((option) => (option))}
                    getOptionLabel={(option) => option? option.name : ""}
                    onChange={(event,  values: AllSuppliers_suppliers[]) => setFieldValue("suppliers", values.map((option) => option.id))}
                    renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Leveranciers"
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