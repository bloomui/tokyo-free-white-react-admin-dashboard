import { Autocomplete, Button, Container, Divider, Grid, MenuItem, Table, TableCell, TableContainer, TableRow, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { FieldArray, Formik, useField } from "formik";
import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/components/form/FormField";
import { AddCourseToDishesInput, AddDishInput, AddIngredientInput, AddMenuInput, AddProductInput, AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { user } from "../..";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddMenu, useAllDishesQuery } from "../api";
import { H3, H5 } from "src/content/pages/Components/TextTypes";
import { TableDishData } from "./components/DishTable";
import { InputPeriod } from "../filtermenus/components/period";


export const AddMenuPage = () => {
    const { addMenu, loading, error } = useAddMenu({
        onCompleted: () => {window.location.reload()},
      });

      const [selectedDishes, setDishes] = React.useState<dishForCourse[]>([]);
      function handleDelete(index) {
        selectedDishes.splice(index, 1)
        setDishes([...selectedDishes])
      }

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
                    courses: mapCoursesToInput(selectedDishes),
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
                        <H5 title="Geef een menu naam op"/>
                 <FormField
                  name="input.name"
                  label="Naam"
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <H5 title="Geef een seizoen op"/>
                 <FormField
                  name="input.season"
                  label="Seizoen"
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <H5 title="Geef een thema op"/>
                <FormField
                  name="input.theme"
                  label="Thema"
                />
                </Grid>
                <Grid container xs={7}>
                    <Grid xs={12}>
                <H5 title="Geef een periode op"/>
                </Grid>
                <Grid xs={10}>
                  <InputPeriod
                    setFieldValue={setFieldValue}
                    />
                </Grid>
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                    <H5 title="Toevoegen"/>
                <Button
                  disabled={loading}
                  onClick={() => submitForm()}
                  color="primary"
                  variant="contained"
                >
                  Gegevens toevoegen
                </Button>
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
                <Divider/>
                <Grid container xs={12}>
                  <Grid xs={12}>
                <H3 title="Gangen"/>
                </Grid>
                <Grid xs={6}>
                  <TableDishData
                  courses={values.courses.map((course) => course.coursetype)} 
                  setDishes={(selected) => setDishes([...selectedDishes, selected])
                  }/>
                  </Grid>
                  <Grid xs={6}>
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
                        <TableContainer>
                <Table size="small">
                  <TableRow>
                    <TableCell>Gerecht</TableCell>
                    </TableRow>
                {selectedDishes.map((dish, index) =>  {
                    if (dish.coursetype === courseToDishes.coursetype) return (
                    <TableRow>
                    <TableCell>
                      {dish.dishname}
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
                    )
                })}
                </Table>
                </TableContainer>
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
                </Grid>    
                <Divider/>          
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

export type dishForCourse = {
  coursetype: string,
  dishid: string,
  dishname: string,
}

export const mapCoursesToInput = (selected: dishForCourse[]): AddCourseToDishesInput[] => {

    const a = []
    selected.forEach((b) => {
        if (a.includes(b.coursetype) == false) a.push(b.coursetype)
    })
    const map = a.map((coursetype) => {
        return {
                coursetype: coursetype,
                dishes: selected.filter((s) => s.coursetype == coursetype).map((s) => s.dishid)
            }
    })
    return map
  }