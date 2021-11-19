import { Autocomplete, Button, Container, Divider, Grid, MenuItem, Table, TableCell, TableContainer, TableRow, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { FieldArray, Formik, useField } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/components/form/FormField";
import { AddCourseToDishesInput, AddDishInput, AddIngredientInput, AddMenuInput, AddProductInput, AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, mustBeDate, required, Validator } from "src/utilities/formikValidators";
import { user } from "../..";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { FormikSelect } from "src/components/form/FormikSelect";
import { useAddMenu, useAllDishesQuery } from "../api";
import { AddMenuVariables } from "../types/AddMenu";
import { AllDishes_dishes } from "../types/AllDishes";


export const AddMenuPage = () => {
    const {data} = useAllDishesQuery()
    const { addMenu, loading, error } = useAddMenu({
        onCompleted: () => window.location.reload(),
      });

    const formInput: AddMenuInput = {
        name: '',
        rating: 0,
        season: '',
        theme: '',
        periodstartdate: '',
        periodenddate: '',
    }
    const emptyCourseToDishesInput: AddCourseToDishesInput = {
            coursetype: '',
            dishes: [''],
    }

    const formcourses: AddCourseToDishesInput[] = [
        emptyCourseToDishesInput
    ]
    const formState = {
        input: formInput,
        courses: formcourses
    }

    return (
        <>
        <Helmet>
        <title>Nieuw Menu</title>
      </Helmet>
      <PageTitleWrapper>
      <PageHeader
        title="Nieuw menu"
        name="Soup Bros"
        avatar={user.avatar}
         />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
        //   direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          xs={12}
        >
          <Grid item xs={12}>
        <Formik
        initialValues={formState}
        onSubmit={(values) => {
            addMenu({
                variables: {
                    courses: values.courses,
                  input: {
                    name: values.input.name,
                    rating: values.input.rating,
                    season: values.input.season,
                    theme: values.input.theme,
                    periodstartdate: values.input.periodstartdate,
                    periodenddate: values.input.periodenddate,
                  },
            },
          });
        }}
      >
        {({ values, handleChange, submitForm, setFieldValue }) => {
          return (
            <>
                <Grid container xs={12}>
                    <Grid container xs={12}>
                    <Grid xs={3}>
                 <FormField
                  name="input.name"
                  label="Naam"
                />
                </Grid>
                <Grid xs={3}>
                 <FormField
                  name="input.season"
                  label="Seizoen"
                />
                </Grid>
                <Grid xs={3}>
                <FormField
                  name="input.theme"
                  label="Thema"
                />
                </Grid>
                <Grid xs={3}>
                <FormField
                  name="input.periodstartdate"
                  label="Start datum"
                />
                </Grid>
                <Grid xs={3}>
                <FormField
                  name="input.periodenddate"
                  label="Eind datum"
                  validator={composeValidators(mustBeDate)}
                />
                </Grid>
                <Grid xs={3}>
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                </Grid>
                     
                </Grid> 
                </Grid>       
                <Divider/>
                <Grid xs={6}>
                  Gangen:
                <FieldArray
            name="courses"
             render={arrayHelpers => (
               <div>
                 {values.courses.map((courseToDishes, index) => (
                     <div key={index}>
                        <TextField
                        fullWidth
                        id={`courses.${index}.coursetype`}
                        name={`courses.${index}.coursetype`}
                       label="Gang"
                       value={courseToDishes.coursetype}
                       onChange={handleChange}
                        />
                        {data && (
                            <Autocomplete
                            multiple
                            id="tags-standard"
                            options={data.dishes.map((option) => (option))}
                            getOptionLabel={(option) => option.name}
                            onChange={(event,  values: AllDishes_dishes[]) => setFieldValue(`courses.${index}.dishes`, values.map((option) => option.id))}
                            renderInput={(params) => (
                            <TextField
                 {...params}
                 fullWidth
                label="Gerechten"
                />
                            )}
                            />
                            )}
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
                         onClick={() => arrayHelpers.push(emptyCourseToDishesInput)}>
                        +
                       </Button>
                     </div>
                   ))}
                </div>
                )}
                />  
                </Grid>
                <Divider/>
                <Grid xs={12}>
                <Button
                  disabled={loading}
                  onClick={() => submitForm()}
                  color="primary"
                  variant="contained"
                >
                  Gegevens toevoegen
                </Button>
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
