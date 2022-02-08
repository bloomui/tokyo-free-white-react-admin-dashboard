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
import React from "react";
import { H3, H5Left } from "src/content/pages/Components/TextTypes";
import { Material } from "src/globalTypes";
import { Quantity } from "../../../Menus/filtermenus/components/quantity";
import { getUnitsForMaterial } from "../../../Recipes/AddRecipe/components/IngredientTable";

export const InsertNutrition = ({
  setFieldValue,
  material,
}: {
  material: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {

  return (
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
            {material}
          </TableCell>
        </TableRow>
        <TableRow></TableRow>
        <TableRow>
          <TableCell>Kilocalorieën</TableCell>
          <TableCell>
            <TextField
              fullWidth
              placeholder={"0"}
              onChange={(e) => 
                setFieldValue(
                  "input.nutrition.nutrition.kcal",
                  Number(e.target.value)
                )
              }
            />
          </TableCell>
          <TableCell>Eiwitten</TableCell>
          <TableCell>
            <TextField
              fullWidth
              placeholder={"0"}
              onChange={(e) =>
                setFieldValue(
                  "input.nutrition.nutrition.prottotal",
                  Number(e.target.value)
                )
              }
            />
          </TableCell>
          <TableCell>Koolhydraten</TableCell>
          <TableCell>
            <TextField
              fullWidth
              placeholder={"0"}
              onChange={(e) =>
                setFieldValue(
                  "input.nutrition.nutrition.carbscarbs",
                  Number(e.target.value)
                )
              }
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Suikers</TableCell>
          <TableCell>
            <TextField
              fullWidth
              placeholder={"0"}
              onChange={(e) =>
                setFieldValue(
                  "input.nutrition.nutrition.carbssugar",
                  Number(e.target.value)
                )
              }
            />
          </TableCell>
          <TableCell>Vetten</TableCell>
          <TableCell>
            <TextField
              fullWidth
              placeholder={"0"}
              onChange={(e) =>
                setFieldValue(
                  "input.nutrition.nutrition.fatstotal",
                  Number(e.target.value)
                )
              }
            />
          </TableCell>
          <TableCell>Vezels</TableCell>
          <TableCell>
            <TextField
              fullWidth
              placeholder={"0"}
              onChange={(e) =>
                setFieldValue(
                  "input.nutrition.nutrition.fibres",
                  Number(e.target.value)
                )
              }
            />
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
};
