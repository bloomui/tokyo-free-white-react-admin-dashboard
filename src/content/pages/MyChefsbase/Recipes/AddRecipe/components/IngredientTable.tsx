import { useQuery } from "@apollo/client";
import { Button, Grid, MenuItem, Paper, Table, TableCell, TableContainer, TablePagination, TableRow, TextField, TextFieldProps } from "@material-ui/core";
import { Typography } from "@mui/material";
import { Formik, useField } from "formik";
import React, { useState } from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import { LoadingScreen } from "src/components/layout";
import { formikFieldErrorProps } from "src/utilities/formikError";
import { composeValidators, required, Validator } from "src/utilities/formikValidators";
import { ingredientToQ } from "..";
import { AutoSubmitToken } from "../../../Menus/filtermenus";
import { Search } from "../../../Menus/filtermenus/components/search";
import { ingredientRowsPerPage, useSearchIngredientQuery } from "../api";
import { ingredients_ingredients } from "../types/ingredients";

export const units = ["gram", "miligram", "kilogram", "theelepel(s)", "eetlepel(s)", "stuk(s)", "mililiter", "liter"]

export  const TableData = ({
  setIngredients
}: {
  setIngredients: (selected: ingredientToQ) => void
}) => {
    const [pageNumber, setPageNumber] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (
        event: any,
        newPage: React.SetStateAction<number>
      ) => {
        setPage(newPage as number);
      };
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPageNumber(0);
        };

    const [name, setName] = useState<string>()

    const nameForm = {
        name: ''
    }
    const [page, setPage] = useState<number>(0)

  const { loading, data, error, refetch } = useSearchIngredientQuery({
    name: name,
    page: page
    });
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <TableContainer component={Paper}>
          <Table size="small">
              <TableRow>
              <Formik
        initialValues={nameForm}
        onSubmit={(values) => {
         refetch({name: values.name})
        }}
        >
        {({ setFieldValue, submitForm }) => {
          return (
            <>
            <Grid container spacing={2} xs={12}>
 <Grid key={0} item>
   <Typography>Zoek op naam:</Typography> 
 <TextField
      onBlur={refetch}
      fullWidth
      placeholder="Zoek op naam"
onChange={(e) => setFieldValue("name", e.target.value)}    />
    </Grid>
    </Grid>
              {/* <Search
              placeholder="Zoek op naam" setFieldValue={setFieldValue}
              /> */}
        {/* <AutoSubmitToken /> */}
    </>
          )
        }}
        </Formik>
              </TableRow>
        <TableRow>
          <TableCell>Ingredient</TableCell>
          <TableCell>Categorie</TableCell>
          <TableCell>Hoeveelheid</TableCell>
          <TableCell>Eenheid</TableCell>
          <TableCell>Voeg toe</TableCell>
        </TableRow>
        {data.ingredients.map((ingredient) => (
          <Row 
          data={ingredient}
          setIngredient={(a: ingredientToQ) => setIngredients(a)}/>
        ))}
        </Table>
        <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component={Paper}
              count={data.numberOfIngredients ? data.numberOfIngredients : 1000}
              rowsPerPage={ingredientRowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </TableContainer>
  )
}

const Row = ({data, setIngredient}: {data: ingredients_ingredients, setIngredient: (a) => void}) => {

  const formState: ingredientToQ = {
  name: data.name,
  id: data.id,
  quantity: '',
  unit: ''
}

  return (
    <Formik
        initialValues={formState}
        onSubmit={(values) => {
          setIngredient(values);
        }}
      >
        {({ setFieldValue, submitForm }) => {
      return (
        <>
        <TableRow >
          <TableCell >
            {data.name}
          </TableCell>
          <TableCell >
            {data.category}
          </TableCell>
          <TableCell >
              <TextField
              variant="outlined" size="small"
              onChange={(e) => setFieldValue("quantity", e.target.value)}
              />
          </TableCell>
          <TableCell >
            <FormikSelect
            name="unit"
            >
              {units.map((unit) => (
                <MenuItem key={unit} value={unit}>{unit}</MenuItem>
              ))}
            </FormikSelect>
          </TableCell>
          <TableCell>
          <Button
                  onClick={() => {submitForm()}}
                  color="primary"
                  variant="outlined"
                >
                  +
                </Button>
          </TableCell>
        </TableRow>
      </>
      )
        }
      }
      </Formik>
  )
}
