import { useQuery } from "@apollo/client";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Tab,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import { FieldArray, Formik, useField } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/components/form/FormField";
import {
  IngredientNames,
  AddRecipeInput,
  IngredientIds,
  QuantityToId,
  RecipeIngredientsForm,
  StepToMethodInput,
} from "src/globalTypes";
import {
  composeValidators,
  mustBeNumber,
  required,
  Validator,
} from "src/utilities/formikValidators";
import { user } from "../..";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddRecept, useAddRecipe } from "../api";
import { Divider } from "@mui/material";
import { AddRecipeVariables } from "../types/AddRecipe";
import { TableData, units } from "./components/IngredientTable";
import { VscTrash } from "react-icons/vsc";
import { H3, H5, H5Left } from "src/content/pages/Components/TextTypes";
import { AddIngredientPage } from "../../Ingredients/AddIngredient";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ingredientsForRecipe_ingredientsForRecipe } from "../types/ingredientsForRecipe";
import { AddIngrDialog } from "./components/AddQuickIngredients";
import { FormikSelect } from "src/components/form/FormikSelect";
import { AddIngsForRecipe } from "../../Content/Components/AddRecipe/Components/ingredients";
import { AddMethodsForRecipe } from "../../Content/Components/AddRecipe/Components/method";
import {
  emptyIngredientEntry,
  emptyIngredientEntryForm,
  emptyIngredientIdsEntryForm,
  emptyIngredientNamesEntryForm,
} from "../../Content/Components/AddRecipe/Components/Utils/Conts";

export type Form = {
  input: AddRecipeForm;
  oldIngredients: IngredientIdsForm[];
  newIngredients: IngredientNamesForm[];
  method: StepToMethodInput[];
};

export type RecipeFormIngredientsForm = {
  id?: string | null;
  name?: string | null;
  quantity: string;
  unit: string;
};

export type IngredientNamesForm = {
  name: string;
  quantity: string;
  unit: string;
};
export type IngredientIdsForm = {
  id: string;
  quantity: string;
  unit: string;
};
export const oldFromForm = (form: IngredientIdsForm[]): IngredientIds[] => {
  return form.map((f) => ({
    id: f.id,
    quantity: Number(f.quantity),
    unit: f.unit,
  }));
};
export const newFromForm = (form: IngredientNamesForm[]): IngredientNames[] => {
  return form.map((f) => ({
    name: f.name,
    quantity: Number(f.quantity),
    unit: f.unit,
  }));
};
export const recipeFormIngrToInput = (
  form: RecipeFormIngredientsForm[]
): RecipeIngredientsForm[] => {
  return form.map((f) => ({
    name: f.name,
    id: f.id,
    quantity: Number(f.quantity),
    unit: f.unit,
  }));
};
export type AddRecipeForm = {
  name: string;
  rating: string;
  type: string;
  quantity: string;
  unit: string;
};

const formInput: AddRecipeForm = {
  name: "",
  rating: "",
  type: "",
  quantity: "",
  unit: units[0],
};

export const recipeFormToRecipeInput = (
  form: AddRecipeForm
): AddRecipeInput => {
  return {
    name: form.name,
    rating: Number(form.rating),
    type: form.type,
    quantity: Number(form.quantity),
    unit: form.unit,
  };
};

