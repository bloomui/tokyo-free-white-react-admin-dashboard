import { Button, Container, Grid, Table, TableCell, TableContainer, TableRow, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { FieldArray, Formik, useField } from "formik";
import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { AddSupplierInput } from "src/globalTypes";
import { user } from "../..";
import { H5Left } from "src/content/pages/Components/TextTypes";
import { useAddSuppliers } from "./api";
import { AddSuppliersVariables } from "./types/AddSuppliers";

export const AddSupplierPage = () => {

    
    const { addSuppliers, loading, error } = useAddSuppliers({
        onCompleted: () => {window.location.reload()},
      });


      const emptyAddSupplierInput: AddSupplierInput = {
        email: '',
        name: '',
        rating: 0,
      }
    const formInput: AddSupplierInput[] = [emptyAddSupplierInput]
    
const formState : AddSuppliersVariables = {
        input: formInput,
    }

    return (
        <>
        <Helmet>
        <title>Nieuwe leveranciers</title>
      </Helmet>
      <PageTitleWrapper>
      <PageHeader
        title="Nieuwe leverancier"
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
                  onClick={() => submitForm()}
                  color="primary"
                  variant="contained"
                >
                  Gegevens toevoegen
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
          </>
              )
    }