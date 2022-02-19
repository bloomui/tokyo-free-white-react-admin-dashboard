import {
  Grid,
  Dialog,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
  Button,
  DialogActions,
  Autocomplete,
  MenuItem,
  DialogContent,
  Table,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import { StringValueNode } from "graphql";
import React, { useState } from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import {
  AddRecipeInput,
  QuantityToId,
  StepToMethodInput,
} from "src/globalTypes";
import { required } from "src/utilities/formikValidators";
import { H5 } from "../../Components/TextTypes";
import { useSearchIngredientFilterQuery } from "../Ingredients/AddIngredient/api";
import { searchIngredient_searchIngredient } from "../Ingredients/AddIngredient/types/searchIngredient";
import { AutoSubmitToken } from "../Menus/filtermenus";
import { Rating1 } from "../Menus/filtermenus/components/rating";
import { ingredientToQ, mapIngredientToQToInput } from "../Recipes/AddRecipe";
import {
  getUnitsForMaterial,
  units,
} from "../Recipes/AddRecipe/components/IngredientTable";
import { ingredients_ingredients } from "../Recipes/AddRecipe/types/ingredients";
import { useAddRecipe } from "../Recipes/api";
import { AddRecipeVariables } from "../Recipes/types/AddRecipe";

export const AddRecept = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [value, setValue] = useState(0);
  const { addRecipe, loading, error } = useAddRecipe({
    onCompleted: () => window.location.reload(),
  });
  const [stepHere, setStep] = useState(1);
  const [selectedIngredients, setIngredients] = useState<ingredientToQ[]>([]);
  const formInput: AddRecipeInput = {
    name: "",
    rating: 0,
    type: "",
    quantity: 0,
    unit: units[0],
  };
  const emptyIngredientEntry: QuantityToId = {
    quantity: 0,
    unit: "",
    id: "",
  };
  const emptyStep: StepToMethodInput = {
    step: stepHere,
    method: "",
  };

  function handleDelete(index) {
    selectedIngredients.splice(index, 1);
    setIngredients([...selectedIngredients]);
  }

  const formIngredients: QuantityToId[] | null = [emptyIngredientEntry, emptyIngredientEntry, emptyIngredientEntry];

  const formMethods: StepToMethodInput[] | null = [emptyStep];
  const formState: AddRecipeVariables = {
    input: formInput,
    ingredients: formIngredients,
    method: formMethods,
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <>
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
                <Grid container xs={12}>
                  <Grid xs={12}>
                    <H5 title="Recept toevoegen" />
                  </Grid>
                  <Grid xs={3}>
                    <H5 title="Recept:" />
                  </Grid>
                  <Grid xs={3}>
                    <TextField
                      fullWidth
                      placeholder={"Recept naam"}
                      onChange={(e) =>
                        setFieldValue("input.name", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid xs={6}></Grid>
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
                    <H5 title="Recepttype:" />
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
                  {/* <DialogTitle> */}
                  <Grid xs={12}>
                    <Tabs
                      centered
                      value={value}
                      onChange={(e, newValue) => setValue(newValue as number)}
                    >
                      <Tab label={`Ingredienten`} />
                      <Tab label={`Methode`} />
                    </Tabs>
                  </Grid>
                  {/* </DialogTitle> */}
                  <Grid xs={1}></Grid>
                  {value == 0 ? (
                    <AddIngsForRecipe
                    handleChange={handleChange}
                      values={values}
                    />
                    // <AddIngredientsForRecipe
                    //   values={values.ingredients}
                    //   setIngredients={(selected) =>
                    //     setIngredients([...selectedIngredients, selected])
                    //   }
                    // />
                  ) : (
                    <AddMethodsForRecipe
                      handleChange={handleChange}
                      values={values}
                    />
                  )}
                </Grid>
              </>
            );
          }}
        </Formik>
      </>
      <DialogActions>
        <Grid xs={12}>
          <Button onClick={() => onClose()} color="primary" variant="outlined">
            Terug
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

type InsertIngredient = {
  name: string;
  quantity: number;
  unit: string;
};
const emptyInsertIngredient = {
  name: "",
  quantity: 100.0,
  unit: "gram",
};
const initialValues = [
  emptyInsertIngredient,
  emptyInsertIngredient,
  emptyInsertIngredient,
];
// const [ingredientList, setIngredientList] = useState<InsertIngredient[]>([
//   emptyInsertIngredient,
//   emptyInsertIngredient,
//   emptyInsertIngredient,
// ]);

const Ingredients = () => {
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={(values) => {}}>
        {({ setFieldValue, submitForm, handleChange, values }) => {
          return (
            <>
              <FieldArray
                name="values"
                render={(arrayHelpers) => (
                  <div>
                    {values.map((value, index) => (
                      <>
                        {/* <Ingredient value={value} setValue={fillForm()} /> */}
                        <Grid xs={2}>
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
                                arrayHelpers.remove(index);
                              }}
                            >
                              -
                            </Button>
                          ) : (
                            <div />
                          )}
                        </Grid>
                        <Grid xs={2}>
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
                              arrayHelpers.push(emptyInsertIngredient);
                            }}
                          >
                            +
                          </Button>
                        </Grid>
                      </>
                    ))}
                    <></>
                  </div>
                )}
              />
            </>
          );
        }}
      </Formik>
    </>
  );
};
const Ingredient = ({
  value,
  setValue,
}: {
  value: InsertIngredient;
  setValue: (value: InsertIngredient) => void;
}) => {
  return (
    <>
      <Formik
        initialValues={emptyInsertIngredient}
        onSubmit={(values) => {
          setValue(values);
        }}
      >
        <Grid container xs={12}>
          <Grid xs={2}></Grid>
          <Grid xs={6}>
            <H5 title="Ingredient" />
          </Grid>
          <Grid xs={4}>
            <H5 title="Hoeveelheid" />
          </Grid>
          <Grid xs={12}></Grid>
          {({ setFieldValue }) => {
            return (
              <>
                <Grid xs={2}></Grid>
                <Grid xs={6}>
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={(e) => setFieldValue("name", e.target.value)}
                  />
                </Grid>
                <Grid xs={3}>
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={(e) =>
                      setFieldValue("quantity", Number(e.target.value))
                    }
                  />
                </Grid>
                <Grid xs={3}>
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={(e) => setFieldValue("unit", e.target.value)}
                  />
                </Grid>
              </>
            );
          }}
        </Grid>
      </Formik>
    </>
  );
};

