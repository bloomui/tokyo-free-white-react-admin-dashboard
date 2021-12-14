import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField, FormFieldEdit } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { RecipeInput, QuantityToId, StepToMethodInput, DishInput, AddIngredientInput, IngredientInput, ProductInput, SupplierInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { initialValues } from "../../Dishes/filterdishes";
import { UpdateDishVariables } from "../../Dishes/types/UpdateDish";
import { Rating1, RatingEdit } from "../../Menus/filtermenus/components/rating";
import { useUpdateSupplier } from "../api";
import { FilterSuppliers_filterSuppliers } from "../types/FilterSuppliers";
import { UpdateSupplierVariables } from "../types/UpdateSupplier";

export const UpdateSupplierDialog = ({
  supplier,
    open,
    onClose,
}: {
  supplier: FilterSuppliers_filterSuppliers,
    open: boolean,
    onClose: () => void
}) => {

    const { updateSupplier, loading, error } = useUpdateSupplier({
        onCompleted: () => window.location.reload(),
      });

const formInput: SupplierInput = {
  email: supplier.email,
  id: supplier.id,
  name: supplier.name,
  rating: supplier.rating,
}
const formState : UpdateSupplierVariables = {
  input: formInput,
}

    return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateSupplier({
            variables: {
                input: {
                  email: values.input.email,
                id: supplier.id,
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
                Leverancier Aanpassen
              </DialogTitle>
              <DialogContent>
                <FormFieldEdit
                  placeholder={supplier.name}
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                <RatingEdit
                defaultNumber={supplier.rating}
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                <FormFieldEdit
                  placeholder={supplier.email}
                  name="input.email"
                  label="Email"
                  validator={composeValidators(required)}
                />
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