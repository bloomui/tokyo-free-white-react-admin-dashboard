import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TableCell, Table, TableContainer, TableRow, TextField, Typography, Divider } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { FormField, FormFieldEdit } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { LoadingScreen } from "src/components/layout";
import { H3, H5 } from "src/content/pages/Components/TextTypes";
import { DishInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { emptyDish } from ".";
import { Rating1, RatingEdit } from "../../Menus/filtermenus/components/rating";
import { mapRecipeToQToInput, recipeToQ } from "../AddDish";
import { TableRecipeData } from "../AddDish/components/RecipeTable";
import { useGetDishQuery, useUpdateDish } from "../api";
import { FilterDishes, FilterDishes_filterDishes } from "../types/FilterDishes";
import { UpdateDishVariables } from "../types/UpdateDish";

export const UpdateDishDialog = ({
    id,
    open,
    onClose,
}: {
    id: string,
    open: boolean,
    onClose: () => void
}) => {

  const { data, loading: loading1, error: error1 } = useGetDishQuery(id)

    
    const { updateDish, loading, error } = useUpdateDish({
        onCompleted: () => window.location.reload(),
      });
      const [stepHere, setStep] = useState(1)
      const [selectedRecipes, setRecipes] = React.useState<recipeToQ[]>([]);

      function handleDelete(index) {
          selectedRecipes.splice(index, 1)
          setRecipes([...selectedRecipes])
        }

        if (loading1) return <LoadingScreen/>
        
        let dish = data.dish

    const formInput: DishInput = {
        id: dish.id,
        name: dish.name,
        rating: dish.rating,
        comment: dish.comment,
        theme: dish.theme,
        type: dish.type
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
    <Dialog 
    fullScreen
    open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateDish({
            variables: {
                method: values.method,
                recipes: mapRecipeToQToInput(selectedRecipes),
                input: {
                id: dish.id,
                name: values.input.name,
                rating: values.input.rating,
                comment: values.input.comment,
                theme: values.input.theme,
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
                Gerecht Aanpassen
              </DialogTitle>
              <DialogContent>
                <Grid  container xs={12}>
              <Grid xs={3}>
                <H5 title="Geef dit gerecht een naam"/>
                <FormFieldEdit
                  placeholder={dish.name}
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <H5 title="Geef het thema aan"/>
                <FormFieldEdit
                  placeholder={dish.theme}
                  name="input.theme"
                  label="Thema"
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <H5 title="Geef het gerechttype aan"/>
                <FormFieldEdit
                  placeholder={dish.type}                  
                  name="input.type"
                  label="Type"
                />
                </Grid>
                <Grid xs={3}>
                <H5 title="Voeg een opmerking toe"/>
                <FormFieldEdit
                  placeholder={dish.comment}
                  name="input.comment"
                  label="Opmerking"
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <RatingEdit
                defaultNumber={dish.rating}
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
                <Divider/>  
                <Grid xs={12}>
                <H3 title="Stappenplan om dit gerecht te maken:"/>
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
                <Grid xs={12}></Grid>
                <Divider/>
                <Grid container xs={12}>
                  <Grid xs={12}>
                <H3 title="Recepten"/>
                </Grid>
                <Grid xs={6}>
                  <TableRecipeData 
                  setRecipes={(selected) => setRecipes([...selectedRecipes, selected])
                  }/>
                  </Grid>
                  <Grid xs={6}>
                  <TableContainer>
                <Table size="small">
                  <TableRow>
                    <TableCell>Recept</TableCell>
                    <TableCell>Hoeveelheid</TableCell>
                    <TableCell>Eenheid</TableCell>
                    </TableRow>
                {selectedRecipes.map((recipe, index) =>  (
                  <TableRow>
                    <TableCell>
                      {recipe.name}
                    </TableCell>
                    <TableCell>
                      {recipe.quantity}
                    </TableCell>
                    <TableCell>
                      {recipe.unit}
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
                {error && (
                  <Typography color="error">
                    Er is een fout opgetreden, probeer het opnieuw.
                  </Typography>
                )}
                </Grid>
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