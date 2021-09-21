import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { AddDishInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddDish, useAllRecipesQuery, useUpdateDish } from "../api";
import { AddDishVariables } from "../types/AddDish";

export const AddDishDialog = ({
    open,
    onClose,
}: {
    open: boolean,
    onClose: () => void
}) => {

  const {data} = useAllRecipesQuery()

    const [stepHere, setStep] = useState(1)

    const { addDish, loading, error } = useAddDish({
        onCompleted: () => {window.location.reload()},
      });

    const formInput: AddDishInput = {
        name: '',
        rating: 0,
        comment: '',
        type: '',
        theme: '',
    }
    const emptyRecipeEntry: QuantityToId = {
        quantity: 0,
        unit: '',
        id: '',
        }
    const emptyStep: StepToMethodInput = {
            step: stepHere,
            method: ''
            }
    
    const formRecipes: QuantityToId[] | null = [emptyRecipeEntry]
        
    const formMethods: StepToMethodInput[] | null = [
        emptyStep
    ]

const formState : AddDishVariables = {
        input: formInput,
        recipes: formRecipes,
        method: formMethods
    }

    return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          addDish({
            variables: {
                method: values.method,
                recipes: values.recipes,
                input: {
                type: values.input.type,
                name: values.input.name,
                rating: values.input.rating,
                comment: values.input.comment,
                theme: values.input.theme,
              },
            },
          });
        }}
      >
        {({ values, handleChange, submitForm, setFieldValue }) => {
          return (
            <>
              <DialogTitle id="form-dialog-title">
                Voeg gerecht toe
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
                Recepten:
                <FieldArray
                name="recipes"
                render={arrayHelpers => (
                <div>
                    {data && (
                        <>

                 {values.recipes?.map((quantityToRecipe, index) => (
                     <div key={index}>
                         <FormikSelect 
                         title="Recept"
                         name={`recipes.${index}.id`}
                         >
                             {data.recipes.map((recipe) => (
                      <MenuItem key={recipe.id} value={recipe.id}>
                        {recipe.name}
                      </MenuItem>
                    ))}
                             </FormikSelect>
                        <TextField
                        fullWidth
                        id={`recipes.${index}.quantity`}
                        name={`recipes.${index}.quantity`}
                       label="Hoeveelheid"
                       value={quantityToRecipe.quantity}
                       onChange={handleChange}
                        />
                        <TextField
                        fullWidth
                        id={`recipes.${index}.unit`}
                        name={`recipes.${index}.unit`}
                       label="Eenheid"
                       value={quantityToRecipe.unit}
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
                         onClick={() => arrayHelpers.push(emptyRecipeEntry)}>
                        +
                       </Button>
                     </div>
                   ))}
                   </>
                    )}
                </div>
                )}
                />
                Methode:
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