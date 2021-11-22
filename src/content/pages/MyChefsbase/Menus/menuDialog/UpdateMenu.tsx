import { useQuery } from "@apollo/client";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TableCell, TableContainer, Table, TableRow, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React from "react";
import { FormField, FormFieldEdit } from "src/components/form/FormField";
import { CourseToDishesInput, MenuInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { useAllDishesQuery, useUpdateMenu } from "../api";
import { Rating1, RatingEdit, RatingLabels } from "../filtermenus/components/rating";
import { FilterMenus, FilterMenus_filterMenus, FilterMenus_filterMenus_courses_dishes } from "../types/FilterMenus";
import { Menus_dishes } from "../types/Menus";
import { UpdateMenuVariables } from "../types/UpdateMenu"
import { H3, H5 } from "src/content/pages/Components/TextTypes";
import { TableDishData, TableDishDataId } from "../AddMenu/components/DishTable";
import { Grid } from "@mui/material";
import { dishForCourse } from "../AddMenu";

export const UpdateMenuDialog = ({
    menu,
    open,
    onClose,
}: {
    menu: FilterMenus_filterMenus | null,
    open: boolean,
    onClose: () => void
}) => {
  
  const {data} = useAllDishesQuery()

    const { updateMenu, loading, error } = useUpdateMenu({
        onCompleted: () => window.location.reload(),
      });

    const formInput: MenuInput = menu? {
        id: menu.id,
        name: menu.name,
        rating: menu.rating,
        season: menu.season,
        theme: menu.theme,
        periodstartdate: menu.periodstartdate,
        periodenddate: menu.periodenddate,
    }: null

    const formcourses: CourseToDishesInput[] | null = menu? (menu.courses? (menu.courses.map((course) => (
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

    const [selectedDishes, setDishes] = React.useState<dishForCourseid[]>([]);
      function handleDelete(index) {
        selectedDishes.splice(index, 1)
        setDishes([...selectedDishes])
      }
    return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateMenu({
            variables: {
              courses: mapCoursesToInputId(selectedDishes),
              input: {
                id: menu.id,
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
                 placeholder={menu.name}
                  name="input.name"
                  label="Naam"
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <H5 title="Geef een seizoen op"/>
                <FormFieldEdit
                 placeholder={menu.season}
                  name="input.season"
                  label="Seizoen"
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <H5 title="Geef een thema op"/>
                <FormFieldEdit
                 placeholder={menu.theme}
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
                 placeholder={menu.periodstartdate}
                  name="input.periodstartdate"
                  label="Vanaf"
                />
                </Grid>
                <Grid xs={2}></Grid>
                <Grid xs={5}>
                <FormFieldEdit
                 placeholder={menu.periodenddate}
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
                defaultNumber={menu.rating}
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
                  <TableDishDataId
                  courses={values.courses} 
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
                           courseid: courseToDishes.courseid,
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

export type dishForCourseid = {
  courseid: string,
  coursetype: string,
  dishid: string,
  dishname: string,
}

export const mapCoursesToInputId = (selected: dishForCourseid[]): CourseToDishesInput[] => {

    const a = []
    selected.forEach((b) => {
        if (a.includes(b.coursetype) == false) a.push(b.coursetype, b.courseid)
    })
    const map = a.map((c) => {
        return {
                courseid: c.courseid,
                coursetype: c.coursetype,
                dishes: selected.filter((s) => s.courseid == c.courseid).map((s) => s.dishid)
            }
    })
    return map
  }