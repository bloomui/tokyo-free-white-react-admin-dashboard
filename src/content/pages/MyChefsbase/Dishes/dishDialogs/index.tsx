import { Dialog, DialogTitle, DialogContent, Card, CardActionArea, Grid, Typography, TableContainer, TableBody, TableCell, TableHead, TableRow, List, ListItem, Button, DialogActions } from "@material-ui/core"
import React from "react"
import { LoadingScreen } from "src/components/layout"
import { ItemInt, ItemString } from "../../Menus/menuDialog"
import { useGetDishQuery } from "../api"
import { FilterDishes_filterDishes, FilterDishes_filterDishes_method, FilterDishes_filterDishes_recipes } from "../types/FilterDishes"

export const DishDialog = ({
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

    const { data, loading, error } = useGetDishQuery(id)

    if (loading) return <LoadingScreen/>
    if (error) return <LoadingScreen/>

    let dish = data.dish

    return (
        <Dialog open={open} onClose={onClose}>
            {dish && (
             <>
                <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">Gerecht: {dish.name}</DialogTitle>
                <DialogActions>
                <Button variant="contained" onClick={onClose}>
                  Terug
                </Button>
                <Button variant="contained" onClick={() => {
                        setId();
                        setOpenUpdateDialog();
                        // onClose()
                }}>
                  Gerecht aanpassen
                </Button>
              </DialogActions>
              <DialogContent>
                  <Card>
                      <Grid container spacing={2} xs={12}>
                       <ItemString 
                       title="Thema"
                       item={dish.theme}
                       />
                       <ItemString 
                       title="opmerking"
                       item={dish.comment}
                       />
                       <ItemInt 
                       title="rating"
                       item={dish.rating}
                       />
                      <ItemRecipes
                      title="Recepten"
                      item={dish.recipes}
                      />
                      <ItemMethods
                      title="Methode"
                      item={dish.method}
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

