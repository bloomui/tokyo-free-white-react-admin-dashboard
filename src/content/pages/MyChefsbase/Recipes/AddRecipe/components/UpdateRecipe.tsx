import { Container, Grid, MenuItem, TextField, Divider, Tabs, Tab, Button, Dialog, DialogContent, Checkbox, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FormField, FormFieldEdit } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { H5 } from "src/content/pages/Components/TextTypes";
import { IngredientIds, IngredientNames, QuantityToId, RecipeInput, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required, mustBeNumber } from "src/utilities/formikValidators";
import { IngredientNamesForm, IngredientIdsForm, Form, oldFromForm, newFromForm, recipeFormToRecipeInput, ingredientToQ, mapIngredientToQToInput } from "..";
import { user } from "../../..";
import { getUnitsForUnit } from "../../../Content";
import { AddIngsForRecipe, UpdateIngsForRecipe } from "../../../Content/Components/AddRecipe/Components/ingredients";
import { AddMethodsForRecipe } from "../../../Content/Components/AddRecipe/Components/method";
import { emptyIngredientNamesEntryForm, emptyIngredientIdsEntryForm } from "../../../Content/Components/AddRecipe/Components/Utils/Conts";
import { Rating1, RatingEdit } from "../../../Menus/filtermenus/components/rating";
import { useAddRecept, useGetIngredientsForRecipe, useGetMethodForRecipeQuery, useUpdateRecipe } from "../../api";
import { FilterRecipes_filterRecipes } from "../../types/FilterRecipes";
import { ingredientsForRecipe_ingredientsForRecipe } from "../../types/ingredientsForRecipe";
import { recipe_recipe_method } from "../../types/recipe";
import { UpdateRecipeVariables } from "../../types/UpdateRecipe";
import { units } from "./IngredientTable";

export const mapMethodToInput = (a: recipe_recipe_method[]): StepToMethodInput[] => {
    const map = a.map((method) => ({
      step: method.step,
      method: method.method,
    }));
    return map;
  };

  export const mapToIngredientToQ = (
    a: ingredientsForRecipe_ingredientsForRecipe
  ): ingredientToQ => {
    return {
      name: a.ingredient.name,
      id: a.ingredient.id,
      quantity: String(a.quantity.quantity),
      unit: a.quantity.unit,
    };
  };
  
export const UpdateRecipePage1 = ({
    recipe,
    open,
    onClose,
}: {
    recipe: FilterRecipes_filterRecipes;
    open: boolean;
    onClose: () => void;
}) => {
    const [value, setValue] = useState(0);
    const [selectedIngredients, setIngredients] = React.useState<ingredientToQ[]>(
        []
      );
      const [unitsHere, setUnits] = React.useState<string[]>(getUnitsForUnit(recipe.quantity.unit));
      const [unit, setUnit] = useState<string>(recipe.quantity.unit);
      const [quantity, setQuantity] = useState(recipe.quantity.quantity);
    const {
        data,
        loading,
        error,
      } = useGetIngredientsForRecipe({
        onCompleted: (ingredientsForRecipe) => {
          setIngredients(
            ingredientsForRecipe.ingredientsForRecipe.map((i) =>
              mapToIngredientToQ(i)
            )
          );
        },
        id: recipe.id,
        quantity: quantity,
        unit: unit,
      });

    const [stepHere, setStep] = useState(1);
    const emptyStep: StepToMethodInput = {
      step: stepHere,
      method: "",
    };
    const [methodHere, setMethod] = useState<StepToMethodInput[]>([emptyStep]);
      const { data: dataMethod, loading: loadingMethod, error: errorMethod} = useGetMethodForRecipeQuery({
        id: recipe.id,
        onCompleted: (methodForRecipe) => {setMethod(methodForRecipe.methodForRecipe.map((it) => ({step: it.step, method: it.method})))}
      });

      const { updateRecipe, loading: loadingUpdate, error: errorUpdate } = useUpdateRecipe({
        onCompleted: () => {
          window.location.reload();
        },
      });

    const [openBoolean, setOpenBoolean] = useState(false)
  
    const formInput: RecipeInput = {
        id: recipe.id,
        name: recipe.name,
        rating: recipe.rating,
        type: recipe.type,
        unit: recipe.quantity.unit,
        quantity: recipe.quantity.quantity,
      };
      const formIngredients: IngredientIds[] | null = data.ingredientsForRecipe.map(
        (form) => ({
          quantity: form.quantity.quantity,
          unit: form.quantity.unit,
          id: form.ingredient.id,
        })
      );
      const old: IngredientNames[] = []
    
      const formState: UpdateRecipeVariables = {
        input: formInput,
        newIngredients: old,
        oldIngredients: formIngredients,
        method: methodHere,
      };
  
      if (loading)
    return (
      <Dialog open={open} onClose={onClose}>
        <CircularProgress />
      </Dialog>
    );
        if (error)
    return (
      <Dialog open={open} onClose={onClose}>
        <CircularProgress />
      </Dialog>
    );

    return (
      <>
        <Helmet>
          <title>Update recept</title>
        </Helmet>
        <PageTitleWrapper>
          <PageHeader
            title="Update recept"
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
          updateRecipe({
            variables: {
              method: values.method ? values.method : [emptyStep],
              oldIngredients: mapIngredientToQToInput(selectedIngredients),
              newIngredients: values.newIngredients,
              input: {
                id: recipe.id,
                name: values.input.name,
                rating: values.input.rating,
                type: values.input.type,
                unit: values.input.unit,
                quantity: values.input.quantity,
              },
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
                        <FormFieldEdit
                      placeholder={recipe.name}
                      name="input.name"
                      label="Naam"
                      validator={composeValidators(required)}
                    />
                        </Grid>
                        <Grid xs={6}></Grid>
                        <Grid xs={3}>
                          <H5 title="Hoeveelheid:" />
                        </Grid>
                        <Grid xs={3}>
                          <FormFieldEdit
                            placeholder={String(recipe.quantity.quantity)}
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
                            {unitsHere.map((unit) => (
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
                        <FormFieldEdit
                      placeholder={recipe.type}
                      name="input.type"
                      label="Type"
                      validator={composeValidators(required)}
                    />
                        </Grid>
                        <Grid xs={6}></Grid>
                        <Grid xs={3}>
                          <H5 title="Beoordeling:" />
                        </Grid>
                        <Grid xs={3}>
                        <RatingEdit
                      defaultNumber={recipe.rating}
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
                            onClick={() => setOpenBoolean(true)}
                            color="primary"
                            variant="outlined"
                          >
                            Recept toevoegen
                          </Button>
                          <Dialog
                            open={openBoolean}
                            onClose={() => setOpenBoolean(false)}
                          >
                            <DialogContent>
                              <Grid container xs={12}>
                                <Grid item xs={8}>
                                  <H5 title="Ingredienten koppelen aan opgeslagen ingredienten?" />
                                </Grid>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={2}>
                                  <Checkbox
                                    color="primary"
                                    checked={values.boolean == 0 ? false : true}
                                    onChange={(event, value) => {
                                      value == true
                                        ? setFieldValue("boolean", 1)
                                        : setFieldValue("boolean", 0);
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <Button
                                    onClick={() => submitForm()}
                                    color="primary"
                                    variant="outlined"
                                  >
                                    Recept toevoegen
                                  </Button>
                                </Grid>
                              </Grid>
                            </DialogContent>
                          </Dialog>
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