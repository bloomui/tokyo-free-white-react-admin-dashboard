import { Dialog, DialogTitle, DialogContent, Card, CardActionArea, Grid, Typography, TableContainer, TableBody, TableCell, TableHead, TableRow, List, ListItem, Button, DialogActions } from "@material-ui/core"
import React from "react"
import { useState } from "react"
import { ItemInt, ItemString } from "../../Menus/menuDialog"
import { Dishes_filterDishes, Dishes_filterDishes_method, Dishes_filterDishes_recipes } from "../types/Dishes"

export const DishDialog = ({
    dish,
    open,
    onClose,
    setOpenUpdateDialog,
}: {
    setOpenUpdateDialog: () => void;
    dish: Dishes_filterDishes;
    open: boolean;
    onClose: () => void
}) => {

    return (
        <Dialog open={open} onClose={onClose}>
            {dish && (
             <>
                <DialogTitle id="form-dialog-title">Gerecht: {dish.name}</DialogTitle>
                <DialogActions>
                <Button variant="contained" onClick={onClose}>
                  Terug
                </Button>
                <Button variant="contained" onClick={() => setOpenUpdateDialog()}>
                  Menu aanpassen
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

export const ItemMethods = ({title, item}: {title: string, item: Dishes_filterDishes_method []| null;}) => {
    return (
        <>
        <Grid key={0} item xs={12}>
        <Typography>{title}</Typography>
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

export const ItemRecipes = ({title, item}: {title: string, item: Dishes_filterDishes_recipes []| null;}) => {
    return (
        <>
        <Grid key={0} item xs={12}>
        <Typography>{title}</Typography>
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

