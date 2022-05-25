import { Button, TextField, TableBody, Container, Grid, Table, TableHead, TableRow, TableCell, Dialog, DialogContent, DialogTitle } from "@material-ui/core"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router"
import Footer from "src/components/Footer"
import { FormFieldEdit } from "src/components/form/FormField"
import { PageHeader } from "src/components/pageHeader/PageHeader"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import { clearAuth } from "src/utilities/auth"
import { composeValidators, mustBeDate, mustBeNumber, required } from "src/utilities/formikValidators"
import { H5 } from "../Components/TextTypes"
import { IngredientSelectorInventory1 } from "../MyChefsbase/Content/Components/AddRecipe/Components/Utils/IngredientSelector"
import { listInventory_listInventory } from "./types/listInventory"
import { ListInventory } from "./Components/ListInventory"
import { InventoryInputForm } from "./Components/Constants"

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
         <ListInventory/>
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

