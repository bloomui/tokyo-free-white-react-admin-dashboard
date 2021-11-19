import { useQuery } from "@apollo/client";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { Formik } from "formik";
import React from "react";
import { FormField } from "src/components/form/FormField";
import { CourseToDishesInput, MenuInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { useAllDishesQuery, useUpdateMenu } from "../api";
import { Rating1, RatingLabels } from "../filtermenus/components/rating";
import { FilterMenus, FilterMenus_filterMenus, FilterMenus_filterMenus_courses_dishes } from "../types/FilterMenus";
import { Menus_dishes } from "../types/Menus";
import { UpdateMenuVariables } from "../types/UpdateMenu"

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
    return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateMenu({
            variables: {
                courses: values.courses,
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
        {({ values, submitForm, setFieldValue }) => {
          return (
            <>
              <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">
                Menu Aanpassen
              </DialogTitle>
              <DialogContent>
                <FormField
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                <FormField
                  name="input.season"
                  label="Seizoen"
                />
                <FormField
                  name="input.theme"
                  label="Thema"
                />
                <FormField
                  name="input.periodstartdate"
                  label="Start datum"
                />
                <FormField
                  name="input.periodenddate"
                  label="Eind datum"
                />
                Rating:
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                Gangen:
                {menu.courses.map((course, index) => (
                    <>
                    {course.course.courseType}
                    {data && (
                        <>
                        <Autocomplete
                multiple
                id="tags-standard"
                defaultValue={course.dishes.map((option) => (option))}
                options={data.dishes.map((option) => (option))}
                getOptionLabel={(option) => option.name}
                onChange={(event,  values) => setFieldValue(`courses.${index}.dishes`, values.map((option: FilterMenus_filterMenus_courses_dishes) => option.id))}
                renderInput={(params) => (
                 <TextField
                 {...params}
                 fullWidth
                label="Gerechten"
                />
                )}
                />
                        </>
                    )} 
                </>
                ))}
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