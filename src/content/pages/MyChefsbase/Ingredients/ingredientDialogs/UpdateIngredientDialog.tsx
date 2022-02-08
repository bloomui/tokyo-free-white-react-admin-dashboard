import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField, FormFieldEdit } from "src/components/form/FormField";
import { Rating1, RatingEdit } from "../../Menus/filtermenus/components/rating";
import { FormikSelect } from "src/components/form/FormikSelect";
import { H3, H5, H5Left } from "src/content/pages/Components/TextTypes";
import {
  RecipeInput,
  QuantityToId,
  StepToMethodInput,
  DishInput,
  AddIngredientInput,
  IngredientInput,
  QuantityToNutritionInput,
  NutritionInput,
} from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { initialValues } from "../../Dishes/filterdishes";
import { UpdateDishVariables } from "../../Dishes/types/UpdateDish";
import { Products } from "../../Menus/filtermenus/components/products";
import { Quantity } from "../../Menus/filtermenus/components/quantity";
import {
  materialOptions,
  parseMaterialInput,
  productToQ,
} from "../AddIngredient";
import { TableProductData } from "../AddIngredient/component/ProductsTable";
import { useGetIngredientQuery, useUpdateIngredient } from "../api";
import { FilterIngredients_filterIngredients } from "../types/FilterIngredients";
import { UpdateIngredientVariables } from "../types/UpdateIngredient";
import { emptyIngredient } from ".";
import { LoadingScreen } from "src/components/layout";
import {
  ingredient_ingredient_nutrition_nutrition,
  ingredient_ingredient_products,
} from "../types/ingredient";
import { getUnitsForMaterial } from "../../Recipes/AddRecipe/components/IngredientTable";
import { getAvailableUnits } from "../../Recipes/recipeDialogs";

