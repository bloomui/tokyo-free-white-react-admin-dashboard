import { Dialog, DialogTitle, DialogContent, Card, CardActionArea, Grid, Typography, TableContainer, TableBody, TableCell, TableHead, TableRow, List, ListItem, Button, DialogActions } from "@material-ui/core"
import React, { useState } from "react"
import { LoadingScreen } from "src/components/layout"
import { FilterDishes_filterDishes_method, FilterDishes_filterDishes_recipes } from "../../Dishes/types/FilterDishes"
import { ItemString, ItemInt } from "../../Menus/menuDialog"
import { useGetIngredientQuery } from "../api"
import { FilterIngredients_filterIngredients_nutrition, FilterIngredients_filterIngredients_nutrition_nutrition, FilterIngredients_filterIngredients_products } from "../types/FilterIngredients"
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
                          <ItemString
                          title="categorie"
                          item={ingredient.category}
                          />
                       <ItemInt 
                       title="rating"
                       item={ingredient.rating}
                       />
                      <ItemProducts
                      title="Producten"
                      item={ingredient.products}
                      />
                      <Grid item xs={12}>Per {ingredient.nutrition.quantity.quantity} {ingredient.nutrition.quantity.unit}:</Grid>
                      <ItemNutrition
                      title="Voedingswaarde"
                      item={ingredient.nutrition.nutrition}
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
        <Grid key={1} item xs={12}>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Product Opties</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {item && item.map((product) => (
                <>
                        <TableRow>
                            <TableCell align="center">
                            {product.name}
                            </TableCell>
                        </TableRow>
                        </>
                    ))}
                    </TableBody>
                </TableContainer>
            </Grid>
            </>
    )
}

export const ItemNutrition = ({title, item}: {title: string, item: FilterIngredients_filterIngredients_nutrition_nutrition;}) => {
    return (
        <>
        <Grid key={0} item xs={12}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
        </Grid> 
        <Grid key={1} item xs={12}>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Voedingswaarde</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                <>
                        <TableRow>
                            <TableCell align="center">
                            Calorieën:</TableCell>
                            <TableCell> {item.kcal}
                            </TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell align="center">
                            Proteïne: </TableCell>
                            <TableCell>{item.protein.total}
                            </TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell align="center">
                            Vetten: </TableCell>
                            <TableCell>{item.fat.total}
                            </TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell align="center">
                            Koolhydraten: </TableCell>
                            <TableCell>{item.carbs.carbs}
                            </TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell align="center">
                            Suikers: </TableCell>
                            <TableCell>{item.carbs.sugar}
                            </TableCell>
                            </TableRow>
                            <TableRow>
                        </TableRow>
                        </>
                    </TableBody>
                </TableContainer>
            </Grid>
            </>
    )
}