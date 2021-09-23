import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { AddProductInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddProduct, useAllSuppliersQuery } from "../api";
import { AddProductVariables } from "../types/AddProduct";

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
                  name="input.price"
                  label="Prijs"
                  validator={composeValidators(required)}
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