import { Button, TextField, TableBody, Container, Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, Dialog, DialogContent, DialogTitle, CircularProgress } from "@material-ui/core"
import { Formik } from "formik"
import React from "react"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router"
import Footer from "src/components/Footer"
import { FormField } from "src/components/form/FormField"
import { PageHeader } from "src/components/pageHeader/PageHeader"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import { clearAuth } from "src/utilities/auth"
import { composeValidators, required } from "src/utilities/formikValidators"
import { H5 } from "../Components/TextTypes"
import { IngredientSelector } from "../MyChefsbase/Content/Components/AddRecipe/Components/Utils/IngredientSelector"
import { IngredientIdsForm, IngredientNamesForm, IngredientsForm } from "../MyChefsbase/Recipes/AddRecipe"
import { useAddToInventory, useInventoryQuery } from "./api"
import { addToInventoryVariables } from "./types/addToInventory"
import { listInventory_listInventory } from "./types/listInventory"

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

const AddToInventory = ({open, onClose}: {open: boolean; onClose:  () => void;}) => {

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
              initialValues={form}
              onSubmit={(values) => {
                addToInventory({
                  variables: {
                    inventoryInput : values.inventoryInput
                }
            });
              }}>
              {({ values, handleChange, submitForm, setFieldValue }) => {
                return (
                  <>
                    <Table>
                    <TableHead>
                        <TableRow><H5 title={`Voeg ingredienten toe`}/></TableRow>
                        </TableHead>
                        <TableRow>
                            <TableCell><H5 title="Ingredient:"/></TableCell>
                            <TableCell><H5 title="Product:"/></TableCell>
                            <TableCell colSpan={2}><H5 title="Hoeveelheid:"/></TableCell>
                            <TableCell><H5 title="Prijs:"/></TableCell>
                            <TableCell><H5 title="Geldig tot:"/></TableCell>
                            </TableRow>
                    <TableBody>
                        {values.inventoryInput.map((input, index) => (
                            <IngredientSelector
                            placeholder={`values.inventoryInput.${index}.ingredientName`}
                            form={ingredientForm}
                            index={index}
                            field={`values.inventoryInput.${index}.ingredientName`}
                            setFieldValue={setFieldValue}
                          />
                            // <TableRow>
                            //     {/* <TableCell colSpan={3}> */}
                            //     </TableRow>
                                
                        //         {/* </TableCell> */}
                        // {/* <TableCell align="center">
                        //     <FormField
                        //     label="Hoeveelheid"
                        //     name={`input.inventoryInput.${index}.q`}
                        //     validator={composeValidators(required)}
                        //   /></TableCell> 
                        //   <TableCell>
                        //   <FormField
                        //     label="Meeteenheid"
                        //     name={`input.inventoryInput.${index}.u`}
                        //     validator={composeValidators(required)}
                        //   />
                        //   </TableCell> */}
                        //      {/* <TableCell><FormField
                        //     label="Prijs"
                        //     name={`input.inventoryInput.${index}.price`}
                        //     validator={composeValidators(required)}
                        //   /></TableCell>
                        //     <TableCell>
                        //         <FormField
                        //     label="Tot datum"
                        //     name={`input.inventoryInput.${index}.exp`}
                        //     validator={composeValidators(required)}
                        //   /></TableCell> */}
                        ))}
                    </TableBody>
                </Table>
                  </>
                )
              }
            }
            </Formik>
            </DialogTitle>
            </Dialog>
            )
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
