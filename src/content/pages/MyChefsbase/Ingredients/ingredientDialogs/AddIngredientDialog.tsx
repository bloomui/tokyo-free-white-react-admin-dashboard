import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { AddDishInput, AddIngredientInput, AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddIngredient, useAllProductsQuery } from "../api";
import { AddIngredientVariables } from "../types/AddIngredient";

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