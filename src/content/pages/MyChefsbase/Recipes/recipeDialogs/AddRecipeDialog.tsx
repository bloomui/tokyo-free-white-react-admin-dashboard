import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { AddDishInput, AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddRecipe } from "../api";
import { AddRecipeVariables } from "../types/AddRecipe";

export const AddRecipeDialog = {}
