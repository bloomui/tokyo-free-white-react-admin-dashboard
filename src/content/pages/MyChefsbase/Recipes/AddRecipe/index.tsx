import { useQuery } from "@apollo/client";
import { Button, Checkbox, Container, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { FieldArray, Formik, useField } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FormikSelect } from "src/components/form/FormikSelect";
import { LoadingScreen } from "src/components/layout";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/components/form/FormField";
import { AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required, Validator } from "src/utilities/formikValidators";
import { user } from "../..";
import { ingredient_ingredient } from "../../Ingredients/types/ingredient";
import { EnhancedTableHead } from "../../Menus/components/MenuTable";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddRecipe } from "../api";
import { Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AddRecipeVariables } from "../types/AddRecipe";
import { ingredientsQuery } from "./api";
import { formikFieldErrorProps } from "src/utilities/formikError";

export const AddRecipePage = () => {

    const { addRecipe, loading, error } = useAddRecipe({
        onCompleted: () => {}
          // window.location.reload()
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
                <Grid xs={6}>
                <Grid xs={5}>
                <Typography>Geef dit recept een naam</Typography>
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
                <Typography>Geef het recept type aan</Typography>
                <FormField
                  name="input.type"
                  label="Type"
                />
                </Grid>                
                </Grid>
                <Grid xs={6}>
                <Grid xs={12}>
                Stappenplan om dit recept te maken:
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
                Ingredienten:
                </Grid>
                <Grid xs={6}></Grid>
                <Grid xs={6}>
                  <TableContainer>
                <Table size="small">
                  <TableRow>
                    <TableCell>Ingredient</TableCell>
                    <TableCell>Hoeveelheid</TableCell>
                    <TableCell>Eenheid</TableCell>
                    </TableRow>
                {selectedIngredients.map((ingredient) =>  (
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
                  </TableRow>
                ))}
                </Table>
                </TableContainer>
                </Grid>
                <Grid xs={6}>
                  <TableData 
                  setIngredients={(selected) => selectedIngredients.push(selected)
                  }/>
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

export type ingredientToQ = {
  name: string,
  id: string,
  quantity: string,
  unit: string
}

const mapIngredientToQToInput = (selected: ingredientToQ[]): QuantityToId[] => {
  return selected.map((a) => (
    {
      id: a.id,
      quantity: Number(a.quantity),
      unit: a.unit
    }
  ))
}

export const units = ["gram", "miligram", "kilogram", "theelepel(s)", "eetlepel(s)", "stuk(s)", "mililiter", "liter"]

const TableData = ({
  setIngredients
}: {
  setIngredients: (selected: ingredientToQ) => void
}) => {

  const { loading, data, error } = useQuery(ingredientsQuery)
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <TableContainer component={Paper}>
          <Table size="small">
        <TableRow>
          <TableCell>Ingredient</TableCell>
          <TableCell>Hoeveelheid</TableCell>
          <TableCell>Eenheid</TableCell>
          <TableCell>Voeg toe</TableCell>
        </TableRow>
        {data.ingredients.map((ingredient) => (
          <Row 
          data={ingredient}
          setIngredient={(a: ingredientToQ) => setIngredients(a)}/>
        ))}
        </Table>
      </TableContainer>
  )
}

const Row = ({data, setIngredient}: {data: ingredient_ingredient, setIngredient: (a) => void}) => {

  const formState: ingredientToQ = {
  name: data.name,
  id: data.id,
  quantity: '',
  unit: ''
}

  return (
    <Formik
        initialValues={formState}
        onSubmit={(values) => {
          setIngredient(values);
        }}
      >
        {({ submitForm }) => {
      return (
        <>
        <TableRow >
          <TableCell >
            {data.name}
          </TableCell>
          <TableCell >
            <FormFieldHere
                  name="quantity"
                  validator={composeValidators(required)}
                />
          </TableCell>
          <TableCell >
            <FormikSelect
            title="Eenheid"
            name={`unit`}
            >
              {units.map((unit) => (
                <MenuItem>{unit}</MenuItem>
              ))}
            </FormikSelect>
          </TableCell>
          <TableCell>
          <Button
                  onClick={() => {submitForm()}}
                  color="primary"
                  variant="outlined"
                >
                  +
                </Button>
          </TableCell>
        </TableRow>
      </>
      )
        }
      }
      </Formik>
  )
}

  type FieldProps = {
    name: string;
    validator?: Validator;
    otherFieldProps?: Partial<TextFieldProps>;
  };

  const FormFieldHere = (props: FieldProps) => {
    const { name, validator, otherFieldProps } = props;
  
    const [field, meta] = useField({
      name,
      validate: validator,
    });
  
    return (
      <TextField
        {...(otherFieldProps as any)}
        {...field}
        {...formikFieldErrorProps(meta)}
      />
    );
  };