import { useQuery } from "@apollo/client";
import { Button, Checkbox, Container, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FormikSelect } from "src/components/form/FormikSelect";
import { LoadingScreen } from "src/components/layout";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { FormField } from "src/components/form/FormField";
import { AddRecipeInput, QuantityToId, StepToMethodInput } from "src/globalTypes";
import { composeValidators, required } from "src/utilities/formikValidators";
import { user } from "../..";
import { useFilterIngredientsQuery } from "../../Ingredients/api";
import { IngredientTable } from "../../Ingredients/components/IngredientTable"
import { initialIngredientValues } from "../../Ingredients/filterIngredients";
import { ingredient_ingredient } from "../../Ingredients/types/ingredient";
import { EnhancedTableToolbar, EnhancedTableHead, EnhancedTableToolbarIngredients } from "../../Menus/components/MenuTable";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { useAddRecipe } from "../api";
import { Divider } from '@mui/material';
import { AddRecipeVariables } from "../types/AddRecipe";
import { ingredientsQuery } from "./api";

export const AddRecipePage = () => {

    const { addRecipe, loading, error } = useAddRecipe({
        onCompleted: () => {}
          // window.alert(JSON.stringify(values));
          // window.location.reload()
        },
      );
      const [stepHere, setStep] = useState(1)
      const [selectedIngredients, setIngredients] = React.useState<ingredient_ingredient[]>([]);

      const [indexIngredient, setIndex] = useState(0)
    const formInput: AddRecipeInput = {
        name: '',
        rating: 0,
        type: '',
    }
    const emptyIngredientEntry: QuantityToId = {
        quantity: 0,
        unit: '',
        id: '',
        }
    const emptyStep: StepToMethodInput = {
            step: stepHere,
            method: ''
            }
    
    const formIngredients: QuantityToId[] | null = [emptyIngredientEntry]
        
    const formMethods: StepToMethodInput[] | null = [
        emptyStep
    ]
    const formState : AddRecipeVariables = {
        input: formInput,
        ingredients: formIngredients,
        method: formMethods
    }
        
    return (
        <>
        <Helmet>
        <title>Nieuw recept</title>
      </Helmet>
      <PageTitleWrapper>
      <PageHeader
        title="Nieuw recept"
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
          addRecipe({
            variables: {
                method: values.method,
                ingredients: values.ingredients,
                input: {
                type: values.input.type,
                name: values.input.name,
                rating: values.input.rating
              },
            },
          });
        }}
      >
        {({ values, handleChange, submitForm, setFieldValue }) => {
          return (
            <>
            <Grid container xs={12} spacing={2}>
                <Grid xs={6}>
                <Grid xs={5}>
                <Typography>Geef dit recept een naam</Typography>
                <FormField
                  name="input.name"
                  label="Naam"
                  validator={composeValidators(required)}
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                <Rating1
                updateField="input.rating"
                setFieldValue={setFieldValue}
                />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={5}>
                <Typography>Geef het recept type aan</Typography>
                <FormField
                  name="input.type"
                  label="Type"
                />
                </Grid>                
                </Grid>
                <Grid xs={6}>
                <Grid xs={12}>
                Stappenplan om dit recept te maken:
                <Grid xs={12}>
                <FieldArray
                name="method"
                render={arrayHelpers => (
                <div>
                    <Table>
                 {values.method?.map((stepToMethod, index)=> (
                   <TableRow>
                     <div key={stepToMethod.step}>
                         <TableCell>
                         <TextField
                        id={`method.${index}.step`}
                        name={`method.${index}.step`}
                       label="Stap"
                       value={stepToMethod.step}
                       onChange={handleChange}
                        />
                        </TableCell>
                        <TableCell>
                        <TextField
                        id={`method.${index}.method`}
                        name={`method.${index}.method`}
                       label="Methode"
                       value={stepToMethod.method}
                       onChange={handleChange}
                        />
                        </TableCell>
                        <TableCell>
                        <Button
                            variant="contained" 
                            color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => {
                             setStep(stepHere -1);
                             arrayHelpers.remove(index)}}>
                        -
                       </Button>
                        </TableCell>
                            
                     </div>
                     </TableRow>
                   ))}
                   <TableRow>
                       <Button
                       variant="contained" 
                       color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => {
                         setStep(stepHere + 1)
                         arrayHelpers.push(emptyStep)}}>
                        +
                       </Button>
                   </TableRow>
                   </Table>
                   </div>
                )}
                />
                </Grid>
                </Grid> 
                </Grid>
                </Grid>
                <Grid xs={12}></Grid>
                <Divider/>
                <Grid container xs={12}>
                  <Grid xs={6}>
                Ingredienten:
                </Grid>
                <Grid xs={6}></Grid>
                <Grid xs={6}>
                <Table>
                  <TableRow>
                    <TableCell>Ingredient</TableCell>
                    </TableRow>
                <FieldArray
                name="ingredients"
                render={arrayHelpers => (
                <div>     
                 {values.ingredients?.map((quantityToIngredient, index) => (
                     <>
                       <div key={index}>
                        <TableRow>
                            <TableCell>
                              {quantityToIngredient.id}
                             </TableCell>
                             <TableCell>
                        {quantityToIngredient.quantity}
                        </TableCell>
                        <TableCell>
                        <TextField
                        fullWidth
                        id={`ingredients.${index}.unit`}
                        name={`ingredients.${index}.unit`}
                       label="Eenheid"
                       value={quantityToIngredient.unit}
                       onChange={handleChange}
                        />
                        </TableCell>
                        <TableCell>
                            <Button
                            variant="contained" 
                            color="secondary"
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} type="button" 
                         onClick={() => arrayHelpers.remove(index)}>
                        -
                       </Button>
                       </TableCell>
                     </TableRow>
                     </div>
                     </>
                   ))}
                </div>
                )}
                />
                </Table>
                </Grid>
                <Grid xs={6}>
                  <TableData 
                  setIngredients={(selected) => setFieldValue(`ingredients`, mapIngredientToQToInput({selected}))
                  }/>
                    {/* <SelectIngredient 
                    setIngredients={(selected) => setIngredients(selected)}
                    setField={(selected) => {
                      setFieldValue(`ingredients.${indexIngredient}.id`, selected[indexIngredient].id)
                    
                    }
                    }
                    /> */}
                  </Grid>
                </Grid>             
                {error && (
                  <Typography color="error">
                    Er is een fout opgetreden, probeer het opnieuw.
                  </Typography>
                )}
                <Button
                  disabled={loading}
                  onClick={() => submitForm()}
                  color="primary"
                >
                  Gegevens toevoegen
                </Button>
            </>
          );
        }}
      </Formik>
      </Grid>
        </Grid>
      </Container>
      </>
          )
}

