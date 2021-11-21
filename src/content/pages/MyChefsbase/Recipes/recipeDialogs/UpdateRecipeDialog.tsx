import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TableContainer, Table, TableCell, TableRow, TextField, Typography, Divider } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField, FormFieldEdit } from "src/components/form/FormField";
import { Rating1, RatingEdit } from "../../Menus/filtermenus/components/rating";
import { FormikSelect } from "src/components/form/FormikSelect";
import { RecipeInput, QuantityToId, StepToMethodInput, DishInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { UpdateDishVariables } from "../../Dishes/types/UpdateDish";
import { useAllIngredientsQuery, useUpdateRecipe } from "../api";
import { FilterRecipes_filterRecipes } from "../types/FilterRecipes";
import { UpdateRecipeVariables } from "../types/UpdateRecipe";
import { H3, H5 } from "src/content/pages/Components/TextTypes";
import { ingredientToQ, mapIngredientToQToInput } from "../AddRecipe";
import { TableData } from "../AddRecipe/components/IngredientTable";

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
      const [selectedIngredients, setIngredients] = React.useState<ingredientToQ[]>([]);
      function handleDelete(index) {
        selectedIngredients.splice(index, 1)
        setIngredients([...selectedIngredients])
      }
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

    const methodSize = recipe.method.length

    return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateRecipe({
            variables: {
                method: values.method,
                ingredients: mapIngredientToQToInput(selectedIngredients),
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
        {({ values, submitForm, setFieldValue, handleChange }) => {
          return (
            <>
              <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">
                Recept Aanpassen
              </DialogTitle>
              <DialogContent>
              <Grid container xs={12}>
                <Grid xs={3}>
                <H5 title="Geef dit recept een naam"/>
                <FormFieldEdit
                  placeholder={recipe.name}
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <Typography>Geef het recept type aan</Typography>
                <FormFieldEdit
                  placeholder={recipe.type}
                  name="input.type"
                  label="Type"
                />
                </Grid>  
                <Grid xs={5}></Grid>
                <Grid xs={3}>
                <RatingEdit
                defaultNumber={recipe.rating}
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <Button
                  disabled={loading}
                  onClick={() => submitForm()}
                  color="primary"
                  variant="contained"
                >
                  Gegevens toevoegen
                </Button>
                </Grid>   
                <Grid xs={12}>
                <Grid xs={12}>
                <H3 title="Stappenplan om dit recept te maken:"/>
                <Grid xs={12}>
                <FieldArray
                name="method"
                render={arrayHelpers => (
                <div>
                  <TableContainer >
                    <Table>
                      <TableRow>
                        <TableCell>
                          Stap
                        </TableCell>
                        <TableCell>
                          Actie
                        </TableCell>
                        <TableCell>
                          Verwijder stap
                          </TableCell>
                        <TableCell>
                          Nog een stap toevoegen
                        </TableCell>
                      </TableRow>
                 {values.method?.map((stepToMethod, index)=> (
                   <TableRow>
                     <>
                         <TableCell>
                           {index + 1}
                        </TableCell>
                        <TableCell>
                        <TextField
                        id={`method.${index}.method`}
                        name={`method.${index}.method`}
                       label="Methode"
                       value={stepToMethod.method}
                       multiline
                       onChange={handleChange}
                        />
                        </TableCell>
                        <TableCell>
                        <Button
                            variant="contained" 
                            color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => {
                             setStep(stepHere -1);
                             arrayHelpers.remove(index)}}>
                        -
                       </Button>
                        </TableCell>
                        <TableCell>
                        <Button
                       variant="contained" 
                       color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => {
                         setStep(stepHere + 1)
                         arrayHelpers.push(emptyStep)}}>
                        +
                       </Button>
                       </TableCell>
                     </>
                     </TableRow>
                   ))}
                   </Table>
                   </TableContainer>
                   </div>
                )}
                />
                </Grid>
                </Grid> 
                </Grid>
                </Grid>
                <Grid xs={12}></Grid>
                <Divider/>
                <Grid container xs={12}>
                  <Grid xs={12}>
                <H3 title="Ingredienten"/>
                </Grid>
                <Grid xs={6}>
                  <TableData 
                  setIngredients={(selected) => setIngredients([...selectedIngredients, selected])
                  }/>
                  </Grid>
                  <Grid xs={6}>
                  <TableContainer>
                <Table size="small">
                  <TableRow>
                    <TableCell>Ingredient</TableCell>
                    <TableCell>Hoeveelheid</TableCell>
                    <TableCell>Eenheid</TableCell>
                    </TableRow>
                {selectedIngredients.map((ingredient, index) =>  (
                  <TableRow>
                    <TableCell>
                      {ingredient.name}
                    </TableCell>
                    <TableCell>
                      {ingredient.quantity}
                    </TableCell>
                    <TableCell>
                      {ingredient.unit}
                    </TableCell>
                    <TableCell>
                    <Button
                       variant="contained" 
                       color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => {handleDelete(index)}}>           
                                                 -
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
                </Table>
                </TableContainer>
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