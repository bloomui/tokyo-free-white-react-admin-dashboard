import { Grid, Container, Dialog, CircularProgress, MenuItem, TextField, Button } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { user } from "../MyChefsbase";
import { productToQ } from "../MyChefsbase/Ingredients/AddIngredient";
import { useGetMenuQuery } from "../MyChefsbase/Menus/api";
import { FilterMenus_filterMenus } from "../MyChefsbase/Menus/types/FilterMenus";
import { useGetProductQuery } from "../MyChefsbase/Products/api";
import { useGetIngredientsForMenuQuery } from "./api";
import { IngredientsForMenu_ingredientsForMenu_ingredient_products } from "./types/IngredientsForMenu";

export const Orders = ({open, onClose, menu}: {open: boolean; onClose: () => void; menu: FilterMenus_filterMenus}) =>  {
    const [productToIngredient, setProductToIngredient] = React.useState<productToIngredient[]>([]);
    const prices = []
    
    const handleChange = ({ productid, ingredientid}: { productid: string, ingredientid: string}) => {
        
        productToIngredient.push({
            productid: productid,
            ingredientid: ingredientid
                });
    }
    console.log(menu)
    const {data, loading, error, refetch } = useGetIngredientsForMenuQuery(menu.id)


    if (error) return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <CircularProgress/>
        </Dialog>
    )
    if (loading) return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <CircularProgress/>
        </Dialog>
    )

    return (
        <>
        <Dialog fullScreen open={open} onClose={onClose}>
        <Helmet>
        <title>{`Productoverzicht voor ${menu.name}`}</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
        title={`Productoverzicht voor ${menu.name}`}
        name={user.name}
        avatar={user.avatar} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
              {data.ingredientsForMenu.map((ingredient, index) => (
          <Grid container xs={12}>
          <Grid item xs={4}>
                      {ingredient.ingredient.name}
            </Grid>
            <Grid item xs={2}>
                      {ingredient.quantity.quantity}
            </Grid>
             <Grid item xs={2}>
                      {ingredient.quantity.unit}
             </Grid>
             <Grid item  xs={2}>
             <TextField
                      select
                      onChange={(e) => handleChange({
                          productid: e.target.value, 
                          ingredientid: ingredient.ingredient.id,
                        })}
                      variant="filled"
                    >
                      {ingredient.ingredient.products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}  €{(product.price.quantity.quantity / ingredient.quantity.quantity) * product.price.price}
                        </MenuItem>
                      ))}
                    </TextField>
                    </Grid>
                    <Grid xs={3}>

                        </Grid>
            </Grid>
              ))}
              <Button color="primary" onClick={onClose}>Sluiten</Button>
          </Container>
        </Dialog>
          </>
    )
}

export type productToIngredient = {
    productid: string,
    ingredientid: string,
}