import { ApolloQueryResult } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Grid,
  DialogContent,
  LinearProgress,
  Tab,
  TableContainer,
  Dialog,
  TableHead,
  TableRow,
  TableCell,
  Table,
  DialogTitle,
  CircularProgress,
  Card,
  Tabs,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { Formik } from "formik";
import React, { ReactElement, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import Footer from "src/components/Footer";
import { FormikSelect } from "src/components/form/FormikSelect";
import { CenterInScreen, LoadingScreen } from "src/components/layout";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { IngredientFilterInput, RecipeFilterInput } from "src/globalTypes";
import { clearAuth } from "src/utilities/auth";
import { H5, H5Left, H3, H3Left } from "../../Components/TextTypes";
import {
  DefaultNutritionOptions,
  NutritionOptionDropDown,
} from "../Components/NutrutitionOptions";
import { useSearchRecipeQuery } from "../Dishes/AddDish/api";
import { useFilterIngredientsQuery } from "../Ingredients/api";
import { TopPartIngredientPage } from "../Ingredients/components/IngredientPageTopPart";
import { IngredientTable } from "../Ingredients/components/IngredientTable";
import { initialIngredientValues } from "../Ingredients/filterIngredients";
import { ItemNutrition } from "../Ingredients/ingredientDialogs";
import {
  useFilterRecipesQuery,
  useGetIngredientsForRecipe,
  useGetMethodForRecipeQuery,
  useGetNutritionForRecipe,
  useGetRecipeQuery,
} from "../Recipes/api";
import { RecipeTable } from "../Recipes/components/RecipeTable";
import { TopPartRecipePage } from "../Recipes/components/TopPartRecipePage";
import { initialRecipeValues } from "../Recipes/filterrecipes";
import { minimizeUnit } from "../Recipes/recipeDialogs";
import { FilterRecipes_filterRecipes } from "../Recipes/types/FilterRecipes";
import {
  ingredientsForRecipe,
  ingredientsForRecipeVariables,
  ingredientsForRecipe_ingredientsForRecipe_quantity,
  ingredientsForRecipe_ingredientsForRecipe,
} from "../Recipes/types/ingredientsForRecipe";
import { recipe_recipe_method } from "../Recipes/types/recipe";

export type Quantity = {
  quantity: number;
  unit: string;
};
export const getFactor = ({
  first,
  other,
}: {
  first: Quantity;
  other: Quantity;
}): number => {
  console.log(first);
  console.log(other);
  var result;
  switch (true) {
    case first.unit == other.unit:
      result = other.quantity / first.quantity;
      break;
    case first.unit == "kg" && other.unit == "milligram":
      result = other.quantity / (first.quantity * 1000000);
      break;
    case (first.unit == "kg" && other.unit == "gram") ||
      (first.unit == "gram" && other.unit == "milligram") ||
      (first.unit == "liter" && other.unit == "milliliter"):
      result = other.quantity / (first.quantity * 1000);
      break;
    case (first.unit == "gram" && other.unit == "kg") ||
      (first.unit == "milligram" && other.unit == "gram") ||
      (first.unit == "milliliter" && other.unit == "liter"):
      result = other.quantity / (first.quantity / 1000);
      break;
    default:
      result = other.quantity / (first.quantity / 1000000);
  }

  return result;
};

export const RecipesAndIngredients = ({
  content,
}: {
  content: ReactElement<any, any>;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>My Chefsbase</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="MyChefsbase haalt het beste uit iedere chef!"
          name=""
          avatar="/static/images/avatars/SB_logo.png"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid container xs={12}>
            <Grid xs={3}></Grid>
            <Grid xs={3}>
              <Button onClick={() => navigate("/mychefsbase/recipes")}>
                <Tab label={`Recepten`} />
              </Button>
            </Grid>
            <Grid xs={3}>
              <Button onClick={() => navigate("/mychefsbase/ingredients")}>
                <Tab label={`Ingrediënten`} />
              </Button>
            </Grid>
            <Grid xs={3}></Grid>
            {content}
          </Grid>
          <Grid item lg={8} xs={12}>
            <Button
              onClick={() => {
                clearAuth();
                navigate(`/`);
              }}
            >
              Log Out
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export const RecipeContent = () => {
  const [page, setPage] = useState<number>(0);

  const [input, setInput] = useState<RecipeFilterInput>(initialRecipeValues);

  const { loading, data } = useFilterRecipesQuery({
    input: input,
    page: page,
  });

  let content;
  if (loading && !data) content = <LoadingScreen />;
  else if (data) {
    content = (
      <>
        <RecipeTable data={data} page={page} setPage={setPage} />
      </>
    );
  }

  return (
    <>
      <Grid container xs={12}>
        <Grid xs={12}>
          <TopPartRecipePage setInput={(values) => setInput(values)} />
          <Box height={3}>{loading && <LinearProgress />}</Box>
          <Grid xs={12}>{content}</Grid>{" "}
        </Grid>
      </Grid>
    </>
  );
};

export const IngredientContent = () => {
  const [input, setInput] = useState<IngredientFilterInput>(
    initialIngredientValues
  );
  const [page, setPage] = useState<number>(0);

  const { loading, data } = useFilterIngredientsQuery({
    page: page,
    input: input,
  });

  let content;
  if (loading && !data) content = <LoadingScreen />;
  else if (data) {
    content = (
      <>
        <IngredientTable data={data} page={page} setPage={setPage} />
      </>
    );
  }

  return (
    <>
      <Grid container xs={12}>
        <Grid xs={12}>
          <TopPartIngredientPage setInput={(values) => setInput(values)} />
          <Box height={3}>{loading && <LinearProgress />}</Box>
          <Grid xs={12}>{content}</Grid>{" "}
        </Grid>
      </Grid>
    </>
  );
};

export const MyDialog = () => {
  return <Dialog maxWidth="md" open={true}></Dialog>;
};
export const DialogHere = ({
  recipe,
  open,
  onClose,
}: {
  recipe: FilterRecipes_filterRecipes;
  open: boolean;
  onClose: () => void;
}) => {
  const [unit, setUnitHere] = useState<string>(recipe.quantity.unit);
  const [quantity, setQuantity] = useState<number>(recipe.quantity.quantity);
  const [factor, setFactor] = useState<number>(1);

  const initialValues = {
    quantity: recipe.quantity.quantity,
    unit: recipe.quantity.unit,
  };
  const [value, setValue] = useState(0);

  const { data, loading, error, refetch } = useGetIngredientsForRecipe({
    onCompleted: (values) => {},
    id: recipe.id,
    quantity: recipe.quantity.quantity,
    unit: recipe.quantity.unit,
  });
  if (loading) return <CircularProgress />;
  let content;

  switch (value) {
    case 0:
      content = <IngredientsTab ingredients={data} factor={factor} />;
      break;

    case 1:
      content = <MethodsTab id={recipe.id} />;
      break;
    default:
      content = (
        <NutritionTab
          factor={factor}
          id={recipe.id}
          unit={recipe.quantity.unit}
          quantity={recipe.quantity.quantity}
        />
      );
      break;
  }

  const Row = ({ title, word }: { title: string; word: string }) => {
    return (
      <TableRow>
        <TableCell>
          <H5Left title={title} />
        </TableCell>
        <TableCell colSpan={2}>
          <H5 title={word} />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <CenterInScreen>
        <Dialog open={open} onClose={onClose}>
          {recipe && (
            <>
              <Table>
                <Row title="Recept" word={recipe.name} />
                <Row title="Type" word={recipe.type} />
                <Row title="Beoordeling" word={String(recipe.rating)} />
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    setQuantity(values.quantity);
                    setUnitHere(values.unit);
                    setFactor(
                      getFactor({
                        first: {
                          quantity: recipe.quantity.quantity,
                          unit: recipe.quantity.unit,
                        },
                        other: { quantity: values.quantity, unit: values.unit },
                      })
                    );
                  }}
                >
                  {({ setFieldValue, submitForm }) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell colSpan={2}>
                            <H5 title="Toon hoeveelheid per:" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <TextField
                              placeholder={String(quantity)}
                              onChange={(e) =>
                                setFieldValue(
                                  "quantity",
                                  Number(e.target.value)
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <FormikSelect name={"unit"}>
                              {getUnitsForUnit(unit).map((u) => (
                                <MenuItem key={u} value={u}>
                                  {u}
                                </MenuItem>
                              ))}
                            </FormikSelect>
                          </TableCell>
                        </TableRow>
                        <TableCell colSpan={2}>
                          <Button fullWidth onClick={() => submitForm()}>
                            Pas toe
                          </Button>
                        </TableCell>
                      </>
                    );
                  }}
                </Formik>
              </Table>
              <DialogTitle>
                <Tabs
                  centered
                  value={value}
                  onChange={(e, newValue) => setValue(newValue as number)}
                >
                  <Tab label={`Ingredienten`} />
                  <Tab label={`Methode`} />
                  <Tab label={`Voedingswaaarden`} />
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

export const IngredientsTab = ({
  ingredients,
  factor,
}: {
  ingredients: ingredientsForRecipe;
  factor: number;
}) => {
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
                {ingredients.ingredientsForRecipe.map((ingredient) => {
                  const quantity = DisplayQuantity({
                    quantity: ingredient.quantity.quantity * factor,
                    unit: ingredient.quantity.unit,
                  });
                  return (
                    <TableRow>
                      <TableCell>{ingredient.ingredient.name}</TableCell>
                      <TableCell>{quantity.quantity}</TableCell>
                      <TableCell>{quantity.unit}</TableCell>
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

export const MethodsTab = ({ id }: { id: string }) => {
  const { data, loading, error } = useGetMethodForRecipeQuery({
    id: id,
  });

  if (loading)
    return (
      <CenterInScreen>
        <Dialog open={true}>
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
                    <H5 title="Methode" />
                  </TableRow>
                </TableHead>
                {data &&
                  data.methodForRecipe.map((stepToMethod) => (
                    <TableRow>
                      <TableCell>{stepToMethod.step}</TableCell>
                      <TableCell>{stepToMethod.method}</TableCell>
                    </TableRow>
                  ))}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
    </DialogContent>
  );
};

export const NutritionTab = ({
  factor,
  id,
  quantity,
  unit,
}: {
  factor: number;
  id: string;
  quantity: number;
  unit: string;
}) => {
  const [nutritionsToDisplay, setNutritionsToDisplay] = useState<string[]>(
    DefaultNutritionOptions
  );
  const { data, loading, error, refetch } = useGetNutritionForRecipe({
    id: id,
    quantity: quantity,
    unit: unit,
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
                factor={factor}
                nutritionsToDisplay={nutritionsToDisplay}
                title="Voedingswaarde"
                item={data.nutritionForRecipe}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </DialogContent>
  );
};

export const getUnitsForUnit = (u: string): string[] => {
  var result;
  switch (u) {
    case "milligram":
      result = ["milligram", "gram", "kg"];
      break;
    case "gram":
      result = ["milligram", "gram", "kg"];
      break;
    case "kg":
      result = ["milligram", "gram", "kg"];
      break;
    case "milliliter":
      result = ["milliliter", "liter"];
      break;
    case "liter":
      result = ["milliliter", "liter"];
      break;
    default:
      result = ["stuk(s)", "person(en)"];
  }

  return result;
};

const DisplayQuantity = (quantity: Quantity): Quantity => {
  var result;
  switch (true) {
    case quantity.unit == "kg" && quantity.quantity < 0.000001:
      result = { quantity: quantity.quantity * 1000000, unit: "milligram" };
      break;
    case quantity.unit == "kg" &&
      quantity.quantity < 1 &&
      quantity.quantity > 0.001:
      result = { quantity: quantity.quantity * 1000, unit: "gram" };
      break;
    case quantity.unit == "gram" && quantity.quantity > 1000:
      result = { quantity: quantity.quantity / 1000, unit: "kg" };
      break;
    case quantity.unit == "gram" && quantity.quantity < 1:
      result = { quantity: quantity.quantity * 1000, unit: "milligram" };
      break;
    case quantity.unit == "milligram" && quantity.quantity > 1000000:
      result = { quantity: quantity.quantity / 1000000, unit: "kg" };
      break;
    case quantity.unit == "milligram" &&
      quantity.quantity > 1000 &&
      quantity.quantity < 1000000:
      result = { quantity: quantity.quantity / 1000, unit: "gram" };
      break;
    case quantity.unit == "liter" && quantity.quantity < 1000:
      result = { quantity: quantity.quantity * 1000, unit: "milliliter" };
      break;
    case quantity.unit == "milliliter" && quantity.quantity > 1000:
      result = { quantity: quantity.quantity / 1000, unit: "liter" };
      break;
    default:
      result = { quantity: quantity.quantity, unit: quantity.unit };
  }

  return result;
};
