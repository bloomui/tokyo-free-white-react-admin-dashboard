import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { RecipeInput, QuantityToId, StepToMethodInput, DishInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { UpdateDishVariables } from "../../Dishes/types/UpdateDish";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAllIngredientsQuery, useUpdateRecipe } from "../api";
import { FilterRecipes_filterRecipes } from "../types/FilterRecipes";
import { UpdateRecipeVariables } from "../types/UpdateRecipe";

export const UpdateRecipeDialog = ({
    recipe,
    open,
    onClose,
}: {
    recipe: FilterRecipes_filterRecipes,
    open: boolean,
    onClose: () => void
}) => {
  const {data} = useAllIngredientsQuery()


    const { updateRecipe, loading, error } = useUpdateRecipe({
        onCompleted: () => window.location.reload(),
      });

      const [stepHere, setStep] = useState(1)

      const emptyStep: StepToMethodInput = {
        step: stepHere,
        method: ''
        }

    const formInput: RecipeInput = {
        id: recipe.id,
        name: recipe.name,
        rating: recipe.rating,
        type: recipe.type
    }
    const formIngredients: QuantityToId[] | null = (recipe.ingredients? (recipe.ingredients.map((quantityToIngr) => (
            {
                quantity: quantityToIngr.quantity.quantity,
                unit: quantityToIngr.quantity.unit,
                id: quantityToIngr.ingredient.id,
            }
    )
    )) : null)

    const formMethods: StepToMethodInput[] | null = (recipe.method? (recipe.method.map((method) => (
        {
            step: method.step,
            method: method.method,
        }
)
)) : null)

const formState : UpdateRecipeVariables = {
        input: formInput,
        ingredients: formIngredients,
        method: formMethods
    }

    return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateRecipe({
            variables: {
                method: values.method,
                ingredients: values.ingredients,
                input: {
                id: recipe.id,
                name: values.input.name,
                rating: values.input.rating,
                type: values.input.type,
              },
            },
          });
        }}
      >
        {({ submitForm, setFieldValue, handleChange }) => {
          return (
            <>
              <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">
                Recept Aanpassen
              </DialogTitle>
              <DialogContent>
                <FormField
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                <FormField
                  name="input.type"
                  label="Type"
                />
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                Ingredienten:
                {recipe.ingredients?.map((quantityToIngr, index) => (
                    <>
                    {data && (
                        <>
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
                       value={quantityToIngr.quantity.quantity}
                       onChange={handleChange}
                        />
                        <TextField
                        fullWidth
                        id={`ingredients.${index}.unit`}
                        name={`ingredients.${index}.unit`}
                       label="Eenheid"
                       value={quantityToIngr.quantity.unit}
                       onChange={handleChange}
                        />
                        </>
                    )}
                    </>
                    ))}
                Methode
                <FieldArray
                name="method"
                render={arrayHelpers => (
                <div>
                 {recipe.method?.map((stepToMethod, index)=> (
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