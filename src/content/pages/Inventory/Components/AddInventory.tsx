import { Dialog, DialogTitle, DialogContent, Grid, Button, Divider } from "@material-ui/core";
import { Formik, FieldArray } from "formik";
import { useState } from "react";
import { FormFieldEdit } from "src/components/form/FormField";
import { composeValidators, required, mustBeNumber, mustBeDate } from "src/utilities/formikValidators";
import { H5 } from "../../Components/TextTypes";
import { IngredientSelectorInventory1 } from "../../MyChefsbase/Content/Components/AddRecipe/Components/Utils/IngredientSelector";
import { IngredientsForm } from "../../MyChefsbase/Recipes/AddRecipe";
import { useAddToInventory } from "../api";
import { emptyInventoryForm, inputInventory, InventoryInputForm, toInput } from "./Constants";

export const AddToInventory = ({open, onClose}: {open: boolean; onClose:  () => void;}) => {

    const [stepHere, setStep] = useState(1)
      
      const { addToInventory, loading, error } = useAddToInventory({
          onCompleted: () => {
            window.location.reload();
          },
        });
        
      return (
          <Dialog open={open} onClose={onClose}>
              <DialogTitle>
              </DialogTitle>
              <DialogContent>
              <Formik
                initialValues={inputInventory}
                onSubmit={(values) => {
                  addToInventory({
                    variables: {
                      inventoryInput : toInput(values.inputForm)
                  }
              });
                }}>
                {({ values, handleChange, submitForm, setFieldValue }) => {
                  console.log(values)
                  return (
                    <>
                      <Grid container xs={12}>
                      <Grid xs={12}><H5 title={`Voeg ingredienten toe`}/></Grid>
                              <Grid xs={6}><H5 title="Ingredient:"/></Grid>
                              
                              <Grid xs={2}></Grid>
                              <FieldArray
                      name="inputForm"
                      render={(arrayHelpers) => (
            <>
              <Grid xs={1}></Grid>
              <Grid xs={2}></Grid>
              {values.inputForm.map((form, index) => {
                return (
                <>
  
      <Grid container xs={12}>
        <Row values={values.inputForm} setFieldValue={setFieldValue} index={index}/> 
                            <Grid xs={2}>
                            <Grid xs={6}>
                    {index >= 0 ? (
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
                      <Grid xs={6}></Grid>
                    )}
                  </Grid>
                  <Grid xs={6}>
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
                        arrayHelpers.push(emptyInventoryForm);
                      }}
                    >
                      +
                    </Button>
                  </Grid> 
                            </Grid>
                            <Divider />
                  </Grid> 
                  </>
              )
              })}
                    </>
                  )
                }
                />
                <Grid xs={4}>
                <Button
                                    onClick={() => submitForm()}
                                    color="primary"
                                    variant="outlined"
                                  >
                                    Voeg toe aan inventaris
                                  </Button>
                                  </Grid>
                                  <Grid xs={2}></Grid>
                                  <Grid xs={4}><Button
                                    onClick={onClose}
                                    color="primary"
                                    variant="outlined"
                                  >
                                    Sluiten
                                  </Button>
                                  </Grid>
                </Grid>
                
                </>
                  )
                }}
              </Formik>
              </DialogContent>
              </Dialog>
              )
          }
  
          const Row = ({setFieldValue, index, values}: {values: InventoryInputForm[]; setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void ; index: number}) => {

            const form: IngredientsForm = {
                id: values[index].ingredientid,
                name: values[index].ingredientname,
                quantity: values[index].quantity,
                unit: values[index].unit,
            };
            
            return (
              <>
                <Grid xs={4}>
                                      <IngredientSelectorInventory1
                                      placeholder={form.name ? form.name : "Zoek" }
                                      form={{
                                        id: form.id,
                                        name: form.name,
                                        quantity: form.quantity,
                                        unit: form.unit,
                                      }
                                      }
                                      index={index}
                                      setFieldValue={setFieldValue}
                                    />
                                    </Grid>
                                    <Grid xs={3}>
                                    <FormFieldEdit
                    placeholder={values[index].quantity}
                    name={`inputForm.${index}.quantity`}
                    label="Hoeveelheid"
                    validator={composeValidators(required, mustBeNumber)}
                  />
                </Grid>
                <Grid xs={3}>
                                    <FormFieldEdit
                    placeholder={values[index].unit}
                    name={`inputForm.${index}.unit`}
                    label="Meeteenheid"
                    validator={composeValidators(required)}
                  />
                </Grid>
                <Grid xs={2}></Grid>
                    <Grid xs={2}>
                    <FormFieldEdit
                    placeholder=""
                    name={`inputForm.${index}.expiration`}
                    label="Houdbaarheid"
                    validator={composeValidators(required, mustBeDate)}
                  />
                    </Grid>
                    <Grid xs={2}>
                    <FormFieldEdit
                    placeholder=""
                    name={`inputForm.${index}.price`}
                    label="prijs"
                    validator={composeValidators(required)}
                  />
                    </Grid>
                    <Grid xs={3}>
                    <FormFieldEdit
                    placeholder=""
                    name={`inputForm.${index}.brand`}
                    label="Merk"
                    validator={composeValidators(required)}
                  />
                    </Grid>
                    <Grid xs={3}>
                    <FormFieldEdit
                    placeholder=""
                    name={`inputForm.${index}.origin`}
                    label="Herkomst"
                    validator={composeValidators(required)}
                  />
                    </Grid>
                                    </>
            )
          }