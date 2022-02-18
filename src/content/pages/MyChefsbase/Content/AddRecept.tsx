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
} from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import { StringValueNode } from "graphql";
import { useState } from "react";
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

  const formIngredients: QuantityToId[] | null = [emptyIngredientEntry];

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
                </Grid>
                <Grid container xs={12}>
                  {/* <DialogTitle> */}
                  <Grid xs={12}>
                    <Tabs
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
                    <AddIngredientsForRecipe
                      values={values.ingredients}
                      setIngredients={(selected) =>
                        setIngredients([...selectedIngredients, selected])
                      }
                    />
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

const AddIngredientsForRecipe = ({
  values,
  setIngredients,
}: {
  values: QuantityToId[];
  setIngredients: (selected: ingredientToQ) => void;
}) => {
  const [name, setName] = useState("");
  const [ingredient, setIngredient] =
    useState<searchIngredient_searchIngredient>();
  const [stepHere, setStep] = useState(1);
  const emptyIngredientEntry: QuantityToId = {
    quantity: 0,
    unit: "",
    id: "",
  };
  const { data, loading, error, refetch } = useSearchIngredientFilterQuery({
    name: name,
  });

  const [timer, setTimer] = useState(null);

  function changeDelay(change) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setName(change);
        // refetch({ ingredientname: name });
      }, 200)
    );
  }
  if (loading) return <CircularProgress />;
  return (
    <FieldArray
      name="method"
      render={(arrayHelpers) => (
        <div>
          <Grid container xs={12}>
            <Grid xs={2}></Grid>
            <Grid xs={6}>
              <H5 title="Ingredient" />
            </Grid>
            <Grid xs={4}>
              <H5 title="Hoeveelheid" />
            </Grid>
            {values?.map((ingredient, index) => (
              <>
                <Row
                  name={name}
                  setIngredient={(a: ingredientToQ) => setIngredients(a)}
                />
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
                        setStep(stepHere - 1);
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
                      setStep(stepHere + 1);
                      arrayHelpers.push(emptyIngredientEntry);
                    }}
                  >
                    +
                  </Button>
                </Grid>
              </>
            ))}
          </Grid>
        </div>
      )}
    />
  );
};
const Row = ({
  name,
  setIngredient,
}: {
  name: string;
  setIngredient: (a) => void;
}) => {
  const formState: { quantity: string; unit: string } = {
    quantity: "",
    unit: "",
  };
  const [unitsForMaterial, setUnitsForMaterial] = useState([]);

  const [open, setOpen] = useState<boolean>(false);

  const { data, loading, error, refetch } = useSearchIngredientFilterQuery({
    name: name,
  });

  if (loading) return <CircularProgress />;
  return (
    <>
      {data.searchIngredient.map((ingredient) => (
        <Formik
          initialValues={formState}
          onSubmit={(values) => {
            setIngredient({
              name: ingredient.name,
              id: ingredient.id,
              ...values,
            });
          }}
        >
          {({ setFieldValue, submitForm }) => {
            return (
              <>
                <TableRow>
                  <TableCell>{ingredient.name}</TableCell>
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
                    <Grid container xs={12}>
                      <Grid xs={6}>
                        <H5 title="Ingredient" />
                      </Grid>
                      <Grid xs={6}>
                        <H5 title="Hoeveelheid" />
                      </Grid>
                      <Grid xs={3}>
                        <TextField
                          variant="outlined"
                          size="small"
                          onChange={(e) =>
                            setFieldValue("quantity", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid xs={3}>
                        <FormikSelect name="unit">
                          {getUnitsForMaterial(ingredient.material).map(
                            (unit) => (
                              <MenuItem key={unit} value={unit}>
                                {unit}
                              </MenuItem>
                            )
                          )}
                        </FormikSelect>
                      </Grid>
                      <Grid xs={6}>
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
                      </Grid>
                    </Grid>
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
      ))}
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
    <FieldArray
      name="method"
      render={(arrayHelpers) => (
        <div>
          <Grid container xs={12}>
            <Grid xs={2}>Stap</Grid>
            <Grid xs={6}>Actie</Grid>
            <Grid xs={2}>Verwijder</Grid>
            <Grid xs={2}>Voeg toe</Grid>
            {values.method?.map((stepToMethod, index) => (
              <>
                <Grid xs={2}>{index + 1}</Grid>
                <Grid xs={6}>
                  <TextField
                    id={`method.${index}.method`}
                    name={`method.${index}.method`}
                    label="Methode"
                    value={stepToMethod.method}
                    multiline
                    onChange={handleChange}
                  />
                </Grid>
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
                        setStep(stepHere - 1);
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
                      setStep(stepHere + 1);
                      arrayHelpers.push(emptyStep);
                    }}
                  >
                    +
                  </Button>
                </Grid>
              </>
            ))}
          </Grid>
        </div>
      )}
    />
  );
};
