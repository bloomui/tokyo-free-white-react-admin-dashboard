import { Button, TextField, TableBody, Container, Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, Dialog, DialogContent, DialogTitle } from "@material-ui/core"
import React from "react"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router"
import Footer from "src/components/Footer"
import { PageHeader } from "src/components/pageHeader/PageHeader"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import { clearAuth } from "src/utilities/auth"
import { H5 } from "../Components/TextTypes"
import { IngredientNamesForm, IngredientsForm } from "../MyChefsbase/Recipes/AddRecipe"

export const InventoryPage = () => {

    const navigate = useNavigate()
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
         <Content ingredients={ingreds}/>
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

const ingreds: IngredientsForm[] = [
    {
    name: "Komijn",
    id: "KomijnId",
    quantity: "500",
    unit: "gram"
    },
    {
    name: "Wortelen",
    id: "WortelenId",
    quantity: "10",
    unit: "kg"
    },
    {
    name: "Paprika",
    id: "PaprikaId",
    quantity: "20",
    unit: "kg"
            }  
];

const Content  = ({ingredients}: {ingredients: IngredientsForm[]}) => {

    const [open, setOpen] = useState(false)
    const [ingr, setIngr] = useState<IngredientsForm>()
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
                {ingredients && ingredients.map((ingredient) => (
                    <TableRow>
                        <TableCell align="center">{ingredient.name}</TableCell>
                        <TableCell align="center">
                            <TextField 
                            size="small"
                            style={{maxWidth: '100px'}}
                            placeholder={ingredient.quantity} />
                            {ingredient.unit}
                            </TableCell>
                        <TableCell align="center"><Button onClick={() => {
                            setOpen(true);
                            setIngr(ingredient)
                            } 
                        }
                            variant="outlined">Bijbestellen</Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <Order ingredient={ingr} open={open} onClose={() => setOpen(false)}/>
        </Table>
        </TableContainer>
    )
}

const Order = ({ingredient, open, onClose}: {ingredient: IngredientsForm, open: boolean, onClose: () => void}) => {
    const a = '';
    const [quantity, setQuantity] = useState('0')

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <H5 title={`Bestel ${ingredient ? ingredient.name: a} bij`}/>
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
                        {options.map((option) => (
                            <TableRow>
                        <TableCell align="center">{option.name}</TableCell> 
                        <TableCell align="center"> <Grid>{`€${((Number(option.quantity) / Number(option.quantity) ) * option.price).toFixed(2)}`} per </Grid>
                        <Grid>{option.quantity} {option.unit}</Grid></TableCell> 
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

const options = [
    {
        name: 'Sligro',
        price: 1.0,
        quantity: 100.0,
        unit: 'gram'
    },
    {
        name: 'Makro',
        price: 1.1,
        quantity: 105.0,
        unit: 'gram'
    }
]