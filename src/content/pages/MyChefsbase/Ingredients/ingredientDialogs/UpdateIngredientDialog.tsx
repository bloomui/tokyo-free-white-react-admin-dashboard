import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, Table, TableCell, TableContainer, TableRow, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField, FormFieldEdit } from "src/components/form/FormField";
import { Rating1, RatingEdit } from "../../Menus/filtermenus/components/rating";import { FormikSelect } from "src/components/form/FormikSelect";
import { H3, H5, H5Left } from "src/content/pages/Components/TextTypes";
import { RecipeInput, QuantityToId, StepToMethodInput, DishInput, AddIngredientInput, IngredientInput, QuantityToNutritionInput, NutritionInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { initialValues } from "../../Dishes/filterdishes";
import { UpdateDishVariables } from "../../Dishes/types/UpdateDish";
import { Products } from "../../Menus/filtermenus/components/products";
import { Quantity } from "../../Menus/filtermenus/components/quantity";
import { productToQ } from "../AddIngredient";
import { TableProductData } from "../AddIngredient/component/ProductsTable";
import { useGetIngredientQuery, useUpdateIngredient } from "../api";
import { FilterIngredients_filterIngredients } from "../types/FilterIngredients";
import { UpdateIngredientVariables } from "../types/UpdateIngredient";
import { emptyIngredient } from ".";
import { LoadingScreen } from "src/components/layout";

export const units = ["grams", "mililiter"]


export const UpdateIngredientDialog = ({
    id,
    open,
    onClose,
}: {
  id: string,
    open: boolean,
    onClose: () => void
}) => {

  const { data, loading: loading1, error: error1 } = useGetIngredientQuery(id)

    
    const { updateIngredient, loading, error } = useUpdateIngredient({
        onCompleted: () => window.location.reload(),
      });

      const [selectedProducts, setProducts] = React.useState<productToQ[]>([]);

            function handleDelete(index) {
                selectedProducts.splice(index, 1)
                setProducts([...selectedProducts])
            }
            if (loading1) return <LoadingScreen/>

            let ingredient = data.ingredient

const quantityToNutrition: QuantityToNutritionInput = {
              quantity: ingredient.nutrition.quantity.quantity,
              unit: ingredient.nutrition.quantity.unit,
              nutrition: ingredient.nutrition.nutrition
            }

const formInput: IngredientInput = {
  id: ingredient.id,
  name: ingredient.name,
  rating: ingredient.rating,
  category: ingredient.category,
  nutrition: quantityToNutrition,
}
const formState : UpdateIngredientVariables = {
  input: formInput,
  products: ingredient.products.map((it) => it.id),
}


    return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Formik
        initialValues={formState}
        onSubmit={(values) => {
          updateIngredient({
            variables: {
                products: selectedProducts.map((productToId) => productToId.id),
                input: {
                id: ingredient.id,
                name: values.input.name,
                category: values.input.category,
                rating: values.input.rating,
                nutrition: values.input.nutrition
              },
            },
          });
        }}
      >
        {({ values, submitForm, setFieldValue, handleChange }) => {
          return (
            <>
              <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">
                Ingredient Aanpassen
              </DialogTitle>
              <DialogContent>
              <Grid container xs={12} spacing={2}>
                <Grid xs={3}>
                <H5 title="Ingredientnaam"/>
                <FormFieldEdit
                  placeholder={ingredient.name}
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <H5 title="Categorie"/>
                <FormFieldEdit
                  placeholder={ingredient.category}
                  name="input.category"
                  label="Categorie"
                />
                </Grid> 
                <Grid xs={4}></Grid>
                <Grid xs={3}>
                <RatingEdit
                defaultNumber={ingredient.rating}
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