import { Button, Container, Grid, Table, TableCell, TableContainer, TableRow, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { FieldArray, Formik, useField } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/components/form/FormField";
import { AddProductInput, AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required, Validator } from "src/utilities/formikValidators";
import { user } from "../..";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddProduct } from "../api";
import { Divider } from '@mui/material';
import { AddProductVariables } from "../types/AddProduct";
import { TableSupplierData } from "./components/SuppliersTable";

export const AddProductPage = () => {

    const { addProduct, loading, error } = useAddProduct({
        onCompleted: () => window.location.reload()
        },
      );
      const [stepHere, setStep] = useState(1)
      const [selectedSuppliers, setSuppliers] = React.useState<supplierToQ[]>([]);

    const formInput: AddProductInput = {
        price: 0,
        unit: '',
        quantity: 0,
        brand: '',
        origin: '',
        name: '',
        rating: 0,
    }

            function handleDelete(index) {
              selectedSuppliers.splice(index, 1)
              setSuppliers([...selectedSuppliers])
            }
    
    const formSuppliers: string[] | null = []
        
    
    const formState : AddProductVariables = {
        input: formInput,
        suppliers: formSuppliers,
    }
        
    return (
        <>
        <Helmet>
        <title>Nieuw Product</title>
      </Helmet>
      <PageTitleWrapper>
      <PageHeader
        title="Nieuw product"
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
          addProduct({
            variables: {
                suppliers: selectedSuppliers.map((supplierToId) => supplierToId.id),
                input: {
                name: values.input.name,
                rating: values.input.rating,
                brand: values.input.brand,
                origin: values.input.origin,
                price: values.input.price
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
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={5}>
                <Typography>Geef het merk aan</Typography>
                <FormField
                  name="input.brand"
                  label="Merk"
                />
                </Grid> 
                <Grid xs={5}>
                <Typography>Geef het land van herkomst aan</Typography>
                <FormField
                  name="input.origin"
                  label="Herkomst"
                />
                </Grid> 
                <Grid xs={5}>
                <Typography>Geef de prijs aan</Typography>
                <FormField
                  name="input.price"
                  label="Prijs (€)"
                />
                </Grid> 
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
                </Grid>
                
                <Grid xs={12}></Grid>
                <Divider/>
                <Grid container xs={12}>
                  <Grid xs={6}>
                Leveranciersopties:
                </Grid>
                <Grid xs={6}>
                  <TableContainer>
                <Table size="small">
                  <TableRow>
                    <TableCell>Naam</TableCell>
                    <TableCell>email</TableCell>
                    </TableRow>
                {selectedSuppliers.map((supplier, index) =>  (
                  <TableRow>
                    <TableCell>
                      {supplier.name}
                    </TableCell>
                    <TableCell>
                      {supplier.email}
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
                ))}
                </Table>
                </TableContainer>
                </Grid>
                <Grid xs={6}>
                  <TableSupplierData 
                  setSuppliers={(selected) => setSuppliers([...selectedSuppliers, selected])
                  }/>
                  </Grid>
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

export type supplierToQ = {
  name: string,
  id: string,
  email: string,
}
