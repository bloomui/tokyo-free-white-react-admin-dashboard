import {
  Button,
  Container,
  Dialog,
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
import React from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import { H5Left } from "src/content/pages/Components/TextTypes";
import { AddProductInput, Material } from "src/globalTypes";
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
                                        <H5Left title="Hoeveelheid" />
                                      </TableCell>
                                      <TableCell>
                                        <H5Left title="Eenheid" />
                                      </TableCell>
                                      <TableCell>
                                        <H5Left title="Herkomst" />
                                      </TableCell>
                                      <TableCell>
                                        <H5Left title="Merk" />
                                      </TableCell>
                                      <TableCell>
                                        <H5Left title="Prijs (€)" />
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
                                              id={`input.${index}.quantity`}
                                              name={`input.${index}.quantity`}
                                              label="Hoeveelheid"
                                              value={input.quantity}
                                              onChange={handleChange}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <FormikSelect
                                              name={`input.${index}.unit`}
                                            >
                                              {unitsForMaterial.map((unit) => (
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
                                              id={`input.${index}.origin`}
                                              name={`input.${index}.origin`}
                                              label="Herkomst"
                                              value={input.origin}
                                              onChange={handleChange}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <TextField
                                              id={`input.${index}.brand`}
                                              name={`input.${index}.brand`}
                                              label="Merk"
                                              value={input.origin}
                                              onChange={handleChange}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <TextField
                                              id={`input.${index}.price`}
                                              name={`input.${index}.price`}
                                              label="Prijs"
                                              value={input.price}
                                              fullWidth
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
