import { Dialog, DialogTitle, DialogContent, Card, CardActionArea, Grid, Typography, TableContainer, TableBody, TableCell, TableHead, TableRow, List, ListItem, Button, DialogActions } from "@material-ui/core"
import React, { useState } from "react"
import { LoadingScreen } from "src/components/layout"
import { FilterDishes_filterDishes_method, FilterDishes_filterDishes_recipes } from "../../Dishes/types/FilterDishes"
import { ItemString, ItemInt } from "../../Menus/menuDialog"
import { useGetIngredientQuery } from "../api"
import { FilterIngredients_filterIngredients_products } from "../types/FilterIngredients"
import { UpdateIngredientDialog } from "./UpdateIngredientDialog"

export const IngredientDialog = ({
    setId,
    id,
    open,
    onClose,
}: {
    id: string;
    setId: () => void;
    open: boolean;
    onClose: () => void
}) => {

    const { data, loading, error } = useGetIngredientQuery(id)

    const [openUpdateDialog, setUpdateDialog] = useState(false)

    if (loading) return <LoadingScreen/>
    if (error) return <LoadingScreen/>

    let ingredient = data.ingredient

    return (
        <>
        <Dialog open={open} onClose={onClose}>
            {ingredient && (
             <>
                <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">Ingredient: {ingredient.name}</DialogTitle>
                <DialogActions>
                <Button variant="contained" onClick={onClose}>
                  Terug
                </Button>
                <Button variant="contained" onClick={() => {
                        setId();
                        setUpdateDialog(true);
                        onClose()
                }}>
                  Ingredient aanpassen
                </Button>
              </DialogActions>
              <DialogContent>
                  <Card>
                      <Grid container spacing={2} xs={12}>
                       <ItemInt 
                       title="rating"
                       item={ingredient.rating}
                       />
                      <ItemProducts
                      title="Producten"
                      item={ingredient.products}
                      />
                      
                      </Grid>
                  </Card>
              </DialogContent>
            </>
            )}
        </Dialog>
        <UpdateIngredientDialog
        ingredient={ingredient}
        open={openUpdateDialog}
        onClose={() => setUpdateDialog(false)}
        />
        </>
    )
}
export const ItemProducts = ({title, item}: {title: string, item: FilterIngredients_filterIngredients_products []| null;}) => {
    return (
        <>
        <Grid key={0} item xs={12}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
        </Grid> 
                    {item && item.map((product) => (
                <Grid item xs={12}>
                                <Typography align="center">- {product.name}</Typography>
                            </Grid>
                    ))}
            </>
    )
}

