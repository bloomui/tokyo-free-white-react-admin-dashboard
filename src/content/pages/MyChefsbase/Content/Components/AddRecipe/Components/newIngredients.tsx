import { Grid, Divider, MenuItem, Button } from "@material-ui/core";
import { FieldArray } from "formik";
import { useState } from "react";
import { FormField } from "src/components/form/FormField";
import { FormikSelect } from "src/components/form/FormikSelect";
import { H5 } from "src/content/pages/Components/TextTypes";
import { units } from "src/content/pages/MyChefsbase/Recipes/AddRecipe/components/IngredientTable";
import { AddRecipeVariables } from "src/content/pages/MyChefsbase/Recipes/types/AddRecipe";
import { composeValidators, required, mustBeNumber } from "src/utilities/formikValidators";
import { emptyNewIngredientEntry } from "./Utils/Conts";

export const AddNewIngsForRecipe = ({
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

