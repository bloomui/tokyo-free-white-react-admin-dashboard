import { useQuery } from "@apollo/client";
import { Button, Container, Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableCell, TableContainer, TableRow, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { FieldArray, Formik, useField } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/components/form/FormField";
import { AddIngredientInput, AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required, Validator } from "src/utilities/formikValidators";
import { user } from "../..";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddRecipe } from "../api";
import { Divider } from '@mui/material';
import { AddRecipeVariables } from "../types/AddRecipe";
import { TableData } from "./components/IngredientTable";
import { VscTrash } from "react-icons/vsc";
import { H3, H5, H5Left } from "src/content/pages/Components/TextTypes";
import { AddIngredientPage } from "../../Ingredients/AddIngredient";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ingredientsForRecipe_ingredientsForRecipe } from "../types/ingredientsForRecipe";
import { useAddQuickIngredients } from "./api";
import { AddQuickIngredientsVariables } from "./types/AddQuickIngredients";
import { AddIngrDialog } from "./components/AddQuickIngredients";

export const AddRecipePage = () => {

  const [ dialog, openDialog] = useState(false)
  const navigate = useNavigate()
    const { addRecipe, loading, error } = useAddRecipe({
        onCompleted: () => window.location.reload()
        },
      );
      const [stepHere, setStep] = useState(1)
      const [selectedIngredients, setIngredients] = React.useState<ingredientToQ[]>([]);
      
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

            function handleDelete(index) {
              selectedIngredients.splice(index, 1)
              setIngredients([...selectedIngredients])
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
        <>
        <Helmet>
        <title>Nieuw recept</title>
      </Helmet>
      <PageTitleWrapper>
      <PageHeader
        title="Nieuw recept"
        name="Soup Bros"
        avatar={user.avatar}
         />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
        <Formik
        initialValues={formState}
        onSubmit={(values) => {
          addRecipe({
            variables: {
                method: values.method.map((stepToMethod, index) => ({
                  step: index + 1,
                  method: stepToMethod.method
                })),
                ingredients: mapIngredientToQToInput(selectedIngredients),
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
            <Grid container xs={12} spacing={2}>
                <Grid container xs={12}>
                <Grid xs={3}>
                <H5 title="Geef dit recept een naam"/>
                <FormField
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <Typography>Geef het recept type aan</Typography>
                <FormField
                  name="input.type"
                  label="Type"
                />
                </Grid>  
                <Grid xs={5}></Grid>
                <Grid xs={3}>
                <Rating1
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
                <Grid xs={12}>
                <Button
                  // onClick={() => navigate("/mychefsbase/addingredient")}
                  onClick={() => openDialog(true)}
                  color="primary"
                  variant="contained"
                >
                  Snel ingredienten toevoegen
                </Button>
                </Grid>
                <AddIngrDialog
                open={dialog}
                onClose={() => openDialog(false)} />
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
            </>
          );
        }}
      </Formik>
      </Grid>
        </Grid>
      </Container>
      </>
          )
}

export type ingredientToQ = {
  name: string,
  id: string,
  quantity: string,
  unit: string
}

export const mapIngredientToQToInput = (selected: ingredientToQ[]): QuantityToId[] => {
  return selected.map((a) => (
    {
      id: a.id,
      quantity: Number(a.quantity),
      unit: a.unit
    }
  ))
}

export const mapIngredientForRecipeToIngredientToQuantity = (selected: ingredientsForRecipe_ingredientsForRecipe[]): ingredientToQ[] => {
    return selected.map((a) => (
      {
        id: a.ingredient.id,
        name: a.ingredient.name,
        quantity: String(a.quantity.quantity),
        unit: a.quantity.unit
      }
    ))
  }

