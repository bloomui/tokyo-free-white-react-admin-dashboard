import { Grid, Button } from "@material-ui/core";
import { FieldArray } from "formik";
import { useState } from "react";
import { Form } from "src/content/pages/MyChefsbase/Recipes/AddRecipe";
import { AddRecipeVariables } from "src/content/pages/MyChefsbase/Recipes/types/AddRecipe";
import { FormFieldMultiLine } from "src/content/pages/SignIn";
import { StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";

export const AddMethodsForRecipe = ({ values }: { values: Form }) => {
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
