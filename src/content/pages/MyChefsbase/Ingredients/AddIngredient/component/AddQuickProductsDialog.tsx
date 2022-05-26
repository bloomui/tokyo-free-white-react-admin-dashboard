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
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { H3, H5, H5Left } from "src/content/pages/Components/TextTypes";
import { AddProductInput, Material } from "src/globalTypes";
import { composeValidators, mustBeNumber, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../../Menus/filtermenus/components/rating";
import { getUnitsForMaterial, units } from "../../../Recipes/AddRecipe/components/IngredientTable";
import { useAddQuickProducts } from "../api";
import { AddQuickProductsVariables } from "../types/AddQuickProducts";

export const AddQuickProductsDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {

  const emptyProductInput: AddProductInput = {
    name: "",
    rating: 0,
    price: 0.0,
    quantity: 0.0,
    unit: "gram",
    brand: "",
    origin: "",
  };
  const formInput: AddProductInput[] = [emptyProductInput];

  const formState: AddQuickProductsVariables = {
    input: formInput,
  };

  const { addQuickProducts, loading, error } = useAddQuickProducts({
    onCompleted: () => {window.location.reload()}
  });

  return (
    <Dialog
      PaperProps={{ sx: { width: "200%", height: "30%" } }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle><H5 title="Snel Producten toevoegen"/></DialogTitle>
      <DialogContent>
      <Formik
                initialValues={formState}
                onSubmit={(values) => {
                  addQuickProducts({
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
                                        <H5Left title="Product" />
                                      </TableCell>
                                      <TableCell>
                                        <H5Left title="Prijs" />
                                      </TableCell>
                                      <TableCell></TableCell>
                                      <TableCell></TableCell>
                                    </TableRow>
                                    {values.input?.map((input, index) => (
                                      <>
                                      <TableRow>
                                        <>
                                          <TableCell>
                                            <TextField
                                              id={`input.${index}.name`}
                                              name={`input.${index}.name`}
                                              label="Product"
                                              value={input.name}
                                              onChange={handleChange}
                                            />
                                          </TableCell>
                                          <TableCell>
                                          <FormField
                  name={`input.${index}.price`}
                  label="Prijs (€)"
                  validator={composeValidators(required, mustBeNumber)}
                />
                                          </TableCell>
                                          <TableCell colSpan={2}>
                <FormField
                  name={`input.${index}.quantity`}
                  label="Hoeveelheid"
                  validator={composeValidators(required)}
                />
              </TableCell>
              <TableCell colSpan={2}>
                <FormikSelect name={`input.${index}.unit`}>
                  {units.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </FormikSelect>
              </TableCell>
              </>
              </TableRow>
              <TableRow>
                <TableCell>
                <Rating1
                updateField={`input.${index}.rating`}
                setFieldValue={setFieldValue}
              />
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
                                                  emptyProductInput
                                                );
                                              }}
                                            >
                                              +
                                            </Button>
                                          </TableCell>
                                          </TableRow>
                                          </>
                                    ))}
                                  </Table>
                                </TableContainer>
                              </div>
                            )}
                          />
                          </Grid>
                          <Grid container xs={12}>
                          <Grid xs={5}>
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
                          <Grid xs={2}></Grid>
                          <Grid xs={5}>
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
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
};
