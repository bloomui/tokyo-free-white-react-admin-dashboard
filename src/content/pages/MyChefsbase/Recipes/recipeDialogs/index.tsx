import { Dialog, DialogTitle, DialogContent, Card, CardActionArea, Grid, Typography, TableContainer, TableBody, TableCell, TableHead, TableRow, List, ListItem, Button, DialogActions } from "@material-ui/core"
import React from "react"
import { LoadingScreen } from "src/components/layout"
import { FilterDishes_filterDishes_method, FilterDishes_filterDishes_recipes } from "../../Dishes/types/FilterDishes"
import { ItemString, ItemInt } from "../../Menus/menuDialog"
import { useGetRecipeQuery } from "../api"
import { FilterRecipes_filterRecipes_ingredients } from "../types/FilterRecipes"

export const RecipeDialog = ({
    setId,
    id,
    open,
    onClose,
    setOpenUpdateDialog,
}: {
    id: string;
    setId: () => void;
    setOpenUpdateDialog: () => void;
    open: boolean;
    onClose: () => void
}) => {

    const { data, loading, error } = useGetRecipeQuery(id)

    if (loading) return <LoadingScreen/>
    if (error) return <LoadingScreen/>

    let recipe = data.recipe

    return (
        <Dialog open={open} onClose={onClose}>
            {recipe && (
             <>
                <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">Recept: {recipe.name}</DialogTitle>
                <DialogActions>
                <Button variant="contained" onClick={onClose}>
                  Terug
                </Button>
                <Button variant="contained" onClick={() => {
                        setId();
                        setOpenUpdateDialog()
                }}>
                  Recept aanpassen
                </Button>
              </DialogActions>
              <DialogContent>
                  <Card>
                      <Grid container spacing={2} xs={12}>
                       <ItemString 
                       title="Type"
                       item={recipe.type}
                       />
                       <ItemInt 
                       title="rating"
                       item={recipe.rating}
                       />
                      <ItemIngredients
                      title="Recepten"
                      item={recipe.ingredients}
                      />
                      <ItemMethods
                      title="Methode"
                      item={recipe.method}
                      />
                      </Grid>
                  </Card>
              </DialogContent>
            </>
            )}
        </Dialog>
    )
}

export const ItemMethods = ({title, item}: {title: string, item: FilterDishes_filterDishes_method []| null;}) => {
    return (
        <>
        <Grid key={0} item xs={12}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
        </Grid> 
        <Grid key={1} item xs={12}>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell>Stap</TableCell>
                            <TableCell>Actie</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {item && item.map((stepToMethod) => (
                <>
                        <TableRow>
                            <TableCell align="left">
                            {stepToMethod.step}
                            </TableCell>
                            <TableCell align="left">
                            {stepToMethod.method}
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

export const ItemIngredients = ({title, item}: {title: string, item: FilterRecipes_filterRecipes_ingredients []| null;}) => {
    return (
        <>
        <Grid key={0} item xs={12}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
        </Grid> 
        <Grid key={1} item xs={12}>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ingredient</TableCell>
                            <TableCell>Hoeveelheid</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {item && item.map((quantityToIngr) => (
                <>
                        <TableRow>
                            <TableCell align="left">
                            {quantityToIngr.ingredient.name}
                            </TableCell>
                            <TableCell align="left">
                            {quantityToIngr.quantity.quantity} {quantityToIngr.quantity.unit}
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

export const ItemRecipes = ({title, item}: {title: string, item: FilterDishes_filterDishes_recipes []| null;}) => {
    return (
        <>
        <Grid key={0} item xs={12}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
        </Grid> 
        <Grid key={1} item xs={12}>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell>recept</TableCell>
                            <TableCell>Hoeveelheid</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {item && item.map((quantityToRecipe) => (
                <>
                        <TableRow>
                            <TableCell align="left">
                            {quantityToRecipe.recipe.name}
                            </TableCell>
                            <TableCell align="left">
                            {quantityToRecipe.quantity.quantity} {quantityToRecipe.quantity.unit}
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

