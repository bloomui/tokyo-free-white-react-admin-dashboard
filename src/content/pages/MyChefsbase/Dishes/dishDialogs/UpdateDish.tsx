import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { DishInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAllRecipesQuery, useUpdateDish } from "../api";
import { FilterDishes, FilterDishes_filterDishes } from "../types/FilterDishes";
import { UpdateDishVariables } from "../types/UpdateDish";

export const UpdateDishDialog = ({
    dish,
    open,
    onClose,
}: {
    dish: FilterDishes_filterDishes,
    open: boolean,
    onClose: () => void
}) => {
  const {data} = useAllRecipesQuery()


    const { updateDish, loading, error } = useUpdateDish({
        onCompleted: () => window.location.reload(),
      });
      const [stepHere, setStep] = useState(1)


    const formInput: DishInput = {
        id: dish.id,
        name: dish.name,
        rating: dish.rating,
        comment: dish.comment,
        theme: dish.theme,
    }
    const emptyStep: StepToMethodInput = {
      step: stepHere,
      method: ''
      }
    const formRecipes: QuantityToId[] | null = (dish.recipes? (dish.recipes.map((quantityToRecipe) => (
            {
                quantity: quantityToRecipe.quantity.quantity,
                unit: quantityToRecipe.quantity.unit,
                id: quantityToRecipe.recipe.id,
            }
    )
    )) : null)

    const formMethods: StepToMethodInput[] | null = (dish.method? (dish.method.map((method) => (
        {
            step: method.step,
            method: method.method,
        }
)
)) : null)

const formState : UpdateDishVariables = {
        input: formInput,
        recipes: formRecipes,
        method: formMethods
    }


    return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateDish({
            variables: {
                method: values.method,
                recipes: values.recipes,
                input: {
                id: dish.id,
                name: values.input.name,
                rating: values.input.rating,
                comment: values.input.comment,
                theme: values.input.theme,
              },
            },
          });
        }}
      >
        {({ submitForm, setFieldValue, handleChange }) => {
          return (
            <>
              <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">
                Gerecht Aanpassen
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
                  name="input.theme"
                  label="Thema"
                />
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                Recepten:
                {dish.recipes?.map((quantityToRecipe, index) => (
                    <>
                    {quantityToRecipe.recipe.name}
                    {data && (
                        <>
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
                       value={quantityToRecipe.quantity.quantity}
                       onChange={handleChange}
                        />
                        <TextField
                        fullWidth
                        id={`recipes.${index}.unit`}
                        name={`recipes.${index}.unit`}
                       label="Eenheid"
                       value={quantityToRecipe.quantity.unit}
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
                 {dish.method?.map((stepToMethod, index)=> (
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