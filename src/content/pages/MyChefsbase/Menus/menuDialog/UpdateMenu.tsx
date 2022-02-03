import { useQuery } from "@apollo/client";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TableCell, TableContainer, Table, TableRow, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React from "react";
import { FormField, FormFieldEdit } from "src/components/form/FormField";
import { AddCourseToDishesInput, MenuInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { useAllDishesQuery, useGetMenuQuery, useUpdateMenu } from "../api";
import { Rating1, RatingEdit, RatingLabels } from "../filtermenus/components/rating";
import { FilterMenus, FilterMenus_filterMenus } from "../types/FilterMenus";
import { UpdateMenuVariables } from "../types/UpdateMenu"
import { H3, H5 } from "src/content/pages/Components/TextTypes";
import { TableDishData } from "../AddMenu/components/DishTable";
import { Grid } from "@mui/material";
import { dishForCourse, mapCoursesToInput } from "../AddMenu";
import { menu_menu, menu_menu_courses } from "../types/menu";
import { LoadingScreen } from "src/components/layout";
import { recipeToQ } from "../../Dishes/AddDish";

const mapToDishesForCourses = (
  a: menu_menu_courses[]
): dishForCourse[] => {

  const map = []
  a.forEach((course) => {
    course.dishes.forEach((dish) => {
      map.push({
        coursetype: course.course.courseType,
        dishid: dish.id,
        dishname: dish.name,
      });
    });
  });

  return map;
}

export const UpdateMenuDialog = ({
    id,
    open,
    onClose,
}: {
    id: string,
    open: boolean,
    onClose: () => void
}) => {
  

  const [selectedDishes, setDishes] = React.useState<dishForCourse[]>([]);
  function handleDelete(index) {
    selectedDishes.splice(index, 1)
    setDishes([...selectedDishes])
  }

    const {data, loading: loading1,  error: error1} = useGetMenuQuery({
      id,
      onCompleted: (values) => {setDishes(
        mapToDishesForCourses(values.menu.courses)
      );},
    })

    const { updateMenu, loading, error } = useUpdateMenu({
        onCompleted: () => window.location.reload(),
      });

    

      if (loading1) return <LoadingScreen/>
      if (loading) return <LoadingScreen/>

      const formInput: MenuInput = data? {
        id: data.menu.id,
        name: data.menu.name,
        rating: data.menu.rating,
        season: data.menu.season,
        theme: data.menu.theme,
        periodstartdate: data.menu.periodstartdate,
        periodenddate: data.menu.periodenddate,
    }: null

    const formcourses: AddCourseToDishesInput[] | null = data? (data.menu.courses? (data.menu.courses.map((course) => (
        {
            courseid: course.course.id,
            coursetype: course.course.courseType,
            dishes: course.dishes.map((dish) => (dish.id)),
        }
    ))) : null) : null

    const formState : UpdateMenuVariables = {
        input: formInput,
        courses: formcourses
    }

    return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateMenu({
            variables: {
              courses: mapCoursesToInput(selectedDishes),
              input: {
                id: id,
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
              <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">
                Menu Aanpassen
              </DialogTitle>
              <DialogContent>
              <Grid container xs={12}>
                    <Grid container xs={12}>
                    <Grid xs={3}>
                        <H5 title="Geef een menu naam op"/>
                 <FormFieldEdit
                 placeholder={data.menu.name}
                  name="input.name"
                  label="Naam"
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <H5 title="Geef een seizoen op"/>
                <FormFieldEdit
                 placeholder={data.menu.season}
                  name="input.season"
                  label="Seizoen"
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <H5 title="Geef een thema op"/>
                <FormFieldEdit
                 placeholder={data.menu.theme}
                  name="input.theme"
                  label="Thema"
                />
                </Grid>
                <Grid container xs={7}>
                    <Grid xs={12}>
                <H5 title="Geef een periode op"/>
                </Grid>
                <Grid xs={5}>
                <FormFieldEdit
                 placeholder={data.menu.periodstartdate}
                  name="input.periodstartdate"
                  label="Vanaf"
                />
                </Grid>
                <Grid xs={2}></Grid>
                <Grid xs={5}>
                <FormFieldEdit
                 placeholder={data.menu.periodenddate}
                  name="input.periodenddate"
                  label="Tot"
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
                <RatingEdit
                defaultNumber={data.menu.rating}
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
                         onClick={() => arrayHelpers.push({
                          coursetype: '',
                          dishes: [''],
                  })}>
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
