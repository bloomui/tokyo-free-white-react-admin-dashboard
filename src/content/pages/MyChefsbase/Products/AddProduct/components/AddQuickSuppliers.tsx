import { Button, Container, Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableCell, TableContainer, TableRow, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React from "react";
import { H5Left } from "src/content/pages/Components/TextTypes";
import { AddSupplierInput } from "src/globalTypes";
import { useAddSuppliers } from "../../../Suppliers/AddSupplier/api";
import { AddSuppliersVariables } from "../../../Suppliers/AddSupplier/types/AddSuppliers";

export const AddSuppliersDialog = ({
    open, onClose
  }: {
    open: boolean,
    onClose: () => void
  }) => {
  
    const emptyAddSupplierInput: AddSupplierInput = {
      name:  '',
      rating: 0,
      email: '',
    }
    const formInput: AddSupplierInput[] = [emptyAddSupplierInput]
      
  const formState : AddSuppliersVariables = {
          input: formInput,
      }
  
    const { addSuppliers, loading, error } = useAddSuppliers({
      onCompleted: () => {},
      },
    );
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Leveranciers toevoegen</DialogTitle>
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
          addSuppliers({
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
                          <H5Left title="Naam"/>
                        </TableCell>
                        <TableCell>
                        <H5Left title="Email"/>
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
                       label="Naam"
                       value={input.name}
                       onChange={handleChange}
                        />
                        </TableCell>
                        <TableCell>
                        <TextField
                        id={`input.${index}.email`}
                        name={`input.${index}.email`}
                       label="Email"
                       value={input.email}
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
                         arrayHelpers.push(emptyAddSupplierInput)}}>
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
                }
              }
                  color="primary"
                  variant="contained"
                >
                  Toevoegen
                </Button>
                </Grid> 
                <Grid xs={3}>
                <Button
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