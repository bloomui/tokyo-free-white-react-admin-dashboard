import { useQuery } from "@apollo/client";
import { Button, MenuItem, Paper, Table, TableCell, TableContainer, TableRow, TextField, TextFieldProps } from "@material-ui/core";
import { Formik, useField } from "formik";
import React, { useState } from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import { LoadingScreen } from "src/components/layout";
import { formikFieldErrorProps } from "src/utilities/formikError";
import { composeValidators, required, Validator } from "src/utilities/formikValidators";
import { ingredientToQ } from "..";
import { AutoSubmitToken } from "../../../Menus/filtermenus";
import { Search } from "../../../Menus/filtermenus/components/search";
import { useSearchIngredientQuery } from "../api";
import { ingredients_ingredients } from "../types/ingredients";

export const units = ["gram", "miligram", "kilogram", "theelepel(s)", "eetlepel(s)", "stuk(s)", "mililiter", "liter"]

export  const TableData = ({
  setIngredients
}: {
  setIngredients: (selected: ingredientToQ) => void
}) => {

    const [name, setName] = useState<string>()

    const nameForm = {
        name: ''
    }

  const { loading, data, error, refetch } = useSearchIngredientQuery({name})
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
              <Search
              placeholder="Zoek op naam" setFieldValue={setFieldValue}
              />
        <AutoSubmitToken />
    </>
          )
        }}
        </Formik>
              </TableRow>
        <TableRow>
          <TableCell>Ingredient</TableCell>
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
