import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { AddProductInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddProduct, useAllSuppliersQuery } from "../api";
import { AddProductVariables } from "../types/AddProduct";
import { AllSuppliers_suppliers } from "../types/AllSuppliers";

export const AddProductDialog = ({
    open,
    onClose,
}: {
    open: boolean,
    onClose: () => void
}) => {

  const {data} = useAllSuppliersQuery()

    const [stepHere, setStep] = useState(1)

    const { addProduct, loading, error } = useAddProduct({
        onCompleted: () => {window.location.reload()},
      });

    const formInput: AddProductInput = {
        brand: '',
        origin: '',
        name: '',
        rating: 0,
    }
const formState : AddProductVariables = {
        input: formInput,
        suppliers: [],
    }

    return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          addProduct({
            variables: {
                suppliers: values.suppliers,
                input: {
                name: values.input.name,
                brand: values.input.brand,
                origin: values.input.origin,
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
                Voeg Product toe
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