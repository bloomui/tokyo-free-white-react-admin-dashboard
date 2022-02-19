import { useQuery } from "@apollo/client";
import {
  Button,
  Checkbox,
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
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { Typography } from "@mui/material";
import { Formik, useField } from "formik";
import React, { useState } from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import { LoadingScreen } from "src/components/layout";
import { Material } from "src/globalTypes";
import { formikFieldErrorProps } from "src/utilities/formikError";
import {
  composeValidators,
  required,
  Validator,
} from "src/utilities/formikValidators";
import { ingredientToQ } from "..";
import { AutoSubmitToken } from "../../../Menus/filtermenus";
import { Search } from "../../../Menus/filtermenus/components/search";
import { ingredientRowsPerPage, useSearchIngredientQuery } from "../api";
import { ingredients_ingredients } from "../types/ingredients";

export const units = [
  "milligram",
  "gram",
  "kilogram",
  "milliliter",
  "liter",
  "stuk(s)",
];
export const unitsSolid = ["milligram", "gram", "kilogram"];
export const unitsLiquid = ["milliliter", "liter"];
export const unitsUnit = ["stuk(s)"];

export const getUnitsForMaterial = (material: Material): string[] => {
  var result;
  switch (material) {
    case Material.SOLID:
      result = unitsSolid;
      break;
    case Material.LIQUID:
      result = unitsLiquid;
      break;
    default:
      result = unitsUnit;
  }

  return result;
};

export const TableData = ({
  setIngredients,
}: {
  setIngredients: (selected: ingredientToQ) => void;
}) => {
  const [exactBoolean, setExact] = React.useState(0);

  const [pageNumber, setPageNumber] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage as number);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const [name, setName] = useState<string>();

  const [page, setPage] = useState<number>(0);

  const { loading, data, error, refetch } = useSearchIngredientQuery({
    exact: exactBoolean,
    name: name,
    page: page,
  });
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableRow>
          <Grid container spacing={2} xs={12}>
            <Grid key={0} item>
              <Typography>Zoek op naam:</Typography>
              <TextField
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    refetch({ name: name });
                  }
                }}
                fullWidth
                placeholder="Zoek op naam"
                onChange={(e) => setName(e.target.value)}
              />
              Zoek exact:{" "}
              <Checkbox
                color="primary"
                checked={exactBoolean == 0 ? false : true}
                onChange={(event, value) => {
                  value == true ? setExact(1) : setExact(0);
                }}
              />
            </Grid>
          </Grid>
        </TableRow>
        <TableRow>
          <TableCell>Ingredient</TableCell>
          <TableCell>Categorie</TableCell>
          <TableCell>Voeg toe</TableCell>
        </TableRow>
        {data.ingredients.map((ingredient) => (
          <Row
            data={ingredient}
            setIngredient={(a: ingredientToQ) => setIngredients(a)}
          />
        ))}
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component={Paper}
        count={data.numberOfIngredients}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

const Row = ({
  data,
  setIngredient,
}: {
  data: ingredients_ingredients;
  setIngredient: (a) => void;
}) => {
  const formState: { quantity: string; unit: string } = {
    quantity: "",
    unit: "",
  };
  const unitsForMaterial = getUnitsForMaterial(data.material);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Formik
      initialValues={formState}
      onSubmit={(values) => {
        setIngredient({ name: data.name, id: data.id, ...values });
      }}
    >
      {({ setFieldValue, submitForm }) => {
        return (
          <>
            <TableRow>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.category}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  color="primary"
                  variant="outlined"
                >
                  +
                </Button>
              </TableCell>
            </TableRow>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogActions>
                <Grid xs={12}>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                    color="primary"
                    variant="outlined"
                  >
                    Terug
                  </Button>
                </Grid>
              </DialogActions>
              <DialogContent>
                <Table>
                  <TableHead>
                    <TableCell>Hoeveelheid</TableCell>
                    <TableCell>Eenheid</TableCell>
                  </TableHead>
                  <TableRow>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        onChange={(e) =>
                          setFieldValue("quantity", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <FormikSelect name="unit">
                        {unitsForMaterial.map((unit) => (
                          <MenuItem key={unit} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </FormikSelect>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          submitForm();
                          setOpen(false);
                        }}
                        color="primary"
                        variant="outlined"
                      >
                        Voeg Toe
                      </Button>
                    </TableCell>
                  </TableRow>
                </Table>
                <Grid container spacing={2} xs={12}>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </>
        );
      }}
    </Formik>
  );
};
