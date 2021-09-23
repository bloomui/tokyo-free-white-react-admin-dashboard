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

const formInput: ProductInput = {
  price: 0,
  brand: '',
  origin: '',
  id: '',
  name: '',
  rating: 0,
}
const formState : UpdateProductVariables = {
  input: formInput,
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
                    Leveranciers:
                <FieldArray
                name="suppliers"
                render={arrayHelpers => (
                <div>
                    {data && (
                        <>

                 {values.suppliers?.map((supplier, index) => (
                     <div key={index}>
                         <FormikSelect 
                         title="Leverancier"
                         name={`suppliers.${index}.id`}
                         >
                             {data.suppliers.map((supplier) => (
                      <MenuItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
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