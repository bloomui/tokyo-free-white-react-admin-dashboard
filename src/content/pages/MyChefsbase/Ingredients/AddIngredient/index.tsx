import { Button, Container, Grid, MenuItem, Table, TableCell, TableContainer, TableRow, TextField, TextFieldProps, Typography } from "@material-ui/core";
import { FieldArray, Formik, useField } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/components/form/FormField";
import { AddIngredientInput, AddProductInput, AddRecipeInput, NutritionInput, QuantityToId, QuantityToNutritionInput, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required, Validator } from "src/utilities/formikValidators";
import { user } from "../..";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddIngredient } from "../api";
import { Divider } from '@mui/material';import { AddIngredientVariables } from "../types/AddIngredient";
import { TableProductData } from "./component/ProductsTable";
import { units } from "../ingredientDialogs/UpdateIngredientDialog";
import { FormikSelect } from "src/components/form/FormikSelect";
import { H3, H5, H5Left } from "src/content/pages/Components/TextTypes";
import { Quantity } from "../../Menus/filtermenus/components/quantity";

export const emptyNutrition: NutritionInput = {
  kcal: 0,
  prottotal: 0,
  fatstotal: 0,
  carbscarbs: 0,
  carbssugar: 0,
  fibres: 0
}
export const emptyQuantityToNutrition: QuantityToNutritionInput = {
  quantity: 0,
  unit: '',
  nutrition: emptyNutrition
}

export const AddIngredientPage = () => {

    const { addIngredient, loading, error } = useAddIngredient({
        onCompleted: () => {window.location.reload()}
        },
      );
      const [stepHere, setStep] = useState(1)
      const [selectedProducts, setProducts] = React.useState<productToQ[]>([]);

      const formInput: AddIngredientInput = {
        name: '',
        rating: 0,
        category: '',
        nutrition: emptyQuantityToNutrition,
      }

            function handleDelete(index) {
                selectedProducts.splice(index, 1)
                setProducts([...selectedProducts])
            }
    
    const formProducts: string[] | null = []
        
    
    const formState : AddIngredientVariables = {
        input: formInput,
        products: formProducts,
    }
        
    return (
        <>
        <Helmet>
        <title>Nieuw Ingredient</title>
      </Helmet>
      <PageTitleWrapper>
      <PageHeader
        title="Nieuw Ingredient"
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
            addIngredient({
            variables: {
                products: selectedProducts.map((productToId) => productToId.id),
                input: {
                name: values.input.name,
                rating: values.input.rating,
                category: values.input.category,
                nutrition: values.input.nutrition              
            },
            },
          });
        }}
      >
        {({ values, handleChange, submitForm, setFieldValue }) => {
          return (
            <>
            <Grid container xs={12} spacing={2}>
                <Grid xs={3}>
                <H5 title="Ingredientnaam"/>
                <FormField
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <H5 title="Categorie"/>
                <FormField
                  name="input.category"
                  label="Categorie"
                />
                </Grid> 
                <Grid xs={4}></Grid>
                <Grid xs={3}>
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
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
                </Grid>
                <Divider/>
                <Grid xs={12}>
                <TableContainer>
                    <Table>
                        <TableRow>
                            <TableCell colSpan={6}>
                            <H3 title="Voedingswaarde"/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell colSpan={2}></TableCell>
                            <TableCell colSpan={2}>
                            <H5Left title="Hoeveelheid"/>
                            </TableCell>
                            <TableCell colSpan={2}>
                            <H5Left title="Eenheid"/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell colSpan={2} align="center">Per</TableCell>
                        <TableCell colSpan={2}>
                        <Quantity
                  name="input.nutrition.quantity"
                  setFieldValue={setFieldValue}
                />
                            </TableCell>
                            <TableCell colSpan={2}>
                            <FormikSelect
                      name="input.nutrition.unit"
                      >
              {units.map((unit) => (
                <MenuItem key={unit} value={unit}>{unit}</MenuItem>
              ))}
            </FormikSelect>
                            </TableCell>
                        </TableRow>
                        <TableRow></TableRow>
                        <TableRow>
                      <TableCell>Kilocalorieën</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.kcal"
                  label="Kcal"
                /></TableCell>
                      <TableCell>Eiwitten</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.prottotal"
                  label="Eiwitten"
                /></TableCell>
                      <TableCell>Koolhydraten</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.carbscarbs"
                  label="Koolhydraten"
                /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Suikers</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.carbssugar"
                  label="Suikers"
                /></TableCell>
                      <TableCell>Vetten</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.fatstotal"
                  label="Vetten"
                /></TableCell>
                      <TableCell>Vezels</TableCell>
                      <TableCell><FormField
                  name="input.nutrition.nutrition.fibres"
                  label="Vezels"
                /></TableCell>
                    </TableRow>
                    </Table>
                    </TableContainer>
                    </Grid>
          
                <Divider/>
                <Grid container xs={12}>
                  <Grid xs={12}>
                <H3 title="Productopties"/>
                </Grid>
                <Grid xs={6}>
                  <TableProductData 
                  setProduct={(selected) => setProducts([...selectedProducts, selected])
                  }/>
                  </Grid>
                <Grid xs={6}>
                  <TableContainer>
                <Table size="small">
                  <TableRow>
                    <TableCell>Naam</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>Herkomst</TableCell>
                    <TableCell>Prijs</TableCell>
                    </TableRow>
                {selectedProducts.map((product, index) =>  (
                  <TableRow>
                    <TableCell>
                      {product.name}
                    </TableCell>
                    <TableCell>
                      {product.brand}
                    </TableCell>
                    <TableCell>
                      {product.origin}
                    </TableCell>
                    <TableCell>
                      {product.price}
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

export type productToQ = {
  name: string,
  id: string,
  brand: string,
  origin: string,
  price: number,
  quantity: number,
  unit: string,
}
