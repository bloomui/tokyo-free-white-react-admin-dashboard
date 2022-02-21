import {
  Grid,
  Dialog,
  Tab,
  Tabs,
  TextField,
  Button,
  DialogActions,
  Autocomplete,
  MenuItem,
  Divider,
} from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import {
  AddRecipeInput,
  Material,
  NewIngredientInput,
  QuantityToId,
  StepToMethodInput,
} from "src/globalTypes";
import {
  composeValidators,
  mustBeNumber,
  required,
} from "src/utilities/formikValidators";
import { H5 } from "../../Components/TextTypes";
import { FormField, FormFieldMultiLine } from "../../SignIn";
import {
  materialOptions,
  parseMaterialInput,
  stringForMaterial,
} from "../Ingredients/AddIngredient";
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

const emptyNewIngredientEntry: NewIngredientInput = {
  quantity: 0,
  unit: "",
  name: "",
};

const emptyIngredientEntry: QuantityToId = {
  quantity: 0,
  unit: "",
  id: "",
};

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
                    <AddMethodsForRecipe
                      handleChange={handleChange}
                      values={values}
                    />
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
                  <FormFieldMultiLine
                    name={`method.${index}.method`}
                    label="Methode"
                    validator={composeValidators(required)}
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
  setFieldValue,
  values,
  handleChange,
}: {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: AddRecipeVariables;
}) => {
  const [stepHere, setStep] = useState(1);
  return (
    <>
      <Grid container xs={12}>
        <Grid container xs={12}>
          <Grid xs={12}>
            <H5 title="Ingredienten die in de chefsbase staan:" />
          </Grid>
        </Grid>
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
                  <Grid container xs={8}>
                    <IngredientSelector
                      index={index}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      quantity={ingredient.quantity}
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
                        arrayHelpers.push(emptyIngredientEntry);
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
    </>
  );
};

const AddNewIngsForRecipe = ({
  setFieldValue,
  values,
  handleChange,
}: {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: AddRecipeVariables;
}) => {
  const [stepHere, setStep] = useState(1);
  return (
    <>
      <Grid container xs={12}>
        <Grid xs={12}>
          <H5 title="Ingredienten die nog niet in de chefsbase staan:" />
        </Grid>
      </Grid>
      <Divider />
      <Grid container xs={12}>
        <FieldArray
          name="newIngredients"
          render={(arrayHelpers) => (
            <>
              <Grid xs={1}></Grid>
              <Grid xs={1}>#</Grid>
              <Grid xs={4}>Ingredient</Grid>
              <Grid xs={2}>Hoeveelheid</Grid>
              <Grid xs={2}>- / +</Grid>
              {values.newIngredients?.map((newIngredient, index) => (
                <>
                  <Grid xs={1}></Grid>
                  <Grid xs={1}>{index + 1}</Grid>
                  <Grid container xs={8}>
                    <Grid xs={4}>
                      <FormField
                        name={`newIngredients.${index}.name`}
                        label="Naam"
                        validator={composeValidators(required)}
                      />
                    </Grid>
                    <Grid xs={2}>
                      <FormField
                        name={`newIngredients.${index}.quantity`}
                        label="Hoeveelheid"
                        validator={composeValidators(required, mustBeNumber)}
                      />
                    </Grid>
                    <Grid xs={2}>
                      <FormikSelect
                        validate={composeValidators(required)}
                        name={`newIngredients.${index}.unit`}
                      >
                        {units.map((unit) => (
                          <MenuItem key={unit} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </FormikSelect>
                    </Grid>
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
                        arrayHelpers.push(emptyNewIngredientEntry);
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
    </>
  );
};

const IngredientSelector = ({
  index,
  setFieldValue,
  handleChange,
  quantity,
}: {
  quantity: number;
  index: number;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  const [name, setName] = useState("");

  const [ingredient, setIngredient] =
    useState<searchIngredient_searchIngredient>();
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
        refetch({ ingredientname: name });
      }, 100)
    );
  }
  return (
    <>
      <Grid xs={4}>
        <Autocomplete
          id="tags-standard"
          options={
            loading
              ? []
              : data &&
                data.searchIngredient &&
                data.searchIngredient.map((option) => option)
          }
          getOptionLabel={(option) => (option ? option.name : "")}
          onChange={(event, value: searchIngredient_searchIngredient) => {
            setIngredient(value);
            setFieldValue(`ingredients.${index}.id`, value.id);
          }}
          renderInput={(params) => (
            <TextField
              placeholder={name}
              {...params}
              onChange={(e) => {
                changeDelay(e.target.value);
              }}
              fullWidth
              label="Ingredient"
            />
          )}
        />
        {/* <AutoSubmitToken /> */}
      </Grid>
      <Grid xs={2}>
        <FormField
          name={`ingredients.${index}.quantity`}
          label="Hoeveelheid"
          validator={composeValidators(required, mustBeNumber)}
        />
      </Grid>
      <Grid xs={2}>
        <FormikSelect
          validate={composeValidators(required)}
          name={`ingredients.${index}.unit`}
        >
          {ingredient &&
            getUnitsForMaterial(ingredient.material).map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
        </FormikSelect>
      </Grid>
    </>
  );
};
