import {
  Button,
  Container,
  Grid,
  MenuItem,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  TextFieldProps,
  Typography,
} from "@material-ui/core";
import { FieldArray, Formik, useField } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/components/form/FormField";
import {
  AddIngredientInput,
  Material,
  NutritionInput,
  QuantityToNutritionInput,
} from "src/globalTypes";
import {
  composeValidators,
  required,
} from "src/utilities/formikValidators";
import { user } from "../..";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddIngredient } from "../api";
import { Divider } from "@mui/material";
import { AddIngredientVariables } from "../types/AddIngredient";
import { TableProductData } from "./component/ProductsTable";
import { FormikSelect } from "src/components/form/FormikSelect";
import { H3, H5 } from "src/content/pages/Components/TextTypes";
import { useNavigate } from "react-router";
import { AddQuickProductsDialog } from "./component/AddQuickProductsDialog";
import { InsertNutrition } from "./component/AddNutrition";

export const materialOptions = ["In gram", "In liters", "In stuks"];
export const parseMaterialInput = (a: string): Material => {
  var result;
  switch (a) {
    case "In gram":
      result = Material.SOLID;
      break;
    case "In liters":
      result = Material.LIQUID;
      break;
    default:
      result = Material.UNIT;
  }

  return result;
};

export const emptyNutrition: NutritionInput = {
  kcal: 0,
  prottotal: 0,
  fatstotal: 0,
  carbscarbs: 0,
  carbssugar: 0,
  fibres: 0,
};
export const emptyQuantityToNutrition: QuantityToNutritionInput = {
  quantity: 0,
  unit: "",
  nutrition: emptyNutrition,
};

export const AddIngredientPage = () => {
  const [dialog, openDialog] = useState(false);

  const { addIngredient, loading, error } = useAddIngredient({
    onCompleted: () => {
      window.location.reload();
    },
  });
  const navigate = useNavigate();

  const [selectedProducts, setProducts] = React.useState<productToQ[]>([]);

  const formInput: AddIngredientInput = {
    name: "",
    rating: 0,
    category: "",
    nutrition: emptyQuantityToNutrition,
    material: Material.SOLID,
  };

  function handleDelete(index) {
    selectedProducts.splice(index, 1);
    setProducts([...selectedProducts]);
  }

  const formProducts: string[] | null = [];

  const formState: AddIngredientVariables = {
    input: formInput,
    products: formProducts,
  };

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
                    products: selectedProducts.map(
                      (productToId) => productToId.id
                    ),
                    input: {
                      name: values.input.name,
                      rating: values.input.rating,
                      category: values.input.category,
                      nutrition: values.input.nutrition,
                      material: parseMaterialInput(values.input.material),
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
                        <H5 title="Ingredientnaam" />
                        <FormField
                          name="input.name"
                          label="Naam"
                          validator={composeValidators(required)}
                        />
                      </Grid>
                      <Grid xs={1}></Grid>
                      <Grid xs={3}>
                        <H5 title="Categorie" />
                        <FormField name="input.category" label="Categorie" />
                      </Grid>
                      <Grid xs={4}></Grid>
                      <Grid xs={3}>
                        <H5 title="Soort" />
                        <FormikSelect validate={required} name="input.material">
                          {materialOptions.map((material) => (
                            <MenuItem value={material} key={material}>
                              {material}
                            </MenuItem>
                          ))}
                        </FormikSelect>
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
                      <InsertNutrition
                        material={values.input.material}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Divider />
                    <Grid container xs={12}>
                      <Grid xs={12}>
                        <H3 title="Productopties" />
                      </Grid>
                      <Grid xs={12}></Grid>
                      <Grid xs={6}>
                        <Grid xs={12}>
                          <Button
                            onClick={() => openDialog(true)}
                            color="primary"
                            variant="contained"
                          >
                            Snel producten toevoegen
                          </Button>
                        </Grid>
                        <AddQuickProductsDialog
                          material={values.input.material}
                          open={dialog}
                          onClose={() => openDialog(false)}
                        />
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
                  </>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export type productToQ = {
  name: string;
  id: string;
  brand: string;
  origin: string;
  price: number;
  quantity: number;
  unit: string;
};