export const AddRecipePage1 = () => {
  const [value, setValue] = useState(0);
  const { addRecept, loading, error } = useAddRecept({
    onCompleted: () => {
      window.location.reload();
    },
  });
  const [stepHere, setStep] = useState(1);

  const emptyStep: StepToMethodInput = {
    step: stepHere,
    method: "",
  };

  const ingredientNamesForm: IngredientNamesForm[] | null = [
    emptyIngredientNamesEntryForm,
    emptyIngredientNamesEntryForm,
    emptyIngredientNamesEntryForm,
  ];

  const ingredientIdsForm: IngredientIdsForm[] | null = [
    emptyIngredientIdsEntryForm,
    emptyIngredientIdsEntryForm,
    emptyIngredientIdsEntryForm,
  ];
  const formMethods: StepToMethodInput[] | null = [
    emptyStep,
    emptyStep,
    emptyStep,
  ];

  const form: Form = {
    input: formInput,
    oldIngredients: ingredientIdsForm,
    newIngredients: ingredientNamesForm,
    method: formMethods,
  };

  return (
    <>
      <Helmet>
        <title>Nieuw recept</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Nieuw recept"
          name="Soup Bros"
          avatar={user.avatar}
        />
      </PageTitleWrapper>
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
              initialValues={form}
              onSubmit={(values) => {
                addRecept({
                  variables: {
                    method: values.method.map((stepToMethod, index) => ({
                      step: index + 1,
                      method: stepToMethod.method,
                    })),
                    oldIngredients: oldFromForm(values.oldIngredients),
                    newIngredients: newFromForm(values.newIngredients),
                    input: recipeFormToRecipeInput(values.input),
                  },
                });
              }}
            >
              {({ values, handleChange, submitForm, setFieldValue }) => {
                return (
                  <>
                    <Grid container xs={12}>
                      <Grid xs={3}>
                        <H5 title="Recept:" />
                      </Grid>
                      <Grid xs={3}>
                        <FormField
                          label="Recept naam"
                          name="input.name"
                          validator={composeValidators(required)}
                        />
                      </Grid>
                      <Grid xs={6}></Grid>
                      <Grid xs={3}>
                        <H5 title="Hoeveelheid:" />
                      </Grid>
                      <Grid xs={3}>
                        <FormField
                          name={"input.quantity"}
                          label="Hoeveelheid"
                          validator={composeValidators(required, mustBeNumber)}
                        />
                      </Grid>
                      <Grid xs={3}>
                        <FormikSelect
                          validate={composeValidators(required)}
                          name={"input.unit"}
                        >
                          {units.map((unit) => (
                            <MenuItem key={unit} value={unit}>
                              {unit}
                            </MenuItem>
                          ))}
                        </FormikSelect>
                      </Grid>
                      <Grid xs={3}></Grid>
                      <Grid xs={3}>
                        <H5 title="Recepttype:" />
                      </Grid>
                      <Grid xs={3}>
                        <TextField
                          fullWidth
                          placeholder={"Recept type"}
                          onChange={(e) =>
                            setFieldValue("input.type", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid xs={6}></Grid>
                      <Grid xs={3}>
                        <H5 title="Beoordeling:" />
                      </Grid>
                      <Grid xs={3}>
                        <Rating1
                          updateField="input.rating"
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid xs={6}></Grid>
                    </Grid>
                    <Divider />
                    <Grid container xs={12}>
                      <Grid xs={12}>
                        <Tabs
                          centered
                          value={value}
                          onChange={(e, newValue) =>
                            setValue(newValue as number)
                          }
                        >
                          <Tab label={`Ingredienten`} />
                          <Tab label={`Methode`} />
                        </Tabs>
                      </Grid>
                      <Grid xs={1}></Grid>
                      {value == 0 ? (
                        <AddIngsForRecipe
                          setFieldValue={setFieldValue}
                          values={values}
                        />
                      ) : (
                        <AddMethodsForRecipe values={values} />
                      )}
                    </Grid>
                    <Divider />
                    <Grid container xs={12}>
                      <Grid xs={10}></Grid>
                      <Grid xs={2}>
                        <Button
                          onClick={() => submitForm()}
                          color="primary"
                          variant="outlined"
                        >
                          Recept toevoegen
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const AddRecipePage = () => {
  const [dialog, openDialog] = useState(false);
  const { addRecipe, loading, error } = useAddRecipe({
    onCompleted: () => window.location.reload(),
  });
  const [stepHere, setStep] = useState(1);
  const [selectedIngredients, setIngredients] = React.useState<ingredientToQ[]>(
    []
  );

  const formInput: AddRecipeInput = {
    name: "",
    rating: 0,
    type: "",
    quantity: 0,
    unit: units[0],
  };
  const emptyIngredientEntry: RecipeIngredientsForm = {
    quantity: 0,
    unit: "",
    id: "",
    name: "",
  };
  const emptyStep: StepToMethodInput = {
    step: stepHere,
    method: "",
  };

  function handleDelete(index) {
    selectedIngredients.splice(index, 1);
    setIngredients([...selectedIngredients]);
  }

  const formIngredients: RecipeIngredientsForm[] | null = [
    emptyIngredientEntry,
  ];

  const formMethods: StepToMethodInput[] | null = [emptyStep];
  const formState: AddRecipeVariables = {
    input: formInput,
    ingredients: formIngredients,
    method: formMethods,
  };

  return (
    <>
      <Helmet>
        <title>Nieuw recept</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Nieuw recept"
          name="Soup Bros"
          avatar={user.avatar}
        />
      </PageTitleWrapper>
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
                addRecipe({
                  variables: {
                    method: values.method.map((stepToMethod, index) => ({
                      step: index + 1,
                      method: stepToMethod.method,
                    })),
                    ingredients: mapIngredientToQToInput(selectedIngredients),
                    input: {
                      type: values.input.type,
                      name: values.input.name,
                      rating: values.input.rating,
                      quantity: values.input.quantity,
                      unit: values.input.unit,
                    },
                  },
                });
              }}
            >
              {({ values, handleChange, submitForm, setFieldValue }) => {
                return (
                  <>
                    <Grid container xs={12} spacing={2}>
                      <Grid container xs={12}>
                        <Grid xs={3}>
                          <H5 title="Geef dit recept een naam" />
                          <FormField
                            name="input.name"
                            label="Naam"
                            validator={composeValidators(required)}
                          />
                        </Grid>
                        <Grid xs={1}></Grid>
                        <Grid xs={6}>
                          <Typography>Per hoeveelheid</Typography>
                          <FormField
                            name="input.quantity"
                            label="Hoeveelheid"
                            validator={composeValidators(required)}
                          />
                          <FormikSelect name="input.unit">
                            {units.map((unit) => (
                              <MenuItem key={unit} value={unit}>
                                {unit}
                              </MenuItem>
                            ))}
                          </FormikSelect>
                        </Grid>
                        <Grid xs={1}></Grid>
                        <Grid xs={3}>
                          <Typography>Geef het recept type aan</Typography>
                          <FormField
                            name="input.type"
                            label="Type"
                            validator={composeValidators(required)}
                          />
                        </Grid>
                        <Grid xs={5}></Grid>
                        <Grid xs={3}>
                          <Rating1
                            updateField="input.rating"
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid xs={1}></Grid>
                        <Grid xs={3}>
                          <Button
                            disabled={loading}
                            onClick={() => submitForm()}
                            color="primary"
                            variant="contained"
                          >
                            Gegevens toevoegen
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid xs={12}>
                        <Grid xs={12}>
                          <H3 title="Stappenplan om dit recept te maken:" />
                          <Grid xs={12}>
                            <FieldArray
                              name="method"
                              render={(arrayHelpers) => (
                                <div>
                                  <TableContainer>
                                    <Table>
                                      <TableRow>
                                        <TableCell>Stap</TableCell>
                                        <TableCell>Actie</TableCell>
                                        <TableCell>Verwijder stap</TableCell>
                                        <TableCell>
                                          Nog een stap toevoegen
                                        </TableCell>
                                      </TableRow>
                                      {values.method?.map(
                                        (stepToMethod, index) => (
                                          <TableRow>
                                            <>
                                              <TableCell>{index + 1}</TableCell>
                                              <TableCell>
                                                <TextField
                                                  id={`method.${index}.method`}
                                                  name={`method.${index}.method`}
                                                  label="Methode"
                                                  value={stepToMethod.method}
                                                  multiline
                                                  onChange={handleChange}
                                                />
                                              </TableCell>
                                              <TableCell>
                                                {index === 0 ? (
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
                                                      setStep(stepHere - 1);
                                                      arrayHelpers.remove(
                                                        index
                                                      );
                                                    }}
                                                  >
                                                    -
                                                  </Button>
                                                ) : (
                                                  <div />
                                                )}
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
                                                    setStep(stepHere + 1);
                                                    arrayHelpers.push(
                                                      emptyStep
                                                    );
                                                  }}
                                                >
                                                  +
                                                </Button>
                                              </TableCell>
                                            </>
                                          </TableRow>
                                        )
                                      )}
                                    </Table>
                                  </TableContainer>
                                </div>
                              )}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs={12}></Grid>
                    <Divider />
                    <Grid container xs={12}>
                      <Grid xs={12}>
                        <H3 title="Ingredienten" />
                      </Grid>
                      <Grid xs={12}>
                        <Button
                          onClick={() => openDialog(true)}
                          color="primary"
                          variant="contained"
                        >
                          Snel ingredienten toevoegen
                        </Button>
                      </Grid>
                      <AddIngrDialog
                        open={dialog}
                        onClose={() => openDialog(false)}
                      />
                      <Grid xs={6}>
                        <TableData
                          setIngredients={(selected) =>
                            setIngredients([...selectedIngredients, selected])
                          }
                        />
                      </Grid>
                      <Grid xs={6}>
                        <TableContainer>
                          <Table size="small">
                            <TableRow>
                              <TableCell>Ingredient</TableCell>
                              <TableCell>Hoeveelheid</TableCell>
                              <TableCell>Eenheid</TableCell>
                            </TableRow>
                            {selectedIngredients.map((ingredient, index) => (
                              <TableRow>
                                <TableCell>{ingredient.name}</TableCell>
                                <TableCell>{ingredient.quantity}</TableCell>
                                <TableCell>{ingredient.unit}</TableCell>
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
                                      handleDelete(index);
                                    }}
                                  >
                                    -
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                    {error && (
                      <Typography color="error">
                        Er is een fout opgetreden, probeer het opnieuw.
                      </Typography>
                    )}
                  </>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export type ingredientToQ = {
  name: string;
  id: string;
  quantity: string;
  unit: string;
};

export const mapIngredientToQToInput = (
  selected: ingredientToQ[]
): QuantityToId[] => {
  return selected.map((a) => ({
    id: a.id,
    quantity: Number(a.quantity),
    unit: a.unit,
  }));
};

export const mapIngredientForRecipeToIngredientToQuantity = (
  selected: ingredientsForRecipe_ingredientsForRecipe[]
): ingredientToQ[] => {
  return selected.map((a) => ({
    id: a.ingredient.id,
    name: a.ingredient.name,
    quantity: String(a.quantity.quantity),
    unit: a.quantity.unit,
  }));
};
