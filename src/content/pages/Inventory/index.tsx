import { Button, TextField, TableBody, Container, Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, Dialog, DialogContent, DialogTitle, CircularProgress, IconButton, MenuItem } from "@material-ui/core"
import { FieldArray, Formik } from "formik"
import React from "react"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router"
import Footer from "src/components/Footer"
import { FormField, FormFieldEdit } from "src/components/form/FormField"
import { PageHeader } from "src/components/pageHeader/PageHeader"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import { clearAuth } from "src/utilities/auth"
import { composeValidators, mustBeNumber, required } from "src/utilities/formikValidators"
import { H5 } from "../Components/TextTypes"
import { IngredientSelectorInventory, IngredientSelectorInventory1 } from "../MyChefsbase/Content/Components/AddRecipe/Components/Utils/IngredientSelector"
import { IngredientIdsForm, IngredientNamesForm, IngredientsForm } from "../MyChefsbase/Recipes/AddRecipe"
import { useAddToInventory, useInventoryQuery } from "./api"
import { addToInventoryVariables } from "./types/addToInventory"
import { listInventory_listInventory } from "./types/listInventory"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { InventoryInput, InventoryProductInput } from "src/globalTypes"
import { useGetProductsForIngredients } from "../MyChefsbase/Ingredients/api"
import { validate } from "graphql"
import { FormikSelect } from "src/components/form/FormikSelect"
import { getUnitsForMaterial, units } from "../MyChefsbase/Recipes/AddRecipe/components/IngredientTable"
import { Quantity } from "../MyChefsbase/Content"

export const InventoryPage = () => {
    const navigate = useNavigate()
    const { data, loading, error } = useInventoryQuery()

    if (loading) return <CircularProgress/>

    if (error) return <CircularProgress/>
    
    
    
    return (
        <>
      <Helmet>
        <title>My Chefsbase</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
        title="Inventaris"
        name=""
        avatar='/static/images/avatars/SB_logo.png' />
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
         <Content ingredients={data.listInventory}/>
          </Grid>
          <Grid item lg={8} xs={12}>
            <Button onClick={() => {
              clearAuth();
              navigate(`/`)
            }

            }>Log Out</Button>         
            </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
    )
}

