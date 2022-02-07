import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  TextFieldProps,
  Typography,
} from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import { H3, H5Left } from "src/content/pages/Components/TextTypes";
import { FormField } from "src/content/pages/SignIn";
import { AddIngredientInput, Material } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { materialOptions } from "../../../Ingredients/AddIngredient";
import { Quantity } from "../../../Menus/filtermenus/components/quantity";
import { zeroNutrition, zeroNutritionInput } from "../../recipeDialogs";
import { useAddQuickIngredients } from "../api";
import { AddQuickIngredientsVariables } from "../types/AddQuickIngredients";
import { getUnitsForMaterial } from "./IngredientTable";

export const AddIngrDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [nutr, setNutr] = useState(false);

  const emptyIngredientInput: AddIngredientInput = {
    name: "",
    rating: 0,
    category: "",
    material: Material.SOLID,
    nutrition: {
      quantity: 100.0,
      unit: "gram",
      nutrition: zeroNutritionInput,
    },
  };
  const formInput: AddIngredientInput[] = [emptyIngredientInput];

  const formState: AddQuickIngredientsVariables = {
    input: formInput,
  };

  const { addQuickIngredients, loading, error } = useAddQuickIngredients({
    onCompleted: () => {},
  });

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
                            render={(arrayHelpers) => (
                              <div>
                                <TableContainer>
                                  <Table>
                                    <TableRow>
                                      <TableCell>
                                        <H5Left title="Ingredient" />
                                      </TableCell>
                                      <TableCell>
                                        <H5Left title="Categorie" />
                                      </TableCell>
                                      <TableCell>
                                        <H5Left title="Beoordeling" />
                                      </TableCell>
                                      <TableCell></TableCell>
                                      <TableCell></TableCell>
                                    </TableRow>
                                    {values.input?.map((input, index) => (
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
                                            <FormikSelect
                                              name={`input.${index}.material`}
                                            >
                                              {materialOptions.map((unit) => (
                                                <MenuItem
                                                  key={unit}
                                                  value={unit}
                                                >
                                                  {unit}
                                                </MenuItem>
                                              ))}
                                            </FormikSelect>
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
                                              onClick={() => setNutr(true)}
                                              variant="outlined"
                                            >
                                              Voedingswaarden toevoegen
                                            </Button>
                                          </TableCell>
                                          <Grid xs={12}>
                                            <InsertNutritionHere
                                              material={
                                                values.input[index].material
                                              }
                                              open={nutr}
                                              onClose={() => setNutr(false)}
                                              index={index}
                                              onChange={handleChange}
                                            />
                                          </Grid>
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
                                                arrayHelpers.remove(index);
                                              }}
                                            >
                                              -
                                            </Button>
                                          </TableCell>
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
                                                arrayHelpers.push(
                                                  emptyIngredientInput
                                                );
                                              }}
                                            >
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
                              Toevoegen
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
  );
};

const InsertNutritionHere = ({
  material,
  open,
  onClose,
  index,
  onChange,
}: {
  material: Material;
  open: boolean;
  onClose: () => void;
  index: number;
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogActions>
        <Button onClick={() => onClose()}>-</Button>
      </DialogActions>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableRow>
              <TableCell colSpan={6}>
                <H3 title="Voedingswaarden " />
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
                <FormField
                  name={`input.${index}.nutrition.quantity`}
                  label="Hoeveelheid"
                  validator={composeValidators(required)}
                />
              </TableCell>
              <TableCell colSpan={2}>
                <FormikSelect name={`input.${index}.nutrition.unit`}>
                  {getUnitsForMaterial(material).map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </FormikSelect>
              </TableCell>
            </TableRow>
            <TableRow></TableRow>
            <TableRow>
              <TableCell>Kilocalorieën</TableCell>
              <TableCell>
                <FormField
                  name={`input.${index}.nutrition.nutrition.kcal`}
                  label="Kilocalorieën"
                  validator={composeValidators(required)}
                />
              </TableCell>
              <TableCell>Eiwitten</TableCell>
              <TableCell>
                <FormField
                  name={`input.${index}.nutrition.nutrition.prottotal`}
                  label="Kilocalorieën"
                  validator={composeValidators(required)}
                />
              </TableCell>
              <TableCell>Koolhydraten</TableCell>
              <TableCell>
                <FormField
                  name={`input.${index}.nutrition.nutrition.carbscarbs`}
                  label="Kilocalorieën"
                  validator={composeValidators(required)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Suikers</TableCell>
              <TableCell>
                <FormField
                  name={`input.${index}.nutrition.nutrition.carbssugar`}
                  label="Kilocalorieën"
                  validator={composeValidators(required)}
                />
              </TableCell>
              <TableCell>Vetten</TableCell>
              <TableCell>
                <FormField
                  name={`input.${index}.nutrition.nutrition.fatstotal`}
                  label="Kilocalorieën"
                  validator={composeValidators(required)}
                />
              </TableCell>
              <TableCell>Vezels</TableCell>
              <TableCell>
                <FormField
                  name={`input.${index}.nutrition.nutrition.fibres`}
                  label="Kilocalorieën"
                  validator={composeValidators(required)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <Button onClick={() => onClose()}>+</Button>
            </TableRow>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};
