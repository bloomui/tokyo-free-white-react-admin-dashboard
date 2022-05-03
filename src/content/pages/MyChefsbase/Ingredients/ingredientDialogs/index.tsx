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
  Button,
  DialogActions,
  Select,
  Tab,
  Tabs,
  TextField,
  CircularProgress,
  Table,
} from "@material-ui/core";
import { MenuItem } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { FormikSelect } from "src/components/form/FormikSelect";
import { CenterInScreen, LoadingScreen } from "src/components/layout";
import { H3, H3Left, H5, H5Left } from "src/content/pages/Components/TextTypes";
import { Material } from "src/globalTypes";
import {
  DefaultNutritionOptions,
  NutritionOptionDropDown,
} from "../../Components/NutrutitionOptions";
import { ItemString, ItemInt } from "../../Menus/menuDialog";
import { stringForMaterial } from "../AddIngredient";
import { useGetIngredientQuery, useGetNutritionForIngredients, useGetProductsForIngredients } from "../api";
import { displayMaterial, displayStatus } from "../components/IngredientTable";
import { FilterIngredients_filterIngredients } from "../types/FilterIngredients";
import {
  ingredient,
  ingredient_ingredient,
  ingredient_ingredient_nutrition_nutrition,
  ingredient_ingredient_products,
} from "../types/ingredient";
import { UpdateIngredientDialog } from "./UpdateIngredientDialog";

export const emptyIngredient: ingredient_ingredient = {
  __typename: "Ingredient",
  category: "a",
  id: "a",
  name: "a",
  rating: 3,
  nutrition: null,
  products: [],
  material: Material.SOLID,
  status: null
};

export const DialogForIngredient = ({
  ingredient,
  open,
  onClose,
}: {
  ingredient: FilterIngredients_filterIngredients;
  open: boolean;
  onClose: () => void;
}) => {

  const [value, setValue] = useState(0);

  let content;

  switch (value) {
    case 0:
      content = (
        <NutritionTab id={ingredient.id} />
      );
      break;
    default:
      content = (
        <ProductTab id={ingredient.id}/>
      );
      break;
  }

  return (
    <>
      <CenterInScreen>
        <Dialog open={open} onClose={onClose}>
          {ingredient && (
            <>
              <Grid container xs={12}>
                <Grid xs={3}>
                  <H5Left title="Ingredient" />
                </Grid>
                <Grid xs={6}>
                  <H5 title={ingredient.name} />
                </Grid>
                <Grid xs={3}></Grid>
                <Grid xs={3}>
                  <H5Left title="Categorie" />
                </Grid>
                <Grid xs={6}>
                  <H5 title={ingredient.category} />
                </Grid>
                <Grid xs={3}></Grid>
                <Grid xs={3}>
                  <H5Left title="Status" />
                </Grid>
                <Grid xs={6}>
                  <H5 title={String(displayStatus(ingredient.status))} />
                </Grid>
                <Grid xs={3}></Grid>
                <Grid xs={3}>
                  <H5Left title="Meeteenheid" />
                </Grid>
                <Grid xs={6}>
                  <H5 title={String(displayMaterial(ingredient.material))} />
                </Grid>
                <Grid xs={3}></Grid>
                <Grid xs={3}>
                  <H5Left title="Beoordeling" />
                </Grid>
                <Grid xs={6}>
                  <H5 title={String(ingredient.rating)} />
                </Grid>
                <Grid xs={3}></Grid>
              </Grid>
              <DialogTitle>
                <Tabs
                  centered
                  value={value}
                  onChange={(e, newValue) => setValue(newValue as number)}
                >
                  <Tab label={`Voedingswaarden`} />
                  <Tab label={`Producten`} />
                </Tabs>
              </DialogTitle>
              {content}
              <Button onClick={() => onClose()}>Sluiten</Button>
            </>
          )}
        </Dialog>
      </CenterInScreen>
    </>
  );
};

const NutritionTab = ({
  id,
}: {
  id: string;
}) => {

  const [nutritionsToDisplay, setNutritionsToDisplay] = useState<string[]>(
    DefaultNutritionOptions
  );

  const { data, loading, error } = useGetNutritionForIngredients({
    id: id,
  });


  if (loading) return <CircularProgress />;
  if (error) return <CircularProgress />;

  return (
    <DialogContent>
      <Card>
        <Grid container xs={12}>
          <Grid xs={12}>
            <NutritionOptionDropDown
              setFieldValue={(selected) => setNutritionsToDisplay(selected)}
            />
          </Grid>
          <Grid container xs={12}>
            <Grid xs={6}>
              <ItemNutrition
                factor={1}
                nutritionsToDisplay={nutritionsToDisplay}
                title="Voedingswaarde"
                item={data.ingredient.nutrition.nutrition}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </DialogContent>
  );
};

