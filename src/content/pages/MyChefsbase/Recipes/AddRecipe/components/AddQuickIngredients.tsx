import { Button, Container, Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableCell, TableContainer, TableRow, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React from "react";
import { H5Left } from "src/content/pages/Components/TextTypes";
import { AddIngredientInput } from "src/globalTypes";
import { useAddQuickIngredients } from "../api";
import { AddQuickIngredientsVariables } from "../types/AddQuickIngredients";

export const AddIngrDialog = ({
    open, onClose
  }: {
    open: boolean,
    onClose: () => void
  }) => {
  
    const emptyIngredientInput: AddIngredientInput = {
      name:  '',
      rating: 0,
      category: ''
    }
    const formInput: AddIngredientInput[] = [emptyIngredientInput]
      
  const formState : AddQuickIngredientsVariables = {
          input: formInput,
      }
  
    const { addQuickIngredients, loading, error } = useAddQuickIngredients({
      onCompleted: () => {},
      },
    );
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Snel ingredienten toevoegen</DialogTitle>
        <DialogContent>
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
            addQuickIngredients({
              variables: {
                  input: values.input,
              },
            });
          }}
        >
          {({ values, handleChange, submitForm, setFieldValue }) => {
            return (
              <>
                <Grid container xs={12} spacing={2}>
                <Grid xs={12}>
                  <FieldArray
                  name="input"
                  render={arrayHelpers => (
                  <div>
                    <TableContainer >
                      <Table>
                        <TableRow>
                          <TableCell>
                            <H5Left title="Ingredient"/>
                          </TableCell>
                          <TableCell>
                          <H5Left title="Categorie"/>
                          </TableCell>
                          <TableCell>
                          <H5Left title="Beoordeling"/>
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                   {values.input?.map((input, index)=> (
                     <TableRow>
                       <>
                          <TableCell>
                          <TextField
                          id={`input.${index}.name`}
                          name={`input.${index}.name`}
                         label="Ingredient"
                         value={input.name}
                         onChange={handleChange}
                          />
                          </TableCell>
                          <TableCell>
                          <TextField
                          id={`input.${index}.category`}
                          name={`input.${index}.category`}
                         label="Categorie"
                         value={input.category}
                         onChange={handleChange}
                          />
                          </TableCell>
                          <TableCell>
                          <TextField
                          id={`input.${index}.rating`}
                          name={`input.${index}.rating`}
                         label="Beoordeling"
                         value={input.rating}
                         onChange={handleChange}
                          />
                          </TableCell>
                          <TableCell>
                          <Button
                              variant="contained" 
                              color="secondary"
                          style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                           onClick={() => {
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
                           arrayHelpers.push(emptyIngredientInput)}}>
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
                  <Grid xs={3}>
                  <Button
                    disabled={loading}
                    onClick={() => {
                      submitForm();
                      onClose();
                    }}
                    color="primary"
                    variant="contained"
                  >
                    Gegevens toevoegen
                  </Button>
                  </Grid> 
                  <Grid xs={3}>
                  <Button
                    disabled={loading}
                    onClick={() => onClose()}
                    color="primary"
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  </Grid> 
                  </Grid>
                  <Grid xs={4}>  
                  {error && (
                    <Typography color="error">
                      Er is een fout opgetreden, probeer het opnieuw.
                    </Typography>
                  )}
                  </Grid>
                  </Grid>
                  </>
                );
              }}
            </Formik>
            </Grid>
            </Grid>
            </Container>
      </DialogContent>
      </Dialog>
    )
  }