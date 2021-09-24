import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { AddProductInput, AddSupplierInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAllSuppliersQuery } from "../../Products/api";
import { useAddSupplier } from "../api";
import { AddSupplierVariables } from "../types/AddSupplier";

export const AddSupplierDialog = ({
    open,
    onClose,
}: {
    open: boolean,
    onClose: () => void
}) => {

    const { addSupplier, loading, error } = useAddSupplier({
        onCompleted: () => {window.location.reload()},
      });

    const formInput: AddSupplierInput = {
        email: '',
        name: '',
        rating: 0,
    }
const formState : AddSupplierVariables = {
        input: formInput,
    }

    return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          addSupplier({
            variables: {
                input: {
                name: values.input.name,
                email: values.input.email,
              },
            },
          });
        }}
      >
        {({ values, handleChange, submitForm, setFieldValue }) => {
          return (
            <>
              <DialogTitle id="form-dialog-title">
                Voeg Leverancier toe
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