const ProductTab = ({
  id,
}: {
  id: string;
}) => {

  const { data, loading, error } = useGetProductsForIngredients({
    id: id,
  });

  if (loading)
    return (
      <CenterInScreen>
        <Dialog maxWidth="md" open={true}>
          <CircularProgress />
        </Dialog>
      </CenterInScreen>
    );
  if (error) return <CircularProgress />;

  return (
    <DialogContent>
      <Card>
        <Grid container xs={12}>
          <Grid xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <H5 title="Ingredienten" />
                  </TableRow>
                </TableHead>
                {data &&
                  data.ingredient.products &&
                  data.ingredient.products.map((product) => {
                    return (
                      <TableRow>
                        <TableCell>{product.name}</TableCell>
                      </TableRow>
                    );
                  })}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
    </DialogContent>
  );
};

export const IngredientDialog = ({
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

  const { data, loading, error } = useGetIngredientQuery({
    id: id,
    onCompleted: () => {},
  });

  const [openUpdateDialog, setUpdateDialog] = useState(false);

  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  let ingredient = data.ingredient;

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        {ingredient && (
          <>
            <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">
              Ingredient: {ingredient.name}
            </DialogTitle>
            <DialogActions>
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
                Ingredient aanpassen
              </Button>
            </DialogActions>
            <DialogContent>
              <Card>
                <Grid container spacing={2} xs={12}>
                  <ItemString title="categorie" item={ingredient.category} />
                  <ItemString
                    title="Meeteenheid"
                    item={stringForMaterial(ingredient.material)}
                  />
                  <ItemInt title="rating" item={ingredient.rating} />
                  <ItemProducts title="Producten" item={ingredient.products} />
                  <Grid item xs={6}>
                    <H5
                      title={`Per ${ingredient.nutrition.quantity.quantity} ${ingredient.nutrition.quantity.unit}:`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                  <H5
                      title={ingredient.status}
                    />
                  </Grid>
                  <NutritionOptionDropDown
                    setFieldValue={(selected) =>
                      setNutritionsToDisplay(selected)
                    }
                  />
                  <Grid item xs={12}>
                    <ItemNutrition
                      factor={1}
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
        id={ingredient.id}
        open={openUpdateDialog}
        onClose={() => setUpdateDialog(false)}
      />
    </>
  );
};
export const ItemProducts = ({
  title,
  item,
}: {
  title: string;
  item: ingredient_ingredient_products[] | null;
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
              <TableCell align="center">Product Opties</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item &&
              item.map((product) => (
                <>
                  <TableRow>
                    <TableCell align="center">{product.name}</TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </TableContainer>
      </Grid>
    </>
  );
};

export const ItemNutrition = ({
  factor,
  nutritionsToDisplay,
  title,
  item,
}: {
  factor: number;
  nutritionsToDisplay: string[];
  title: string;
  item: ingredient_ingredient_nutrition_nutrition;
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
              <TableCell colSpan={2} align="center">
                Voedingswaarden
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {nutritionsToDisplay.includes("Totale kalorieën") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Calorieën:</TableCell>
                    <TableCell>
                      {" "}
                      {roundTo2Decimals(item.kcal * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Eiwitten totaal") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Totale eiwitten: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.protein.total * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Dierlijke eiwitten") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Dierlijke eiwitten: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.protein.animal * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Plantaardige eiwitten") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">
                      Plantaardige eiwitten:{" "}
                    </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.protein.plant * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Totale vetten") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Totale vetten: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.fat.total * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Onverzadigde vetten") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Onverzadigde vetten: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.fat.compoundUnsat * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Verzadigde vetten") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Verzadigde vetten: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.fat.satured * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Koolhydraten totaal") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Totale koolhydraten: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.carbs.carbs * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Suikers") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Suikers: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.carbs.sugar * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Vitamine D") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Vitamine D: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.vitamins.dTotal * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Vitamine E") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Vitamine E: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.vitamins.e * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Vitamine C") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Vitamine C: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.vitamins.c * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Vitamine B12") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Vitamine B12: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.vitamins.b12 * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Zetmeel") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Zetmeel: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.starch * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Vezels") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Vezels: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.fibres * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Zout") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Zout: </TableCell>
                    <TableCell>{roundTo2Decimals(item.ash * factor)}</TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Magnesium") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Magnesium: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.magnesium * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Cholesterol") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Cholesterol: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.cholesterol * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Kalk") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Kalk: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.calcium * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Zink") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Zink: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.sink * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Natrium") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Natrium: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.natrium * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Fosfor") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Fosfor: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.fosfor * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Water") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Water: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.water * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Nitrogen") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Nitrogen: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.nitrogen * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Ijzer") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Ijzer: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.iron.total * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Kalium") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Kalium: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.kalium * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Koper") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Koper: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.cupper * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {nutritionsToDisplay.includes("Jodium") == true ? (
                <>
                  <TableRow>
                    <TableCell align="center">Jodium: </TableCell>
                    <TableCell>
                      {roundTo2Decimals(item.jodium * factor)}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              <TableRow></TableRow>
            </>
          </TableBody>
        </TableContainer>
      </Grid>
    </>
  );
};

export const roundTo2Decimals = (a: number) =>
  (Math.round(a * 100) / 100).toFixed(2);
