import { Button, Container, Divider, Grid, MenuItem, Table, TableCell, TableContainer, TableRow, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { FieldArray, Formik, useField } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/components/form/FormField";
import { AddDishInput, AddIngredientInput, AddProductInput, AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required, Validator } from "src/utilities/formikValidators";
import { user } from "../..";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { FormikSelect } from "src/components/form/FormikSelect";
import { useAddDish } from "../api";
import { AddDishVariables } from "../types/AddDish";
import { TableRecipeData } from "./components/RecipeTable";

export const AddDishPage = () => {

    const { addDish, loading, error } = useAddDish({
        onCompleted: () => {window.location.reload()}
        },
      );
      const [stepHere, setStep] = useState(1)
      const [selectedRecipes, setRecipes] = React.useState<recipeToQ[]>([]);

      const formInput: AddDishInput = {
        name: '',
        rating: 0,
        type: '',
        theme: '',
        comment: '',
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
    
            function handleDelete(index) {
                selectedRecipes.splice(index, 1)
                setRecipes([...selectedRecipes])
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
        <>
        <Helmet>
        <title>Nieuw Gerecht</title>
      </Helmet>
      <PageTitleWrapper>
      <PageHeader
        title="Nieuw gerecht"
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
          addDish({
            variables: {
                method: values.method.map((stepToMethod, index) => ({
                  step: index + 1,
                  method: stepToMethod.method
                })),
                recipes: mapRecipeToQToInput(selectedRecipes),
                input: {
                theme: values.input.theme,
                name: values.input.name,
                rating: values.input.rating,
                type: values.input.type,
                comment: values.input.comment,
              },
            },
          });
        }}
      >
        {({ values, handleChange, submitForm, setFieldValue }) => {
          return (
            <>
            <Grid container xs={12} spacing={2}>
                <Grid xs={6}>
                <Grid xs={5}>
                <Typography>Geef dit gerecht een naam</Typography>
                <FormField
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={5}>
                <Typography>Geef het thema aan</Typography>
                <FormField
                  name="input.theme"
                  label="Thema"
                />
                </Grid> 
                <Grid xs={5}>
                <Grid xs={5}>
                <Typography>Geef het type aan</Typography>
                <FormField
                  name="input.type"
                  label="Type"
                />
                </Grid> 
                <Grid xs={5}>
                <Typography>Geef een opmerking aan</Typography>
                <FormField
                  name="input.comment"
                  label="Opmerking"
                />
                </Grid> 
                </Grid>
                <Grid xs={5}>
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
                <Grid xs={6}>
                <Grid xs={12}>
                Stappenplan om dit gerecht te maken:
                <Grid xs={12}>
                <FieldArray
                name="method"
                render={arrayHelpers => (
                <div>
                    <Table>
                      <TableRow>
                        <TableCell>
                          Stap
                        </TableCell>
                        <TableCell>
                          Actie
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
                            
                     </>
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
                </Grid>
                </Grid>
                <Grid xs={12}></Grid>
                <Divider/>
                <Grid container xs={12}>
                  <Grid xs={6}>
                Recepten:
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
                <Grid xs={6}>
                  <TableRecipeData 
                  setRecipes={(selected) => setRecipes([...selectedRecipes, selected])
                  }/>
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

export type recipeToQ = {
  name: string,
  id: string,
  quantity: string,
  unit: string
}

const mapRecipeToQToInput = (selected: recipeToQ[]): QuantityToId[] => {
  return selected.map((a) => (
    {
      id: a.id,
      quantity: Number(a.quantity),
      unit: a.unit
    }
  ))
}