const Content  = ({ingredients}: {ingredients: listInventory_listInventory[]}) => {

    const [open, setOpen] = useState(false)
    const [openInventory, setOpenInventory] = useState(false)
    const [inv, setInv] = useState<listInventory_listInventory>()
    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><H5 title="Ingredient"/></TableCell>
                    <TableCell><H5 title="Hoeveelheid"/></TableCell>
                    <TableCell><H5 title="Bestel"/></TableCell>
                    </TableRow>
            </TableHead>
            <TableBody>
                {ingredients && ingredients.map((inventory) => (
                    <TableRow>
                        <TableCell align="center">{inventory.ingrName}</TableCell>
                        <TableCell align="center">
                            <TextField 
                            size="small"
                            style={{maxWidth: '100px'}}
                            placeholder={String(inventory.quantity.quantity)} />
                            {inventory.quantity.unit}
                            </TableCell>
                        <TableCell align="center"><Button onClick={() => {
                            setOpen(true);
                            setInv(inventory)
                            } 
                        }
                            variant="outlined">Bijbestellen</Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <Order inventory={inv} open={open} onClose={() => setOpen(false)}/>
            <AddToInventory open={openInventory} onClose={() => setOpenInventory(false)}/>
        </Table>
        <Button fullWidth onClick={() => setOpenInventory(true)} variant="outlined">Ingredienten toevoegen</Button>
        </TableContainer>
    )
}

export interface Ingredient {
  id: string;
  name: string
}

export interface Product {
  name: string;
  expiration: string;
  price: number;
}


export interface InventoryForm {
  ingredient: Ingredient;
  quantity: QuantityForm
  product: Product;
}

export type QuantityForm = {
  quantity: string,
  unit: string
}
export const zeroQuantity: QuantityForm = {
  quantity: "",
  unit: ""
}

export const emptyRow: InventoryForm = {
  ingredient: {
    id: "",
    name: ""
  },
  quantity: zeroQuantity,
  product: {
    expiration: "",
    price: 0,
    name: ""
}
}

export const valuesForm: InventoryForm[] = [
  emptyRow
]


const Row1 = ({setFieldValue, index, values}: {values: InventoryForm[]; setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void ; index: number}) => {

  const [open, openProducts] = useState(false)
  return (
    <>
    <Grid container xs={12}>
      <Grid xs={6}>
                            <IngredientSelectorInventory1
                            index={index}
                            fieldValue={`values.${index}.ingredient`}
                            setFieldValue={setFieldValue}
                          />
                          </Grid>
                          <Grid xs={3}>
                          <FormFieldEdit
          placeholder={valuesForm[index].quantity.quantity}
          name={`values.inventoryInput.${index}.quantity.quantity`}
          label="Hoeveelheid"
          validator={composeValidators(required, mustBeNumber)}
        />
      </Grid>
      <Grid xs={3}>
                          <FormFieldEdit
          placeholder={valuesForm[index].quantity.unit}
          name={`values.inventoryInput.${index}.quantity.unit`}
          label="Meeteenheid"
          validator={composeValidators(required)}
        />
      </Grid>
      <Grid xs={12}>
        {open ? <Button onClick={() => openProducts(false)} variant="outlined">Producten niet toevoegen?</Button> : <Button onClick={() => openProducts(true)} variant="outlined">Producten toevoegen?</Button>}
        {open? <Grid xs={12}>
          <Grid xs={3}>
          <FormFieldEdit
          placeholder=""
          name={`values.inventoryInput.${index}.product.name`}
          label="Product"
          validator={composeValidators(required)}
        />
          </Grid>
          <Grid xs={3}>
          <FormFieldEdit
          placeholder=""
          name={`values.inventoryInput.${index}.product.price`}
          label="Prijs"
          validator={composeValidators(required)}
        />
          </Grid>
          <Grid xs={3}>
          <FormFieldEdit
          placeholder=""
          name={`values.inventoryInput.${index}.product.exp`}
          label="Houdbaar"
          validator={composeValidators(required)}
        />
          </Grid>
        </Grid> : <></>}
      </Grid>
                          </Grid>
                          </>
  )
}

const Row = ({ingredientForm, setFieldValue, input, index, values}: {values: addToInventoryVariables; ingredientForm: IngredientIdsForm; setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void ; input: InventoryInput; index: number}) => {
  
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const [stepHere, setStep] = useState(0)

  const emptyStep : InventoryProductInput = {
    id: "",
    q: 0,
    unit: "",
    exp: "",
    price: 0
  }

  const { data, loading, error } = useGetProductsForIngredients({id: values.inventoryInput[index].ingrId})
  
  if (loading) return <CircularProgress />
  if (error) return <CircularProgress />

  return (
        <>
                            <IngredientSelectorInventory
                            form={ingredientForm}
                            index={index}
                            fieldValue={`values.inventoryInput.${index}`}
                            setFieldValue={setFieldValue}
                          />
                          <Grid xs={2}><IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpenCollapse(!openCollapse)}
                        >
                          {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton></Grid>

                        <Grid container xs={12}>
      <FieldArray
        name="ingredients.products"
        render={(arrayHelpers) => (
          <>
            <Grid xs={1}></Grid>
            <Grid xs={1}>Stap</Grid>
            <Grid xs={8}>Actie</Grid>
            <Grid xs={2}></Grid>
            {values.inventoryInput[index].products?.map((product, index1) => (
              <>
                <Grid xs={1}></Grid>
                <Grid xs={1}>{index + 1}</Grid>
                <Grid xs={8}>
                  <FormField
                    name={`inventoryInput.${index}.products.${index1}.q`}
                    label="Product"
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
                        {openCollapse && <Grid xs={12}>
                          <Grid xs={12}>
                            {data && data.ingredient && data.ingredient.products.map((prod, index1) => (
                              <>
                              <Grid xs={4}>{prod.name}</Grid>
                              <Grid xs={2}>
        <FormField
          name={`values.inventoryInput.${index}.products.${index1}.quantity`}
          label="Hoeveelheid"
          validator={composeValidators(required, mustBeNumber)}
        />
      </Grid>
      <Grid xs={2}>
        <FormikSelect
          validate={composeValidators(required)}
          name={`values.inventoryInput.${index}.products.${index1}.unit`}
        >
          {units.map((unit) => (
            <MenuItem key={unit} value={unit}>
              {unit}
            </MenuItem>
          ))}
        </FormikSelect>
      </Grid>
      <Grid xs={2}>
      <FormField
          name={`values.inventoryInput.${index}.products.${index1}.price`}
          label="Prijs"
        />
        </Grid>
        <Grid xs={2}>
        <FormField
          name={`values.inventoryInput.${index}.products.${index1}.exp`}
          label="Houdbaar tot"
        />
</Grid>
      </>
                            ))}
                        </Grid> </Grid>}
                        </>
                        )
}
const AddToInventory = ({open, onClose}: {open: boolean; onClose:  () => void;}) => {

  const [stepHere, setStep] = useState(1)
    const form: addToInventoryVariables = {
        inventoryInput: [{
            ingrId: '',
            products: [{
                id: '',
                q: 0,
                unit: '',
            }]
        }]
    }
    const ingredientForm: IngredientIdsForm = {
        id: '',
        quantity: '',
        unit: ''
    }

    const { addToInventory, loading, error } = useAddToInventory({
        onCompleted: () => {
          window.location.reload();
        },
      });
      
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
            <Formik
              initialValues={valuesForm}
              onSubmit={(values) => {
                addToInventory({
                  variables: {
                    inventoryInput : toInput(values)
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
                    name="values"
                    render={(arrayHelpers) => (
          <>
            <Grid xs={1}></Grid>
            <Grid xs={2}></Grid>
            {values.map((form, index) => {
              return (
              <>
                          <Row1 values={values} setFieldValue={setFieldValue} index={index}/> 
                        <Grid xs={1}>
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
                      arrayHelpers.push(emptyRow);
                    }}
                  >
                    +
                  </Button>
                </Grid>   
                </>
            )
            })}
            )
                  </>
                )
              }
              />
              </Grid>
              </>
              )
              }}
            </Formik>
            </DialogTitle>
            </Dialog>
            )
        }
        export const toInput = (input: InventoryForm[]): InventoryInput[] => {

          const result: InventoryInput[] = input.map((i) => ({
            ingrId: i.ingredient.id,
            products: [{
              id: i.product.name,
              q: 0,
              unit: "",
              exp: i.product.expiration,
              price: Number(i.product.price)
          }]
        }))
        return result
      }

const Order = ({inventory, open, onClose}: {inventory: listInventory_listInventory, open: boolean, onClose: () => void}) => {
    const a = '';
    const [quantity, setQuantity] = useState('0')

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <H5 title={`Bestel ${inventory ? inventory.ingrName: a} bij`}/>
            </DialogTitle>
            <DialogContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><H5 title="Bestel bij:"/></TableCell>
                            <TableCell><H5 title="Prijs per hoeveelheid:"/></TableCell>
                            <TableCell><H5 title="Aantal:"/></TableCell>
                            </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventory && inventory.products && inventory.products.map((option) => (
                            <TableRow>
                        <TableCell align="center">{option.name}</TableCell> 
                        <TableCell align="center"> <Grid>{`€${((Number(option.quantity) / Number(option.quantity) ) * option.price).toFixed(2)}`} per </Grid>
                        <Grid>{option.quantity.quantity} {option.quantity.unit}</Grid></TableCell> 
                        <TableCell align="center">
                        <TextField 
                            size="small"
                            style={{maxWidth: '100px'}}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder={String(quantity)} />
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button fullWidth variant="outlined">Bestellen</Button>
            </DialogContent>
        </Dialog>
    )
}
