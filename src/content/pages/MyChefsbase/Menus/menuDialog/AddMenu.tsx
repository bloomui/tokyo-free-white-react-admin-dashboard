import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React from "react";
import { FormField } from "src/components/form/FormField";
import { AddCourseToDishesInput, AddMenuInput } from "src/globalTypes";
import { composeValidators, mustBeDate, required } from "src/utilities/formikValidators";
import { useAddMenu, useAllDishesQuery, useUpdateMenu } from "../api";
import { Rating1, RatingLabels } from "../filtermenus/components/rating";
import { AllDishes_dishes } from "../types/AllDishes";
import { Menus_dishes, } from "../types/Menus";
import { UpdateMenuVariables } from "../types/UpdateMenu"

export const AddMenuDialog = ({
    open,
    onClose,
}: {
    open: boolean,
    onClose: () => void
}) => {
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
    <Dialog open={open} onClose={onClose}>
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
              <DialogTitle id="form-dialog-title">
                Menu Update
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
                  validator={composeValidators(mustBeDate)}
                />
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
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
                {error && (
                  <Typography color="error">
                    Er is een fout opgetreden, probeer het opnieuw.
                  </Typography>
                )}
              </DialogContent>

              <DialogActions>
                <Button disabled={loading} onClick={onClose} variant="contained" color="secondary">
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => submitForm()}
                  color="secondary"
                  variant="contained" 
                >
                  Menu toevoegen
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};