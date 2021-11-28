import { Dialog, DialogTitle, DialogContent, Card, CardActionArea, Grid, Typography, TableContainer, TableBody, TableCell, TableHead, TableRow, List, ListItem, Button, DialogActions } from "@material-ui/core"
import React, { useState } from "react"
import { LoadingScreen } from "src/components/layout"
import { H5 } from "src/content/pages/Components/TextTypes"
import { DefaultNutritionOptions, NutritionOptionDropDown } from "../../Components/NutrutitionOptions"
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
    const [nutritionsToDisplay, setNutritionsToDisplay] = useState<string[]>(DefaultNutritionOptions)

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
                      <Grid item xs={12}>
                          <H5 title={`Per ${ingredient.nutrition.quantity.quantity} ${ingredient.nutrition.quantity.unit}:`}/>
                        </Grid>
                      <NutritionOptionDropDown 
                      setFieldValue={(selected) => setNutritionsToDisplay(selected)}
                      />
                      <Grid item xs={12}>
                      <ItemNutrition
                      nutritionsToDisplay={nutritionsToDisplay}
                      title="Voedingswaarde"
                      item={ingredient.nutrition.nutrition}
                      />
                      </Grid>
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

export const ItemNutrition = ({nutritionsToDisplay, title, item}: {nutritionsToDisplay: string[], title: string, item: FilterIngredients_filterIngredients_nutrition_nutrition;}) => {
    return (
        <>
        <Grid key={0} item xs={12}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
        </Grid> 
        <Grid key={1} item xs={12}>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Gram per voedingswaarden</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                <>
                {(nutritionsToDisplay.includes("Totale kalorieën") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Calorieën:</TableCell>
                            <TableCell> {item.kcal}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)}
                {(nutritionsToDisplay.includes("Eiwitten totaal") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Totale eiwitten: </TableCell>
                            <TableCell>{item.protein.total}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Dierlijke eiwitten") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Dierlijke eiwitten: </TableCell>
                            <TableCell>{item.protein.animal}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Plantaardige eiwitten") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Plantaardige eiwitten: </TableCell>
                            <TableCell>{item.protein.plant}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Totale vetten") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Totale vetten: </TableCell>
                            <TableCell>{item.fat.total}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Onverzadigde vetten") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Onverzadigde vetten: </TableCell>
                            <TableCell>{item.fat.compoundUnsat}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)}    
                {(nutritionsToDisplay.includes("Verzadigde vetten") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Verzadigde vetten: </TableCell>
                            <TableCell>{item.fat.satured}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)}  
                {(nutritionsToDisplay.includes("Koolhydraten totaal",) == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Totale koolhydraten: </TableCell>
                            <TableCell>{item.carbs.carbs}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Suikers") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Suikers: </TableCell>
                            <TableCell>{item.carbs.sugar}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Vitamine D") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Vitamine D: </TableCell>
                            <TableCell>{item.vitamins.dTotal}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Vitamine E") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Vitamine E: </TableCell>
                            <TableCell>{item.vitamins.e}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Vitamine C") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Vitamine C: </TableCell>
                            <TableCell>{item.vitamins.c}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Vitamine B12") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Vitamine B12: </TableCell>
                            <TableCell>{item.vitamins.b12}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Zetmeel") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Zetmeel: </TableCell>
                            <TableCell>{item.starch}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Vezels") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Vezels: </TableCell>
                            <TableCell>{item.fibres}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Zout") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Zout: </TableCell>
                            <TableCell>{item.ash}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Magnesium") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Magnesium: </TableCell>
                            <TableCell>{item.magnesium}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Cholesterol") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Cholesterol: </TableCell>
                            <TableCell>{item.cholesterol}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Kalk") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Kalk: </TableCell>
                            <TableCell>{item.calcium}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Zink") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Zink: </TableCell>
                            <TableCell>{item.sink}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Natrium") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Natrium: </TableCell>
                            <TableCell>{item.natrium}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Fosfor") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Fosfor: </TableCell>
                            <TableCell>{item.fosfor}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
{(nutritionsToDisplay.includes("Water") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Water: </TableCell>
                            <TableCell>{item.water}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Nitrogen") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Nitrogen: </TableCell>
                            <TableCell>{item.nitrogen}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Ijzer") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Ijzer: </TableCell>
                            <TableCell>{item.iron.total}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Kalium") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Kalium: </TableCell>
                            <TableCell>{item.kalium}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Koper") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Koper: </TableCell>
                            <TableCell>{item.cupper}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                {(nutritionsToDisplay.includes("Jodium") == true)? (
                    <>
                            <TableRow>
                            <TableCell align="center">
                            Jodium: </TableCell>
                            <TableCell>{item.jodium}
                            </TableCell>
                            </TableRow>
                    </>
                ): (<></>)} 
                            <TableRow>
                        </TableRow>
                        </>
                    </TableBody>
                </TableContainer>
            </Grid>
            </>
    )
}