import { Grid, Button, Divider } from "@material-ui/core";
import { FieldArray } from "formik";
import { useState } from "react";
import { H5, H4, H2, H3 } from "src/content/pages/Components/TextTypes";
import { AddRecipeVariables } from "src/content/pages/MyChefsbase/Recipes/types/AddRecipe";
import {
  emptyIngredientEntry,
  emptyIngredientEntryForm,
  emptyIngredientIdsEntryForm,
  emptyIngredientNamesEntryForm,
} from "./Utils/Conts";
import {
  IngredientSelector,
  IngredientSelector1,
} from "./Utils/IngredientSelector";
import { Form } from "src/content/pages/MyChefsbase/Recipes/AddRecipe";

export const AddIngsForRecipe = ({
  setFieldValue,
  values,
}: {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  values: Form;
}) => {
  const [stepHere, setStep] = useState(1);
  return (
    <>
      <Grid container xs={12}>
        <Grid container xs={12}>
          <Grid xs={12}>
            <H2 title="Ingredienten toevoegen:" />
          </Grid>
        </Grid>
        <FieldArray
          name="oldIngredients"
          render={(arrayHelpers) => (
            <>
              <Grid xs={1}>#</Grid>
              <Grid xs={2}>
                <H4 title="Ingredient (bestaand)" />
              </Grid>
              <Grid xs={2}>{/* <H4 title="Ingredient (nieuw)" /> */}</Grid>
              <Grid xs={4}>
                <H4 title="Hoeveelheid en eenheid" />
              </Grid>
              <Grid xs={2}> (- / +)</Grid>
              {values.oldIngredients?.map((form, index) => (
                <>
                  <Grid xs={1}></Grid>
                  <Grid xs={1}>{index + 1}</Grid>
                  <Grid container xs={8}>
                    <IngredientSelector
                      form={form}
                      index={index}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid xs={2}>
                    {index > 0 ? (
                      <Grid container xs={12}>
                        <Grid>
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
                        </Grid>
                        <Grid>
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
                              arrayHelpers.push(emptyIngredientIdsEntryForm);
                            }}
                          >
                            +
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container xs={12}>
                        <Grid>
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
                              arrayHelpers.push(emptyIngredientIdsEntryForm);
                            }}
                          >
                            +
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </>
              ))}
            </>
          )}
        />
        <Grid container xs={12}>
          <Grid xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid xs={12}>
            <H3 title="Voeg ingredienten toe die nog niet in de chefsbase staan:" />
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <FieldArray
          name="newIngredients"
          render={(arrayHelpers) => (
            <>
              <Grid xs={1}>#</Grid>
              <Grid xs={2}>
                <H4 title="Ingredient (nieuw)" />
              </Grid>
              <Grid xs={2}></Grid>
              <Grid xs={4}>
                <H4 title="Hoeveelheid en eenheid" />
              </Grid>
              <Grid xs={2}> (- / +)</Grid>
              {values.newIngredients?.map((form, index) => (
                <>
                  <Grid xs={1}></Grid>
                  <Grid xs={1}>{index + 1}</Grid>
                  <Grid container xs={8}>
                    <IngredientSelector1
                      form={form}
                      index={index}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid xs={2}>
                    {index > 0 ? (
                      <Grid container xs={12}>
                        <Grid>
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
                        </Grid>
                        <Grid>
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
                              arrayHelpers.push(emptyIngredientNamesEntryForm);
                            }}
                          >
                            +
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container xs={12}>
                        <Grid>
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
                              arrayHelpers.push(emptyIngredientNamesEntryForm);
                            }}
                          >
                            +
                          </Button>
                        </Grid>
                      </Grid>
                    )}
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
