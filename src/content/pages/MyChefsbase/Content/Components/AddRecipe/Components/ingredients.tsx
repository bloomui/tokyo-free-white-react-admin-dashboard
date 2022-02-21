import { Grid, Button } from "@material-ui/core";
import { FieldArray } from "formik";
import { useState } from "react";
import { H5 } from "src/content/pages/Components/TextTypes";
import { AddRecipeVariables } from "src/content/pages/MyChefsbase/Recipes/types/AddRecipe";
import { emptyIngredientEntry } from "./Utils/Conts";
import { IngredientSelector } from "./Utils/IngredientSelector";

export const AddIngsForRecipe = ({
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
