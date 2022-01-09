import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TableContainer, Table, TableCell, TableRow, TextField, Typography, Divider, CircularProgress, MenuItem } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField, FormFieldEdit } from "src/components/form/FormField";
import { Rating1, RatingEdit } from "../../Menus/filtermenus/components/rating";
import { FormikSelect } from "src/components/form/FormikSelect";
import { RecipeInput, QuantityToId, StepToMethodInput, DishInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { UpdateDishVariables } from "../../Dishes/types/UpdateDish";
import { useGetIngredientsForRecipe, useGetRecipeQuery, useUpdateRecipe } from "../api";
import { FilterRecipes_filterRecipes } from "../types/FilterRecipes";
import { UpdateRecipeVariables } from "../types/UpdateRecipe";
import { H3, H5 } from "src/content/pages/Components/TextTypes";
import { ingredientToQ, mapIngredientForRecipeToIngredientToQuantity, mapIngredientToQToInput } from "../AddRecipe";
import { TableData } from "../AddRecipe/components/IngredientTable";
import { LoadingScreen } from "src/components/layout";
import { recipe_recipe } from "../types/recipe";
import { Loader } from "src/components/search/Loader";

export const emptyRecipe: recipe_recipe = {
  __typename: "Recipe",
  id: 'a',
  name: 'a',
  method: [],
  rating: 0,
  type: 'a',
}

export const UpdateRecipeDialog = ({
    id,
    open,
    onClose,
}: {
    id: string,
    open: boolean,
    onClose: () => void
}) => {
  const [unit, setUnit] = useState('gram')
  const [quantity, setQuantity] = useState(100)

  const { data, loading: loading1, error: error1 } = useGetRecipeQuery(id)
  const { data: data2, loading: loading2, error: error2, refetch: refetch } = useGetIngredientsForRecipe({
    id: id,
    quantity: quantity,
    unit: unit
})

const { updateRecipe, loading, error } = useUpdateRecipe({
  onCompleted: () => {window.location.reload()}
});

      const [stepHere, setStep] = useState(1)
      const [selectedIngredients, setIngredients] = React.useState<ingredientToQ[]>([]);
      function handleDelete(index) {
        selectedIngredients.splice(index, 1)
        setIngredients([...selectedIngredients])
      }
     
    if (loading1) return <LoadingScreen/>
    if (error1) return <LoadingScreen/>

    if (loading) return <CircularProgress/>
    if (error) return <CircularProgress/>
    if (loading2) return (
        <Dialog open={open} onClose={onClose}><CircularProgress /></Dialog>
        )
    if (error2) return (
        <Dialog open={open} onClose={onClose}><CircularProgress /></Dialog>
        )

    let recipe = data.recipe

    const emptyStep: StepToMethodInput = {
      step: stepHere,
      method: ''
      }

  const formInput: RecipeInput = {
      id: id,
      name: recipe.name,
      rating: recipe.rating,
      type: recipe.type
  }
  const formIngredients: QuantityToId[] | null = (data2.ingredientsForRecipe.map((quantityToIngr) => (
          {
              quantity: quantityToIngr.quantity.quantity,
              unit: quantityToIngr.quantity.unit,
              id: quantityToIngr.ingredient.id,
          }
  )))

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

  // const ingredients: ingredientToQ[] = mapIngredientForRecipeToIngredientToQuantity(data2.ingredientsForRecipe)
  
  // setIngredients([...selectedIngredients, ingredients])
  // selectedIngredients.forEach((i)=> {
  //   
  // }) 

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
                           <H5 title="Toon voedingswaarden en ingredienten per:"/>
                           </Grid>
                           <Grid xs={2}></Grid>
                          <Grid xs={4}>
                              <TextField 
                              onKeyPress= {(e) => {
                                if (e.key === 'Enter') {
                                refetch({
                                    id: recipe.id,
                                    quantity: quantity,
                                    unit: unit});
                              }
                              }}  
                              defaultValue={quantity}
                              onChange={(e) => setQuantity(Number(e.target.value))}/>
                          </Grid>
                          <Grid xs={2}></Grid>
                          <Grid xs={4}>
                          <TextField
                      select
                      onChange={(e) => setUnit(e.target.value)}
                      variant="filled"
                    >
                      {["gram", "milliliter"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
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