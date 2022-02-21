import {
  Grid,
  Dialog,
  Tab,
  Tabs,
  TextField,
  Button,
  DialogActions,
  MenuItem,
  Divider,
} from "@material-ui/core";
import { Formik } from "formik";
import { useState } from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import {
  AddRecipeInput,
  NewIngredientInput,
  QuantityToId,
  StepToMethodInput,
} from "src/globalTypes";
import { H5 } from "../../../../Components/TextTypes";
import { Rating1 } from "../../../Menus/filtermenus/components/rating";
import { units } from "../../../Recipes/AddRecipe/components/IngredientTable";
import { useAddRecipe } from "../../../Recipes/api";
import { AddRecipeVariables } from "../../../Recipes/types/AddRecipe";
import { AddIngsForRecipe } from "./Components/ingredients";
import { AddMethodsForRecipe } from "./Components/method";
import { AddNewIngsForRecipe } from "./Components/newIngredients";
import {
  emptyNewIngredientEntry,
  emptyIngredientEntry,
} from "./Components/Utils/Conts";

export const AddRecept = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [value, setValue] = useState(0);
  const { addRecipe, loading, error } = useAddRecipe({
    onCompleted: () => {},
    // window.location.reload(),
  });
  const [stepHere, setStep] = useState(1);
  const formInput: AddRecipeInput = {
    name: "",
    rating: 0,
    type: "",
    quantity: 0,
    unit: units[0],
  };

  const emptyStep: StepToMethodInput = {
    step: stepHere,
    method: "",
  };

  const formNewIngredients: NewIngredientInput[] | null = [
    emptyNewIngredientEntry,
    emptyNewIngredientEntry,
    emptyNewIngredientEntry,
  ];

  const formIngredients: QuantityToId[] | null = [
    emptyIngredientEntry,
    emptyIngredientEntry,
    emptyIngredientEntry,
  ];

  const formMethods: StepToMethodInput[] | null = [
    emptyStep,
    emptyStep,
    emptyStep,
  ];
  const formState: AddRecipeVariables = {
    input: formInput,
    ingredients: formIngredients,
    newIngredients: formNewIngredients,
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
                newIngredients: values.newIngredients,
                ingredients: values.ingredients,
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
                    <H5 title="Hoeveelheid:" />
                  </Grid>
                  <Grid xs={3}>
                    <TextField
                      fullWidth
                      placeholder={"Hoeveelheid"}
                      onChange={(e) =>
                        setFieldValue("input.quantity", Number(e.target.value))
                      }
                    />
                  </Grid>
                  <Grid xs={3}>
                    <FormikSelect name={"input.unit"}>
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
                      onChange={(e, newValue) => setValue(newValue as number)}
                    >
                      <Tab label={`Ingredienten`} />
                      <Tab label={`Nieuwe Ingredienten`} />
                      <Tab label={`Methode`} />
                    </Tabs>
                  </Grid>
                  <Grid xs={1}></Grid>
                  {value == 0 ? (
                    <AddIngsForRecipe
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      values={values}
                    />
                  ) : value == 1 ? (
                    <AddNewIngsForRecipe
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      values={values}
                    />
                  ) : (
                    <AddMethodsForRecipe values={values} />
                  )}
                </Grid>
                <Divider />
                <DialogActions>
                  <Grid xs={12}>
                    <Button
                      onClick={() => onClose()}
                      color="primary"
                      variant="outlined"
                    >
                      Terug
                    </Button>
                  </Grid>
                  <Grid xs={12}>
                    <Button
                      onClick={() => submitForm()}
                      color="primary"
                      variant="outlined"
                    >
                      Recept toevoegen
                    </Button>
                  </Grid>
                </DialogActions>
              </>
            );
          }}
        </Formik>
      </>
    </Dialog>
  );
};