export const UpdateIngredientDialog = ({
  id,
  open,
  onClose,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
}) => {
  const [selectedProducts, setProducts] = React.useState<productToQ[]>([]);

  const {
    data,
    loading: loading1,
    error: error1,
  } = useGetIngredientQuery({
    id: id,
    onCompleted: (result) => {
      setProducts(mapToProductToQ(result.ingredient.products));
    },
  });

  const { updateIngredient, loading, error } = useUpdateIngredient({
    onCompleted: () => window.location.reload(),
  });

  function handleDelete(index) {
    selectedProducts.splice(index, 1);
    setProducts([...selectedProducts]);
  }
  if (loading1) return <LoadingScreen />;

  let ingredient = data.ingredient;

  const quantityToNutrition: QuantityToNutritionInput = {
    quantity: ingredient.nutrition.quantity.quantity,
    unit: ingredient.nutrition.quantity.unit,
    nutrition: mapNutritionToInput(ingredient.nutrition.nutrition),
  };

  const formInput: IngredientInput = {
    id: ingredient.id,
    name: ingredient.name,
    rating: ingredient.rating,
    category: ingredient.category,
    nutrition: quantityToNutrition,
    material: ingredient.material,
  };
  const formState: UpdateIngredientVariables = {
    input: formInput,
    products: ingredient.products.map((it) => it.id),
  };

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
                nutrition: values.input.nutrition,
                material: parseMaterialInput(values.input.material),
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
                    <H5 title="Ingredientnaam" />
                    <FormFieldEdit
                      placeholder={ingredient.name}
                      name="input.name"
                      label="Naam"
                      validator={composeValidators(required)}
                    />
                  </Grid>
                  <Grid xs={1}></Grid>
                  <Grid xs={3}>
                    <H5 title="Meeteenheid" />
                    <FormikSelect validate={required} name="input.material">
                      {materialOptions.map((material) => (
                        <MenuItem value={material} key={material}>
                          {material}
                        </MenuItem>
                      ))}
                    </FormikSelect>
                  </Grid>
                  <Grid xs={1}></Grid>
                  <Grid xs={3}>
                    <H5 title="Categorie" />
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
                    <H5 title="Toevoegen" />
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
                <Divider />
                <Grid xs={12}>
                  <TableContainer>
                    <Table>
                      <TableRow>
                        <TableCell colSpan={6}>
                          <H3 title="Voedingswaarde" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}></TableCell>
                        <TableCell colSpan={2}>
                          <H5Left title="Hoeveelheid" />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <H5Left title="Eenheid" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          Per
                        </TableCell>
                        <TableCell colSpan={2}>
                          <Quantity
                            name="input.nutrition.quantity"
                            setFieldValue={setFieldValue}
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <FormikSelect name="input.nutrition.unit">
                            {getUnitsForMaterial(values.input.material).map(
                              (unit) => (
                                <MenuItem key={unit} value={unit}>
                                  {unit}
                                </MenuItem>
                              )
                            )}
                          </FormikSelect>
                        </TableCell>
                      </TableRow>
                      <TableRow></TableRow>
                      <TableRow>
                        <TableCell>Kilocalorieën</TableCell>
                        <TableCell>
                          <FormField
                            validator={composeValidators(required)}
                            name="input.nutrition.nutrition.kcal"
                            label="Kcal"
                          />
                        </TableCell>
                        <TableCell>Eiwitten</TableCell>
                        <TableCell>
                          <FormField
                            name="input.nutrition.nutrition.prottotal"
                            label="Eiwitten"
                          />
                        </TableCell>
                        <TableCell>Koolhydraten</TableCell>
                        <TableCell>
                          <FormField
                            name="input.nutrition.nutrition.carbscarbs"
                            label="Koolhydraten"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Suikers</TableCell>
                        <TableCell>
                          <FormField
                            name="input.nutrition.nutrition.carbssugar"
                            label="Suikers"
                          />
                        </TableCell>
                        <TableCell>Vetten</TableCell>
                        <TableCell>
                          <FormField
                            name="input.nutrition.nutrition.fatstotal"
                            label="Vetten"
                          />
                        </TableCell>
                        <TableCell>Vezels</TableCell>
                        <TableCell>
                          <FormField
                            name="input.nutrition.nutrition.fibres"
                            label="Vezels"
                          />
                        </TableCell>
                      </TableRow>
                    </Table>
                  </TableContainer>
                </Grid>

                <Divider />
                <Grid container xs={12}>
                  <Grid xs={12}>
                    <H3 title="Productopties" />
                  </Grid>
                  <Grid xs={6}>
                    <TableProductData
                      setProduct={(selected) =>
                        setProducts([...selectedProducts, selected])
                      }
                    />
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
                        {selectedProducts.map((product, index) => (
                          <TableRow>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>{product.origin}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="secondary"
                                style={{
                                  maxWidth: "30px",
                                  maxHeight: "30px",
                                  minWidth: "30px",
                                  minHeight: "30px",
                                }}
                                type="button"
                                onClick={() => {
                                  handleDelete(index);
                                }}
                              >
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

const mapNutritionToInput = (
  nutrition: ingredient_ingredient_nutrition_nutrition
): NutritionInput => {
  return {
    kcal: nutrition.kcal,
    carbscarbs: nutrition.carbs.carbs,
    carbssugar: nutrition.carbs.sugar,
    fatstotal: nutrition.fat.total,
    // fatsfacid: nutrition.fat.,
    // fatstotalfacid: nutrition.fat.fatstotalfacid,
    fatssatured: nutrition.fat.satured,
    fatssingleUnsat: nutrition.fat.singleUnsat,
    fatscompoundUnsat: nutrition.fat.compoundUnsat,
    // fatsn3: nutrition.fats.fatsn3,
    // fatsn6: nutrition.fats.fatsn6,
    // fatsother: nutrition.fat,
    protplant: nutrition.protein.plant,
    protanimal: nutrition.protein.animal,
    prottotal: nutrition.protein.total,
    starch: nutrition.starch,
    polyols: nutrition.polyols,
    fibres: nutrition.fibres,
    nitrogen: nutrition.nitrogen,
    polysachhariden: nutrition.polysachhariden,
    alcohol: nutrition.alcohol,
    water: nutrition.water,
    organicAcids: nutrition.organicAcids,
    vite: nutrition.vitamins.e,
    vitc: nutrition.vitamins.c,
    vitkTotal: nutrition.vitamins.kTotal,
    vitb12: nutrition.vitamins.b12,
    // vitb6: nutrition.vitamins.,
    // vitb2: nutrition.vitamins.b2,
    // vitb1: nutrition.vitamins.b1,
    // vitk2: nutrition.vitamins.k2,
    // vitk1: nutrition.vitamins.k1,
    // vitcholecalciferolE: nutrition.vitamins.c,
    // vithidro25D: nutrition.vithidro25D,
    vitdTotal: nutrition.vitamins.dTotal,
    foliumAcid: nutrition.foliumAcid,
    pholate: nutrition.pholate,
    pholatEquivalents: nutrition.pholatEquivalents,
    nicotinAcid: nutrition.nicotinAcid,
    // tocoalfa: nutrition..alfa,
    // tocobeta: nutrition.toco.beta,
    // tocogamma: nutrition.toco.gamma,
    // tocodelta: nutrition.toco.delta,
    lycopeans: nutrition.lycopeans,
    betaCrypto: nutrition.betaCrypto,
    zeacanthine: nutrition.zeacanthine,
    lutein: nutrition.lutein,
    // caralfa: nutrition.,
    // carbeta: nutrition.carbeta,
    // retrae: nutrition.ret,
    // retre: nutrition.retre,
    // rettotal: nutrition.rettotal,
    ash: nutrition.ash,
    jodium: nutrition.jodium,
    sink: nutrition.sink,
    selenium: nutrition.selenium,
    cupper: nutrition.cupper,
    irontotal: nutrition.iron.total,
    // ironnonhaem: nutrition.iron,
    // ironhaem: nutrition.ironhaem,
    magnesium: nutrition.magnesium,
    fosfor: nutrition.fosfor,
    calcium: nutrition.calcium,
    kalium: nutrition.kalium,
    natrium: nutrition.natrium,
    cholesterol: nutrition.cholesterol,
    famstxr: nutrition.famstxr,
  };
};

const mapToProductToQ = (a: ingredient_ingredient_products[]): productToQ[] => {
  const map = a.map((product) => ({
    name: product.name,
    id: product.id,
    brand: "",
    origin: "",
    price: 0,
    quantity: 0,
    unit: "",
  }));
  return map;
};
