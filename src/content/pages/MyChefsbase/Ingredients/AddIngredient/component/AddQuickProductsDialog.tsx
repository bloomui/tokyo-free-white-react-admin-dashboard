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
import { H3, H5Left } from "src/content/pages/Components/TextTypes";
import { AddProductInput, Material } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../../Menus/filtermenus/components/rating";
import { getUnitsForMaterial } from "../../../Recipes/AddRecipe/components/IngredientTable";
import { useAddQuickProducts } from "../api";
import { AddQuickProductsVariables } from "../types/AddQuickProducts";

export const AddQuickProductsDialog = ({
  material,
  open,
  onClose,
}: {
  material: Material;
  open: boolean;
  onClose: () => void;
}) => {
  const [info, setInfo] = useState(false);

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
    onCompleted: () => {},
    //   window.location.reload()
  });
  const unitsForMaterial = getUnitsForMaterial(material);

  return (
    <Dialog
      PaperProps={{ sx: { width: "200%", height: "30%" } }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Snel Producten toevoegen</DialogTitle>
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
                                        <H5Left title="Merk" />
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
                                              label="Product"
                                              value={input.name}
                                              onChange={handleChange}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <TextField
                                              id={`input.${index}.brand`}
                                              name={`input.${index}.brand`}
                                              label="Merk"
                                              value={input.brand}
                                              onChange={handleChange}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <Rating1
                                              updateField={`input.${index}.rating`}
                                              setFieldValue={setFieldValue}
                                            />
                                            {/* <TextField
                                              id={`input.${index}.rating`}
                                              name={`input.${index}.rating`}
                                              label="Beoordeling"
                                              value={input.rating}
                                              onChange={handleChange}
                                            /> */}
                                          </TableCell>
                                          <TableCell>
                                            <Button
                                              onClick={() => setInfo(true)}
                                              variant="outlined"
                                            >
                                              Product toevoegen
                                            </Button>
                                          </TableCell>
                                          <Grid xs={12}>
                                            <InsertInfoHere
                                              unitsForMaterial={
                                                unitsForMaterial
                                              }
                                              open={info}
                                              onClose={() => setInfo(false)}
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
                                                  emptyProductInput
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

const InsertInfoHere = ({
  unitsForMaterial,
  open,
  onClose,
  index,
  onChange,
}: {
  unitsForMaterial: string[];
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
                <H3 title="Product informatie" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell colSpan={2}>
                <H5Left title="Herkomst" />
              </TableCell>
              <TableCell colSpan={2}>
                <H5Left title="Prijs" />
              </TableCell>
              <TableCell colSpan={2}>
                <H5Left title="Hoeveelheid" />
              </TableCell>
              <TableCell colSpan={2}>
                <H5Left title="Eenheid" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <FormField
                  name={`input.${index}.origin`}
                  label="Herkomst"
                  validator={composeValidators(required)}
                />
              </TableCell>
              <TableCell colSpan={2}>
                <FormField
                  name={`input.${index}.price`}
                  label="Prijs"
                  validator={composeValidators(required)}
                />
              </TableCell>
              <TableCell colSpan={2} align="center">
                Per
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
                  {unitsForMaterial.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </FormikSelect>
              </TableCell>
              <Button onClick={() => onClose()}>+</Button>
            </TableRow>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};
