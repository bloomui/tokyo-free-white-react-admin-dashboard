import { Grid, Container, Dialog, CircularProgress, MenuItem, TextField, Button, TableCell, Divider, DialogTitle } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { H5 } from "../Components/TextTypes";
import { user } from "../MyChefsbase";
import { productToQ } from "../MyChefsbase/Ingredients/AddIngredient";
import { useGetMenuQuery } from "../MyChefsbase/Menus/api";
import { FilterMenus_filterMenus } from "../MyChefsbase/Menus/types/FilterMenus";
import { useGetProductQuery } from "../MyChefsbase/Products/api";
import { useGetIngredientsForMenuQuery, useGetProducts } from "./api";
import { IngredientsForMenu_ingredientsForMenu_ingredient_products } from "./types/IngredientsForMenu";

export const Orders = ({open, onClose, menu}: {open: boolean; onClose: () => void; menu: FilterMenus_filterMenus}) =>  {
    const [productToIngredient, setProductToIngredient] = React.useState<productToIngredient[]>([]);

    const handleChange = ({ index, productid, ingredientid}: { index: number, productid: string, ingredientid: string}) => {
        
        productToIngredient.push({
            index: index,
            productid: productid,
            ingredientid: ingredientid
                });
    }
    const {data: data1, loading: loading1, error: error1, refetch: refetch1 } = useGetProducts({
        ids: productToIngredient.map((it) => it.productid)
    })

    const {data, loading, error, refetch } = useGetIngredientsForMenuQuery(menu.id)


    if (error) return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <CircularProgress/>
        </Dialog>
    )
    if (error1) return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <CircularProgress/>
        </Dialog>
    )
    if (loading) return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <CircularProgress/>
        </Dialog>
    )
    if (loading1) return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <CircularProgress/>
        </Dialog>
    )

    return (
        <>
        <Dialog fullScreen open={open} onClose={onClose}>
            <DialogTitle>
            <Button variant="contained" color="primary" onClick={onClose}>Sluiten</Button>
            </DialogTitle>
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
            <Grid item xs={1}>
                      {ingredient.quantity.quantity}
            </Grid>
             <Grid item xs={1}>
                      {ingredient.quantity.unit}
             </Grid>
             <Grid item  xs={4}>
             <TextField
                      select
                      onChange={(e) => {
                          handleChange({
                              index: index,
                          productid: e.target.value, 
                          ingredientid: ingredient.ingredient.id,
                        });
                    refetch1({ids: productToIngredient.map((it) => it.productid)})
                }}
                      variant="filled"
                    >
                      {ingredient.ingredient.products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    </Grid>
                    <Grid xs={2}>
                    <ProductPrices
                    amount={data1.getProducts? (data1.getProducts[index]? (data1.getProducts[index]?.price.price)  : 0) : 0}
                    />
                        </Grid>
            </Grid>
              ))}
              <Divider/>
              <Grid container xs={12}>
                  <Grid xs={4}>
              <H5 title="Totaal" />
              </Grid>
              <Grid xs={6}></Grid>
              <Grid xs={2}>
              €{data1.getProducts? (data1.getProducts.map((it) => it.price.price)).reduce((a, b)  => a = a + b, 0) : 0}
              </Grid>
              </Grid>
          </Container>
        </Dialog>
          </>
    )
}

export const ProductPrices = ({amount}: {amount: number}) => {


    if (amount == 0) return (
        <>€ - </>
    )
    else return (
        <>
        {amount}
        </>
    )
}

export type productToIngredient = {
    index: number,
    productid: string,
    ingredientid: string,
}