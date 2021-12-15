import { Dialog, DialogTitle, DialogContent, Card, CardActionArea, Grid, Typography, TableContainer, TableBody, TableCell, TableHead, TableRow, List, ListItem, Button, DialogActions, TextField, MenuItem, Select, CircularProgress } from "@material-ui/core"
import React, { useState } from "react"
import { H5 } from "src/content/pages/Components/TextTypes"
import { DefaultNutritionOptions, NutritionOptionDropDown } from "../../Components/NutrutitionOptions"
import { recipes_recipes } from "../../Dishes/AddDish/types/recipes"
import { dish_dish_method } from "../../Dishes/types/dish"
import { ItemNutrition } from "../../Ingredients/ingredientDialogs"
import { ItemString, ItemInt } from "../../Menus/menuDialog"
import { useGetIngredientsForRecipe, useGetNutritionForRecipe, useGetRecipeQuery } from "../api"
import { ingredientsForRecipe_ingredientsForRecipe } from "../types/ingredientsForRecipe"
import { NutritionForRecipe, NutritionForRecipe_nutritionForRecipe } from "../types/NutritionForRecipe"
import { UpdateRecipeDialog } from "./UpdateRecipeDialog"

export const zeroNutrition: NutritionForRecipe_nutritionForRecipe  = {
    __typename: "Nutrition",
  kcal: 0,
  protein: {
    __typename: "Proteins",
    plant: 0,
    animal: 0,
    total: 0,
  },
  carbs: {
    __typename: "Carbs",
    carbs: 0,
    sugar: 0,
},
  fat: {
    __typename: "Fats",
    satured: 0,
    singleUnsat: 0,
    compoundUnsat: 0,
    total: 0,
},
  starch: 0,
  polyols: 0,
  fibres: 0,
  nitrogen: 0,
  polysachhariden: 0,
  alcohol:0,
  water: 0,
  organicAcids: 0,
  vitamins: {
    __typename: "Vitamins",
    e: 0,
    c: 0,
    kTotal: 0,
    b12: 0,
    dTotal: 0,
  },
  foliumAcid: 0,
  pholate: 0,
  pholatEquivalents: 0,
  nicotinAcid: 0,
  lycopeans: 0,
  betaCrypto: 0,
  zeacanthine:0,
  lutein: 0,
  ash: 0,
  jodium: 0,
  sink: 0,
  selenium:0,
  cupper: 0,
  iron: {
    __typename: "Iron",
    total: 0,
  },
  magnesium: 0,
  fosfor: 0,
  calcium: 0,
  kalium: 0,
  natrium: 0,
  cholesterol: 0,
  famstxr: 0,
}

export const RecipeDialog = ({
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

    const [nutritionsToDisplay, setNutritionsToDisplay] = useState<string[]>(DefaultNutritionOptions)
    const [unit, setUnit] = useState('gram')
    const [quantity, setQuantity] = useState(100)
    const { data, loading, error } = useGetRecipeQuery(id)

    const [openUpdateDialog, setUpdateDialog] = useState(false)

    const { data: data1, loading: loading1, error: error1, refetch: refetch1 } = useGetNutritionForRecipe({
        id: id,
        quantity: quantity,
        unit: unit
    })
    const { data: data2, loading: loading2, error: error2, refetch: refetch2 } = useGetIngredientsForRecipe({
        id: id,
        quantity: quantity,
        unit: unit
    })

    if (loading) return <CircularProgress/>
    if (error) return <CircularProgress/>
    if (loading1) return (
    <Dialog open={open} onClose={onClose}><CircularProgress /></Dialog>
    )
    if (error1) return (
        <Dialog open={open} onClose={onClose}><CircularProgress /></Dialog>
        )
    if (loading2) return (
        <Dialog open={open} onClose={onClose}><CircularProgress /></Dialog>
        )
    if (error2) return (
        <Dialog open={open} onClose={onClose}><CircularProgress /></Dialog>
        )


    let recipe = data.recipe

    return (
        <>
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
                        setUpdateDialog(true);
                        onClose()
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
                           <Grid xs={12}>
                           <H5 title="Toon voedingswaarden en ingredienten per:"/>
                           </Grid>
                           <Grid xs={2}></Grid>
                          <Grid xs={4}>
                              <TextField 
                              onKeyPress= {(e) => {
                                if (e.key === 'Enter') {
                                refetch1({
                                    id: id,
                                    quantity: quantity,
                                    unit: unit});
                                refetch2({
                                    id: id,
                                    quantity: quantity,
                                    unit: unit});
                              }
                              }}  
                              defaultValue={quantity}
                              onChange={(e) => setQuantity(Number(e.target.value))}/>
                          </Grid>
                          <Grid xs={2}></Grid>
                          <Grid xs={4}>
                          <TextField
                      select
                      onChange={(e) => setUnit(e.target.value)}
                      variant="filled"
                    >
                      {["gram", "kg", "milliliter", "liter"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                          </Grid>
                          <Grid xs={12}>
                          <NutritionOptionDropDown 
                      setFieldValue={(selected) => setNutritionsToDisplay(selected)}
                      />
                      </Grid>
                       <ItemNutrition
                       nutritionsToDisplay={nutritionsToDisplay}
                       title="Voedingswaarde"
                       item={data1.nutritionForRecipe}
                       />
                      <ItemIngredients
                      title="Recepten"
                      item={[]}
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
        <UpdateRecipeDialog
        id={recipe.id}
        open={openUpdateDialog}
        onClose={() => setUpdateDialog(false)}
        />
        </>
    )
}

export const ItemMethods = ({title, item}: {title: string, item: dish_dish_method []| null;}) => {
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

export const ItemIngredients = ({title, item}: {title: string, item: ingredientsForRecipe_ingredientsForRecipe[]| null;}) => {
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

export const ItemRecipes = ({title, item}: {title: string, item: recipes_recipes[]| null;}) => {
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
                            {/* {quantityToRecipe.recipe.name} */}
                            </TableCell>
                            <TableCell align="left">
                            {/* {quantityToRecipe.quantity.quantity} {quantityToRecipe.quantity.unit} */}
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

