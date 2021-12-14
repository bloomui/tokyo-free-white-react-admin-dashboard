import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { AddDishInput, AddIngredientInput, AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddIngredient } from "../api";
import { AddIngredientVariables } from "../types/AddIngredient";
import { allProducts_products } from "../types/AllProducts";

export const AddIngredientDialog = {}