export type ingredientToQ = {
  name: string,
  id: string,
  quantity: string,
  unit: string
}

const mapToInput = ({ingredient, quantity, unit}:  {ingredient: ingredient_ingredient, quantity: string, unit: string}): ingredientToQ => {
  return (
    {
    name: ingredient.name,
    id: ingredient.id,
    quantity: quantity,
    unit: unit
  })
}

export const SelectIngredientComplete = ({
  setIngredients
}:
{
  setIngredients: (selected: ingredientToQ[]) => void
}) => {
  const { loading, data, error } = useQuery(ingredientsQuery)
  const [selected, setSelected] = React.useState<readonly ingredientToQ[]>([]);
  const mapIt = (ingredients: readonly ingredientToQ[]): ingredientToQ[] => {
    return ingredients.map((i) => (
      {
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        unit: i.unit,
      }
    )
    )
  }

  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

    const handleClick = (event: React.MouseEvent<unknown>, ingredient: ingredientToQ) => {
        const selectedIndex = selected.indexOf(ingredient);
        let newSelected: readonly ingredientToQ[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, ingredient);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
        setIngredients(mapIt(newSelected));
      };
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = data.ingredients.map((ingredient) => mapToInput(ingredient));
          setSelected(newSelecteds);
          setIngredients(mapIt(newSelecteds));
          return;
        }
        setSelected([]);
        setIngredients([]);
    };
    const isSelected = (id: string) => selected.map((i) => i.id).indexOf(id) !== -1;

  
    return (
      <>
  <TableContainer component={Paper}>
  <Table>
  <EnhancedTableHead
  numSelected={selected.length}
  onSelectAllClick={handleSelectAllClick}
  rowCount={data.ingredients.length}
  headCells={["Ingredient", "Hoeveelheid", "Eenheid", "rating"]}
  />
  <TableBody>
  
              </TableBody>
                     </Table>
                     </TableContainer>              
                  </>
    )
}

