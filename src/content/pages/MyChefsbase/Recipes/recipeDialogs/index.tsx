import {
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardActionArea,
  Grid,
  Typography,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
  Button,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { Formik } from "formik";
import React, { useState } from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import { H5 } from "src/content/pages/Components/TextTypes";
import { NutritionInput } from "src/globalTypes";
import {
  DefaultNutritionOptions,
  NutritionOptionDropDown,
} from "../../Components/NutrutitionOptions";
import { recipes_recipes } from "../../Dishes/AddDish/types/recipes";
import { dish_dish_method } from "../../Dishes/types/dish";
import { ItemNutrition } from "../../Ingredients/ingredientDialogs";
import { ItemString, ItemInt } from "../../Menus/menuDialog";
import {
  useGetIngredientsForRecipe,
  useGetNutritionForRecipe,
  useGetRecipeQuery,
} from "../api";
import { ingredientsForRecipe_ingredientsForRecipe } from "../types/ingredientsForRecipe";
import {
  NutritionForRecipe,
  NutritionForRecipeVariables,
  NutritionForRecipe_nutritionForRecipe,
} from "../types/NutritionForRecipe";
import { UpdateRecipeDialog } from "./UpdateRecipeDialog";

export const zeroNutrition: NutritionForRecipe_nutritionForRecipe = {
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
  alcohol: 0,
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
  zeacanthine: 0,
  lutein: 0,
  ash: 0,
  jodium: 0,
  sink: 0,
  selenium: 0,
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
};

export const zeroNutritionInput: NutritionInput = {
  kcal: 0,
  protplant: 0,
  protanimal: 0,
  prottotal: 0,
  carbscarbs: 0,
  carbssugar: 0,
  fatssatured: 0,
  fatssingleUnsat: 0,
  fatscompoundUnsat: 0,
  fatstotal: 0,
  starch: 0,
  polyols: 0,
  fibres: 0,
  nitrogen: 0,
  polysachhariden: 0,
  alcohol: 0,
  water: 0,
  organicAcids: 0,
  vite: 0,
  vitc: 0,
  vitkTotal: 0,
  vitb12: 0,
  vitdTotal: 0,
  foliumAcid: 0,
  pholate: 0,
  pholatEquivalents: 0,
  nicotinAcid: 0,
  lycopeans: 0,
  betaCrypto: 0,
  zeacanthine: 0,
  lutein: 0,
  ash: 0,
  jodium: 0,
  sink: 0,
  selenium: 0,
  cupper: 0,
  irontotal: 0,
  magnesium: 0,
  fosfor: 0,
  calcium: 0,
  kalium: 0,
  natrium: 0,
  cholesterol: 0,
  famstxr: 0,
};

export const getAvailableUnits = (a: string): string[] => {

  var unitsHere;
  switch(a) {
    case "milliliter":
    unitsHere = ["milliliter"];
    break;
    case "liter":
    unitsHere = ["milliliter"];
    break;
    case "gram":
    unitsHere = ["gram"];
    break;
    case "kg":
    unitsHere = ["gram"];
    break;
    default: 
    unitsHere = ["eenheid"];
  }

  return unitsHere
}

export const getAvailableUnitsLarge= (a: string): string[] => {

  var unitsHere;
  switch(a) {
    case "milliliter":
    unitsHere = ["milliliter", "liter"];
    break;
    case "liter":
    unitsHere = ["milliliter", "liter"];
    break;
    case "gram":
    unitsHere = ["gram", "kg"];
    break;
    case "kg":
    unitsHere = ["gram", "kg"];
    break;
    default: 
    unitsHere = ["eenheid"];
  }

return unitsHere
}

export const minimizeUnit = (a: string): string =>  {
  var unitHere;
  switch(a) {
    case "milliliter":
    unitHere = "milliliter";
    break;
    case "liter":
      unitHere = "milliliter";
    break;
    case "gram":
      unitHere = "gram";
    break;
    case "kg":
      unitHere = "gram";
    break;
    default: 
    unitHere = "eenheid";
  }

  return unitHere
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
  onClose: () => void;
}) => {
  const [nutritionsToDisplay, setNutritionsToDisplay] = useState<string[]>(
    DefaultNutritionOptions
  );
  const [unit, setUnit] = useState<string>("");
  const [quantity, setQuantity] = useState(100);
  const { data, loading, error } = useGetRecipeQuery({id: id, onCompleted: (recipe) => setUnit(minimizeUnit(recipe.recipe.quantity.unit))});

  const [openUpdateDialog, setUpdateDialog] = useState(false);

  const {
    data: data1,
    loading: loading1,
    error: error1,
    refetch: refetch1,
  } = useGetNutritionForRecipe({
    id: id,
    quantity: quantity,
    unit: unit,
  });
  const {
    data: data2,
    loading: loading2,
    error: error2,
    refetch: refetch2,
  } = useGetIngredientsForRecipe({
    onCompleted: (values) => {},
    id: id,
    quantity: quantity,
    unit: unit,
  });

  if (loading) return <CircularProgress />;
  if (error) return <CircularProgress />;
  if (loading1)
    return (
      <Dialog open={open} onClose={onClose}>
        <CircularProgress />
      </Dialog>
    );
  if (error1)
    return (
      <Dialog open={open} onClose={onClose}>
        <CircularProgress />
      </Dialog>
    );
  if (loading2)
    return (
      <Dialog open={open} onClose={onClose}>
        <CircularProgress />
      </Dialog>
    );
  if (error2)
    return (
      <Dialog open={open} onClose={onClose}>
        <CircularProgress />
      </Dialog>
    );

  let recipe = data.recipe;

  const quantities = ["50", "100", "500", "1000"]
  const unitsHere = getAvailableUnits(recipe.quantity.unit)
  
  const formState: NutritionForRecipeVariables = {
    id: recipe.id, unit: unitsHere[0],  quantity: quantity
  }
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        {recipe && (
          <>
            <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">
              Recept: {recipe.name}
            </DialogTitle>
            <DialogActions>
              <Button variant="contained" onClick={() => {}}>
                Download PDF van recept
              </Button>
              <Button variant="contained" onClick={onClose}>
                Terug
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setId();
                  setUpdateDialog(true);
                  onClose();
                }}
              >
                Recept aanpassen
              </Button>
            </DialogActions>
            <DialogContent>
              <Card>
                <Grid container xs={12}>
                  <ItemString title="Type recept" item={recipe.type} />
                  <ItemInt title="Beoordeling" item={recipe.rating} />
                  <Grid xs={12}>
                    <H5 title="Toon voedingswaarden en ingredienten per:" />
                  </Grid>
                  <Grid xs={4}>
                    <TextField
                      defaultValue={quantity}
                      select
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      variant="filled"
                    >
                      {quantities.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid xs={4}>
                    <TextField
                      defaultValue={unitsHere[0]}
                      select
                      onChange={(e) => setUnit(e.target.value)}
                      variant="filled"
                    >
                      {unitsHere.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    </Grid>
                    <Grid xs={2}>
                      <Button onClick={() => {
                        refetch1({
                            id: id,
                            quantity: quantity,
                            unit: unit,
                        });
                        refetch2({
                            id: id,
                            quantity: quantity,
                            unit: unit,
                        });
                      }}>Toepassen</Button>
                    </Grid>

                  <Grid xs={12}>
                    <NutritionOptionDropDown
                      setFieldValue={(selected) =>
                        setNutritionsToDisplay(selected)
                      }
                    />
                  </Grid>
                  <Grid container xs={12}>
                    <Grid xs={6}>
                      <ItemNutrition
                        nutritionsToDisplay={nutritionsToDisplay}
                        title="Voedingswaarde"
                        item={data1.nutritionForRecipe}
                      />
                    </Grid>
                    <Grid xs={6}>
                      <ItemIngredients
                        title="Ingredienten"
                        item={data2.ingredientsForRecipe}
                      />
                    </Grid>
                  </Grid>
                  <ItemMethods title="Methode" item={recipe.method} />
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
  );
};

export const ItemMethods = ({
  title,
  item,
}: {
  title: string;
  item: dish_dish_method[] | null;
}) => {
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
            {item &&
              item.map((stepToMethod) => (
                <>
                  <TableRow>
                    <TableCell align="left">{stepToMethod.step}</TableCell>
                    <TableCell align="left">{stepToMethod.method}</TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </TableContainer>
      </Grid>
    </>
  );
};

export const ItemIngredients = ({
  title,
  item,
}: {
  title: string;
  item: ingredientsForRecipe_ingredientsForRecipe[] | null;
}) => {
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
            {item &&
              item.map((quantityToIngr) => (
                <>
                  <TableRow>
                    <TableCell align="left">
                      {quantityToIngr.ingredient.name}
                    </TableCell>
                    <TableCell align="left">
                      {quantityToIngr.quantity.quantity}{" "}
                      {quantityToIngr.quantity.unit}
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </TableContainer>
      </Grid>
    </>
  );
};
