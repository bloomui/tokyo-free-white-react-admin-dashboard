import { Grid, Button, CardActions, Collapse, CardContent, Card } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { FaFilter } from "react-icons/fa";
import { IngredientFilterInput, ProductFilterInput, RecipeFilterInput } from "src/globalTypes";
import { AutoSubmitToken, ExpandMore } from "../../Menus/filtermenus";
import { Dishes } from "../../Menus/filtermenus/components/dishes";
import { Ingredients } from "../../Menus/filtermenus/components/ingredients";
import { Menus } from "../../Menus/filtermenus/components/menus";
import { Prices } from "../../Menus/filtermenus/components/prices";
import { Products } from "../../Menus/filtermenus/components/products";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { Recipes } from "../../Menus/filtermenus/components/recipes";
import { Search } from "../../Menus/filtermenus/components/search";
import { Strings } from "../../Menus/filtermenus/components/strings";
import { Suppliers } from "../../Menus/filtermenus/components/suppliers";
import { Types } from "../../Menus/filtermenus/components/types";
import { initialRecipeValues } from "../../Recipes/filterrecipes";
import { Products_suppliers, Products_dishes, Products_menus, Products_recipes, Products_ingredients } from "../types/Products";


export const initialProductValues: ProductFilterInput = {
    dishes: [],
    suppliers: [],
    recipes: [],
    ingredients: [],
    rating: 0,
    menus: [],
    name: '',
    brands: [],
    origins: [],
    maxPrice: 1000.0,
    minPrice: 0.0,
  }
  
  export const ProductFilter = ({
    setOpenAddProduct,
    onClose,
    ingredients,
    origins,
    brands,
    suppliers,
    dishes,
    menus,
    recipes,
    onChange,
  }: {
    setOpenAddProduct: () => void;
    onClose: () => void;
    origins: string[] | null;
    brands: string[] | null;
    suppliers: Products_suppliers[] | null;
    dishes: Products_dishes[] | null;
    menus: Products_menus[] | null;
    recipes: Products_recipes[] | null;
    ingredients: Products_ingredients[] | null;
    onChange: (values: ProductFilterInput) => void;
  }) => {

    const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)

    return (
      <Card>
        <Formik
        initialValues={initialProductValues}
        onSubmit={(values) => {
         onChange(values)
        }}
        >
        {({ setFieldValue, submitForm }) => {
          return (
            <>
           <Grid container xs={12}>
            <CardActions disableSpacing>
            <Grid key={0} item>
           <Search placeholder="Zoek Recept" setFieldValue={setFieldValue}/>
           </Grid>
        <Grid key={1} item>
            <ExpandMore
          expand={openFilterInputDialog}
          onClick={() => setOpenFilterInputDialog(!openFilterInputDialog)}
          aria-expanded={openFilterInputDialog}
          aria-label="Geavanceerd zoeken"
        >
          <FaFilter/>
        </ExpandMore>
        </Grid>
        <Grid key={2} item>
        <Button fullWidth color="secondary" variant="contained" onClick={setOpenAddProduct}>
                      <span> Nieuw product</span>
                  </Button>
        </Grid>
      </CardActions>
      </Grid>
      <Collapse in={openFilterInputDialog} timeout="auto" unmountOnExit>
        <CardContent>   
                  <Grid container spacing={2} xs={12}>
             <Grid key={1} item xs={3}>
           <Rating1 
           updateField="rating"
           setFieldValue={setFieldValue}/>
           </Grid>
           <Grid key={2} item xs={3}>
              <Suppliers 
              suppliers={suppliers}
              setFieldValue={setFieldValue} />
          </Grid>
          <Grid key={3} item xs={3}>
            <Recipes 
            recipes={recipes}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={4} item xs={3}>
            <Recipes 
            recipes={recipes}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={5} item xs={3}>
            <Dishes 
            dishes={dishes}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={6} item xs={3}>
            <Menus 
            menus={menus}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={7} item xs={3}>
            <Strings
            title="merk"
            input="brands" 
            strings={brands}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={7} item xs={3}>
            <Strings
            title="herkomst"
            input="origins" 
            strings={origins}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={7} item xs={3}>
            <Prices
            setFieldValue={setFieldValue} />
            </Grid>
            </Grid>
              </CardContent>
              </Collapse>
              <AutoSubmitToken />
              </>
          )
        }}
      </Formik>
      </Card>
          )
        }