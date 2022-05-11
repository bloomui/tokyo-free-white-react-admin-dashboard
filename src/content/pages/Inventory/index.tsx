import { Button, TableBody, Container, Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, Dialog, DialogContent, DialogTitle } from "@material-ui/core"
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
    
    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><H5 title="Ingredient"/></TableCell>
                    <TableCell><H5 title="Hoeveelheid"/></TableCell>
                    <TableCell><H5 title="Pas Aan"/></TableCell>
                    </TableRow>
            </TableHead>
            <TableBody>
                {ingredients && ingredients.map((ingredient) => (
                    <TableRow>
                        <TableCell align="center">{ingredient.name}</TableCell>
                        <TableCell align="center">{ingredient.quantity} {ingredient.unit}</TableCell>
                        <TableCell align="center"><Button onClick={() => setOpen(true)} variant="outlined">Acties</Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <Acties open={open} onClose={setOpen}/>
        </Table>
        </TableContainer>
    )
}

const Acties = ({open, onClose}: {open: boolean, onClose: () => void}) => {
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <H5 title="Acties"/>
            </DialogTitle>
            <DialogContent>
                <Grid container xs={12}>
                    <Grid xs={3}>
                        Bestel
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}