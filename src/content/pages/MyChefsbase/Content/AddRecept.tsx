import {
  Grid,
  Dialog,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
  Button,
} from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import { useState } from "react";
import {
  AddRecipeInput,
  QuantityToId,
  StepToMethodInput,
} from "src/globalTypes";
import { H5 } from "../../Components/TextTypes";
import { ingredientToQ, mapIngredientToQToInput } from "../Recipes/AddRecipe";
import { units } from "../Recipes/AddRecipe/components/IngredientTable";
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
    <Dialog open={open} onClose={onClose}>
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

                <DialogTitle>
                  <Tabs
                    value={value}
                    onChange={(e, newValue) => setValue(newValue as number)}
                  >
                    <Tab label={`Ingredienten`} />
                    <Tab label={`Methode`} />
                    <Tab label={`Voedingswaaarden`} />
                  </Tabs>
                </DialogTitle>
                {value == 0 ? (
                  <AddIngredientsForRecipe setFieldValue={setFieldValue} />
                ) : (
                  <AddMethodsForRecipe
                    handleChange={handleChange}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                )}
              </>
            );
          }}
        </Formik>
      </>
    </Dialog>
  );
};

const AddIngredientsForRecipe = ({
  setFieldValue,
}: {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}) => {
  return <></>;
};

const AddMethodsForRecipe = ({
  setFieldValue,
  values,
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: AddRecipeVariables;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
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