const AddMethodsForRecipe = ({
  values,
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: AddRecipeVariables;
}) => {
  const [stepHere, setStep] = useState(1);
  const emptyStep: StepToMethodInput = {
    step: stepHere,
    method: "",
  };
  return (
    <Grid container xs={12}>
    <FieldArray
      name="method"
      render={(arrayHelpers) => (
        <>
            <Grid xs={1}></Grid>
            <Grid xs={1}>Stap</Grid>
            <Grid xs={8}>Actie</Grid>
            <Grid xs={2}></Grid>
            {values.method?.map((stepToMethod, index) => (
              <>
                <Grid xs={1}></Grid>
                <Grid xs={1}>{index + 1}</Grid>
                <Grid xs={8}>
                  <TextField
                    id={`method.${index}.method`}
                    name={`method.${index}.method`}
                    label="Methode"
                    value={stepToMethod.method}
                    fullWidth
                    multiline
                    onChange={handleChange}
                  />
                </Grid>
                <Grid xs={1}>
                  {index > 0 ? (
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
                        arrayHelpers.remove(index);
                      }}
                    >
                      -
                    </Button>
                  ) : (
                    <Grid xs={1}></Grid>
                    )}
                </Grid>
                <Grid xs={1}>
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
                      arrayHelpers.push(emptyStep);
                    }}
                  >
                    +
                  </Button>
                </Grid>
              </>
            ))}
        </>
      )}
    />
    </Grid>
  );
};


const AddIngsForRecipe = ({
  values,
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: AddRecipeVariables;
}) => {
  const [stepHere, setStep] = useState(1);
  const emptyStep: StepToMethodInput = {
    step: stepHere,
    method: "",
  };
  return (
          <Grid container xs={12}>
    <FieldArray
      name="ingredients"
      render={(arrayHelpers) => (
        <>
                    <Grid xs={1}></Grid>
            <Grid xs={1}>#</Grid>
            <Grid xs={4}>Ingredient</Grid>
            <Grid xs={4}>Hoeveelheid</Grid>
            <Grid xs={2}>- / +</Grid>
            {values.ingredients?.map((ingredient, index) => (
              <>
                                  <Grid xs={1}></Grid>
                <Grid xs={1}>{index + 1}</Grid>
                <Grid xs={4}>
                  <TextField
                    id={`ingredients.${index}.id`}
                    name={`ingredients.${index}.id`}
                    label="Ingredient"
                    value={ingredient.id}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid xs={2}>
                  <TextField
                    id={`ingredients.${index}.quantity`}
                    name={`ingredients.${index}.quantity`}
                    label="Hoeveelheid"
                    value={ingredient.quantity}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid xs={2}>
                  <TextField
                    id={`ingredients.${index}.unit`}
                    name={`ingredients.${index}.unit`}
                    label="Eenheid"
                    value={ingredient.unit}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid xs={1}>
                {index > 0 ? (
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
                        arrayHelpers.remove(index);
                      }}
                    >
                      -
                    </Button>
                  ) : (
                    <Grid xs={1}></Grid>
                    )}
                </Grid>
                <Grid xs={1}>
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
                      arrayHelpers.push(emptyStep);
                    }}
                  >
                     +
                  </Button>
                </Grid>
              </>
            ))}
        </>
      )}
    />
    </Grid>
  );
};
