import {
  Grid,
  Dialog,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import { Formik } from "formik";
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
  const [selectedIngredients, setIngredients] = useState<ingredientToQ[]>(
    []
  );
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
  let content;

  switch (value) {
    case 0:
      content = <AddIngredientsForRecipe />;
      break;

    default:
      content = <AddMethodForRecipe />;
      break;
  }

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
                {content}
              </>
            );
          }}
        </Formik>
      </>
    </Dialog>
  );
};
function addRecipe(arg0: {
  variables: {
    method: any;
    ingredients: any;
    input: { type: any; name: any; rating: any; quantity: any; unit: any };
  };
}) {
  throw new Error("Function not implemented.");
}