const mapIngredientToQToInput = ({selected}: {selected: ingredientToQ[]}): QuantityToId[] => {
  return selected.map((a) => (
    {
      id: a.id,
      quantity: Number(a.quantity),
      unit: a.unit
    }
  ))
}

const TableData = ({setIngredients}: {setIngredients: (selected: ingredientToQ[]) => void} ) => {
  const [ingredients, setIngrs] = useState<ingredientToQ[]>([])

  const { loading, data, error } = useQuery(ingredientsQuery)
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <Table>
      <TableContainer>
        <TableRow>
          <TableCell>Ingredient</TableCell>
          <TableCell>Hoeveelheid</TableCell>
          <TableCell>Eenheid</TableCell>
        </TableRow>
        {data.ingredients.map((ingredient) => (
          <Row 
          data={ingredient}
          setIngredient={(a: ingredientToQ) => ingredients.push(a)}/>
        ))}
      </TableContainer>
    </Table>
  )
}

const Row = ({data, setIngredient}: {data: ingredient_ingredient, setIngredient: (a) => void}) => {

  const formState: ingredientToQ = {
  name: data.name,
  id: data.id,
  quantity: '',
  unit: ''
}

  return (
    <Formik
        initialValues={formState}
        onSubmit={(values) => {
          setIngredient(values);
        }}
      >
        {({ submitForm }) => {
      return (
        <>
        <TableRow>
          <TableCell>
            {data.name}
          </TableCell>
          <TableCell>
            <FormField
                  name="quantity"
                  label="Hoeveelheid"
                  validator={composeValidators(required)}
                />
          </TableCell>
          <TableCell>
            <FormField
                  name="unit"
                  label="Eenheid"
                  validator={composeValidators(required)}
                />
          </TableCell>
          <TableCell>
          <Button
                  onClick={() => {submitForm()}}
                  color="primary"
                >
                  +
                </Button>
          </TableCell>
        </TableRow>
      </>
      )
        }
      }
      </Formik>
  )
}

export const SelectIngredient = ({
    setField,
    setIngredients
}: {
    setField: (selected: ingredient_ingredient[]) => void
    setIngredients: (selected: ingredient_ingredient[]) => void
    }) => {
    const { loading, data, error } = useQuery(ingredientsQuery)

    const mapIt = (ingredients: readonly ingredient_ingredient[]): ingredient_ingredient[] => {
      return ingredients.map((i) => (
        {
          id: i.id,
          __typename: i.__typename,
          products: i.products,
          rating: i.rating,
          name: i.name
        }
      )
      )
    }
    const [selected, setSelected] = React.useState<readonly ingredient_ingredient[]>([]);
    const handleClick = (event: React.MouseEvent<unknown>, ingredient: ingredient_ingredient) => {
        const selectedIndex = selected.indexOf(ingredient);
        let newSelected: readonly ingredient_ingredient[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, ingredient);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
        setIngredients(mapIt(newSelected));
      };
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = data.ingredients.map((ingredient) => ingredient);
          setSelected(newSelecteds);
          setIngredients(mapIt(newSelecteds));
          return;
        }
        setSelected([]);
        setIngredients([]);
    };
    const isSelected = (ingredient: ingredient_ingredient) => selected.indexOf(ingredient) !== -1;

    if (loading) return <LoadingScreen />;
    if (error) return <LoadingScreen />;
    
    return (
        <>
  <TableContainer component={Paper}>
  <Table>
  <EnhancedTableHead
  numSelected={selected.length}
  onSelectAllClick={handleSelectAllClick}
  rowCount={data.ingredients.length}
  headCells={headCellsIngredients}
  />
  <TableBody>
  {data.ingredients.map((ingredient, index) => {
                  const isItemSelected = isSelected(ingredient);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                      <>
                      <TableRow
                      hover
                      onClick={(event) => handleClick(event, ingredient)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={ingredient.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell 
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      >{ingredient.name}</TableCell>
                      <TableCell align="left">{ingredient.rating}</TableCell>
                      <TableCell 
                  align="center"
                  >
                  </TableCell>
                    </TableRow>
                   </>
                  )
              })}
              </TableBody>
                     </Table>
                     </TableContainer>              
                  </>
    )
}

const headCellsIngredients: string[] = [
    "Naam", "rating"
  ]