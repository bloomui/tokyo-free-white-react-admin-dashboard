import { Button, Container, Grid, Table, TableCell, TableContainer, TableRow, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { FieldArray, Formik, useField } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/components/form/FormField";
import { AddProductInput, AddRecipeInput, AddSupplierInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required, Validator } from "src/utilities/formikValidators";
import { user } from "../..";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddSupplier } from "../api";
import { AddSupplierVariables } from "../types/AddSupplier";

export const AddSupplierPage = () => {

    
    const { addSupplier, loading, error } = useAddSupplier({
        onCompleted: () => {window.location.reload()},
      });

    const formInput: AddSupplierInput = {
        email: '',
        name: '',
        rating: 0,
    }
const formState : AddSupplierVariables = {
        input: formInput,
    }

    return (
        <>
        <Helmet>
        <title>Nieuwe leverancier</title>
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
          <Grid item xs={12}></Grid>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          addSupplier({
            variables: {
                input: {
                name: values.input.name,
                email: values.input.email,
              },
            },
          });
        }}
      >
        {({ values, handleChange, submitForm, setFieldValue }) => {
          return (
            <>
              <Grid container xs={12} spacing={2}>
                <Grid xs={5}>
                <Typography>Geef een productnaam op</Typography>
                <FormField
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                <FormField
                  name="input.email"
                  label="Email"
                  validator={composeValidators(required)}
                />
                <Grid xs={5}>
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
                </Grid>
                </Grid>
                </>
              );
            }}
          </Formik>
          </Grid>
          </Container>
          </>
              )
    }