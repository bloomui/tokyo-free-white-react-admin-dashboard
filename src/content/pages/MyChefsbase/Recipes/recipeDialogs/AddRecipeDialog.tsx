import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { AddDishInput, AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddRecipe, useAllIngredientsQuery } from "../api";
import { AddRecipeVariables } from "../types/AddRecipe";

export const AddRecipeDialog = ({
    open,
    onClose,
}: {
    open: boolean,
    onClose: () => void
}) => {

  const {data} = useAllIngredientsQuery()

    const [stepHere, setStep] = useState(1)

    const { addRecipe, loading, error } = useAddRecipe({
        onCompleted: () => {window.location.reload()},
      });

    const formInput: AddRecipeInput = {
        name: '',
        rating: 0,
        type: '',
    }
    const emptyIngredientEntry: QuantityToId = {
        quantity: 0,
        unit: '',
        id: '',
        }
    const emptyStep: StepToMethodInput = {
            step: stepHere,
            method: ''
            }
    
    const formIngredients: QuantityToId[] | null = [emptyIngredientEntry]
        
    const formMethods: StepToMethodInput[] | null = [
        emptyStep
    ]

const formState : AddRecipeVariables = {
        input: formInput,
        ingredients: formIngredients,
        method: formMethods
    }

    return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          addRecipe({
            variables: {
                method: values.method,
                ingredients: values.ingredients,
                input: {
                type: values.input.type,
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
                Voeg Recept toe
              </DialogTitle>
              <DialogContent>
                <FormField
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                <FormField
                  name="input.comment"
                  label="Opmerking"
                />
                <FormField
                  name="input.type"
                  label="Type"
                />
                <FormField
                  name="input.theme"
                  label="Thema"
                />
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                Ingredienten:
                <FieldArray
                name="ingredients"
                render={arrayHelpers => (
                <div>
                    {data && (
                        <>

                 {values.ingredients?.map((quantityToIngredient, index) => (
                     <div key={index}>
                         <FormikSelect 
                         title="Ingredient"
                         name={`ingredients.${index}.id`}
                         >
                             {data.ingredients.map((ingredient) => (
                      <MenuItem key={ingredient.id} value={ingredient.id}>
                        {ingredient.name}
                      </MenuItem>
                    ))}
                             </FormikSelect>
                        <TextField
                        fullWidth
                        id={`ingredients.${index}.quantity`}
                        name={`ingredients.${index}.quantity`}
                       label="Hoeveelheid"
                       value={quantityToIngredient.quantity}
                       onChange={handleChange}
                        />
                        <TextField
                        fullWidth
                        id={`ingredients.${index}.unit`}
                        name={`ingredients.${index}.unit`}
                       label="Eenheid"
                       value={quantityToIngredient.unit}
                       onChange={handleChange}
                        />
                            <Button
                            variant="contained" 
                            color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => arrayHelpers.remove(index)}>
                        -
                       </Button>
                       <Button
                       variant="contained" 
                       color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => arrayHelpers.push(emptyIngredientEntry)}>
                        +
                       </Button>
                     </div>
                   ))}
                   </>
                    )}
                </div>
                )}
                />
                Method:
                <FieldArray
                name="method"
                render={arrayHelpers => (
                <div>
                 {values.method?.map((stepToMethod, index)=> (
                     <div key={stepToMethod.step}>
                         <TextField
                        fullWidth
                        id={`method.${index}.step`}
                        name={`method.${index}.step`}
                       label="Stap"
                       value={stepToMethod.step}
                       onChange={handleChange}
                        />
                        <TextField
                        fullWidth
                        id={`method.${index}.method`}
                        name={`method.${index}.method`}
                       label="Methode"
                       value={stepToMethod.method}
                       onChange={handleChange}
                        />
                            <Button
                            variant="contained" 
                            color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => arrayHelpers.remove(index)}>
                        -
                       </Button>
                       <Button
                       variant="contained" 
                       color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => {
                         setStep(stepHere + 1)
                         arrayHelpers.push(emptyStep)}}>
                        +
                       </Button>
                     </div>
                   ))}
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