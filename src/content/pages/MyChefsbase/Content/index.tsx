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
  TextField,
  DialogTitle,
  CircularProgress,
  Card,
  Tabs,
} from "@material-ui/core";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import Footer from "src/components/Footer";
import { CenterInScreen, LoadingScreen } from "src/components/layout";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { clearAuth } from "src/utilities/auth";
import { H5 } from "../../Components/TextTypes";
import {
  DefaultNutritionOptions,
  NutritionOptionDropDown,
} from "../Components/NutrutitionOptions";
import { useSearchRecipeQuery } from "../Dishes/AddDish/api";
import { ItemNutrition } from "../Ingredients/ingredientDialogs";
import {
  useGetIngredientsForRecipe,
  useGetNutritionForRecipe,
  useGetRecipeQuery,
} from "../Recipes/api";
import { minimizeUnit } from "../Recipes/recipeDialogs";
import { ingredientsForRecipe_ingredientsForRecipe } from "../Recipes/types/ingredientsForRecipe";
import { recipe_recipe_method } from "../Recipes/types/recipe";

export const RecipesAndIngredients = () => {
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
          <Grid item xs={12}>
            <Tab label={`Recepten`} />
            <Tab label={`Ingrediënten`} />
            <RecipeContent />
            {/* {content} */}
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
  const [name, setName] = useState<string>();

  const [page, setPage] = useState<number>(0);

  const initialValues = {
    name: "",
    offset: 0,
    limit: null,
  };

  const { loading, data, error, refetch } = useSearchRecipeQuery({
    name: name,
    page: page,
  });
  const [open, setOpen] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const [areYouSureDelete, setAreYouSureDelete] = useState<boolean>(false);
  const [id, setId] = React.useState<string>();
  const [unitHere, setUnitHere] = React.useState<string>();

  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;
  let content;
  if (loading && !data) content = <LoadingScreen />;
  else if (data) {
    content = (
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <H5 title="Recept" />
                </TableCell>
              </TableRow>
              {data.recipes.map((recipe) => (
                <TableRow>
                  <TableCell
                    onClick={() => {
                      setId(recipe.id);
                      setUnitHere(recipe.quantity.unit);
                      setOpen(true);
                    }}
                  >
                    <H5 title={recipe.name} />
                  </TableCell>
                </TableRow>
              ))}
            </TableHead>
          </Table>
        </TableContainer>
        {id && (
          <>
            <DialogHere
              unitHere={unitHere}
              setId={() => setId(id)}
              id={id}
              open={open}
              onClose={() => setOpen(false)}
            />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <Grid container xs={12}>
        <Grid xs={3}>
          <H5 title="Zoek op naam" />
        </Grid>
        <Grid xs={6}>
          <TextField
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                console.log(e.key);
                refetch({ name: name });
              }
            }}
            fullWidth
            placeholder="Zoek op naam"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid xs={3}>
          <Button variant="contained" onClick={() => setOpenNew(true)}>
            <H5 title="Nieuw recept toevoegen" />
          </Button>
        </Grid>
      </Grid>
      <Box height={3}>{loading && <LinearProgress />}</Box>
      {content}
    </>
  );
};

const DialogHere = ({
  unitHere,
  setId,
  id,
  open,
  onClose,
}: {
  unitHere: string;
  id: string;
  setId: () => void;
  open: boolean;
  onClose: () => void;
}) => {
  const [value, setValue] = useState(0);
  const [unit, setUnit] = useState<string>(unitHere);
  const [quantity, setQuantity] = useState(100);
  const { data, loading, error } = useGetRecipeQuery({
    id: id,
    onCompleted: (recipe) => setUnit(minimizeUnit(recipe.recipe.quantity.unit)),
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
    unit: unitHere,
  });

  if (loading) return <CircularProgress />;
  if (error) return <CircularProgress />;
  if (loading2) return <CircularProgress />;
  if (error2) return <CircularProgress />;

  let content;

  switch (value) {
    case 0:
      content = <IngredientsTab ingredients={data2.ingredientsForRecipe} />;
      break;

    case 1:
      content = <MethodsTab method={data.recipe.method} />;
      break;
    default:
      content = (
        <NutritionTab id={data.recipe.id} unit={unitHere} quantity={quantity} />
      );
      break;
  }

  return (
    <>
      <CenterInScreen>
        <Dialog open={open} onClose={onClose}>
          {data && data.recipe && (
            <>
              <H5 title={`${data.recipe.name} per ${quantity} ${unit}`} />
              <DialogTitle>
                <Tabs
                  value={value}
                  onChange={(e, newValue) => setValue(newValue as number)}
                >
                  <Tab label={`Ingredienten`} />
                  <Tab label={`Methode`} />
                  <Tab label={`Voedingswaaarden`} />
                </Tabs>
              </DialogTitle>
              {content}
            </>
          )}
        </Dialog>
      </CenterInScreen>
    </>
  );
};

export const IngredientsTab = ({
  ingredients,
}: {
  ingredients: ingredientsForRecipe_ingredientsForRecipe[];
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
                {ingredients.map((ingredient) => (
                  <TableRow>
                    <TableCell>{ingredient.ingredient.name}</TableCell>
                    <TableCell>{ingredient.quantity.quantity}</TableCell>
                    <TableCell>{ingredient.quantity.unit}</TableCell>
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

export const MethodsTab = ({ method }: { method: recipe_recipe_method[] }) => {
  return (
    <DialogContent>
      <Card>
        <Grid container xs={12}>
          <Grid xs={12}>
            <H5 title="Methode" />
            {method.map((stepToMethod) => (
              <Grid container xs={12}>
                <Grid xs={2}>{stepToMethod.step}</Grid>
                <Grid xs={10}>{stepToMethod.method}</Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Card>
    </DialogContent>
  );
};

export const NutritionTab = ({
  id,
  quantity,
  unit,
}: {
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
        <Grid xs={12}>
          <NutritionOptionDropDown
            setFieldValue={(selected) => setNutritionsToDisplay(selected)}
          />
        </Grid>
        <Grid container xs={12}>
          <Grid xs={6}>
            <ItemNutrition
              nutritionsToDisplay={nutritionsToDisplay}
              title="Voedingswaarde"
              item={data.nutritionForRecipe}
            />
          </Grid>
        </Grid>
      </Card>
    </DialogContent>
  );
};
