import { Button, Container, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FormikSelect } from "src/components/form/FormikSelect";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/content/pages/SignIn";
import { AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { user } from "../..";
import { useFilterIngredientsQuery } from "../../Ingredients/api";
import { IngredientTable } from "../../Ingredients/components/IngredientTable"
import { initialIngredientValues } from "../../Ingredients/filterIngredients";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddRecipe } from "../api";
import { AddRecipeVariables } from "../types/AddRecipe";

const ingredientTitles= ["Geen",  "Geen"]

export const AddRecipePage = () => {

    const { addRecipe, loading, error } = useAddRecipe({
        onCompleted: () => {window.location.reload()},
      });

      const [stepHere, setStep] = useState(1)

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
            <Grid container xs={12} spacing={2}>
                <Grid xs={3}>
                <Typography>Geef dit recept een naam</Typography>
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
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <Typography>Hoe wordt dit recept gewardeerd?</Typography>
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                </Grid>
                </Grid>
                <Grid container xs={12}>
                <Grid xs={6}>
                    <Grid xs={12}>
                Stappenplan om dit recept te maken:
                <Grid xs={12}>
                <FieldArray
                name="method"
                render={arrayHelpers => (
                <div>
                    <Table>
                 {values.method?.map((stepToMethod, index)=> (
                     <TableRow>
                     <div key={stepToMethod.step}>
                         <TableCell>
                         <TextField
                        id={`method.${index}.step`}
                        name={`method.${index}.step`}
                       label="Stap"
                       value={stepToMethod.step}
                       onChange={handleChange}
                        />
                        </TableCell>
                        <TableCell>
                        <TextField
                        id={`method.${index}.method`}
                        name={`method.${index}.method`}
                       label="Methode"
                       value={stepToMethod.method}
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
                            
                     </div>
                     </TableRow>
                   ))}
                   <TableRow>
                       <Button
                       variant="contained" 
                       color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => {
                         setStep(stepHere + 1)
                         arrayHelpers.push(emptyStep)}}>
                        +
                       </Button>
                   </TableRow>
                   </Table>
                   </div>
                )}
                />
                </Grid>
                </Grid>                
                <Grid container xs={12}>
                Welke ingredienten worden gebruikt?
                <Grid xs={12}>
                <FieldArray
                name="ingredients"
                render={arrayHelpers => (
                <div>
                        <>
                        <Table>
                 {values.ingredients?.map((quantityToIngredient, index) => (
                     <>
                     <TableRow>
                     <div key={index}>
                         <TableCell>
                             Ingredient naam
                         {/* <FormikSelect 
                         title="Ingredient"
                         name={`ingredients.${index}.id`}
                         >
                             {ingredientTitles.map((i) => (
                                <MenuItem>
                        {i}
                      </MenuItem>
                             ))}
                             </FormikSelect> */}
                             </TableCell>
                             <TableCell>
                        <TextField
                        fullWidth
                        id={`ingredients.${index}.quantity`}
                        name={`ingredients.${index}.quantity`}
                       label="Hoeveelheid"
                       value={quantityToIngredient.quantity}
                       onChange={handleChange}
                        />
                        </TableCell>
                        <TableCell>
                        <TextField
                        fullWidth
                        id={`ingredients.${index}.unit`}
                        name={`ingredients.${index}.unit`}
                       label="Eenheid"
                       value={quantityToIngredient.unit}
                       onChange={handleChange}
                        />
                        </TableCell>
                        <TableCell>
                            <Button
                            variant="contained" 
                            color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => arrayHelpers.remove(index)}>
                        -
                       </Button>
                       </TableCell>
                     </div>
                     </TableRow>
                     <TableRow>
                         <Button
                       variant="contained" 
                       color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => arrayHelpers.push(emptyIngredientEntry)}>
                        +
                       </Button>
                     </TableRow>
                     </>
                   ))}
                   </Table>
                   </>
                </div>
                )}
                />
                </Grid>
                </Grid>
                </Grid>
                <Grid xs={6}>
                    <Typography align="center">Ingrediententabel</Typography>
                </Grid>
                </Grid>
                {error && (
                  <Typography color="error">
                    Er is een fout opgetreden, probeer het opnieuw.
                  </Typography>
                )}
                <Button
                  disabled={loading}
                  onClick={() => submitForm()}
                  color="primary"
                >
                  Gegevens toevoegen
                </Button>
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