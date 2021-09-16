import { Paper, Grid, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { MenuFilterInput } from "src/globalTypes";
import { Menus_suppliers, Menus_recipes, Menus_dishes, Menus_ingredients, Menus_products } from "../types/Menus";
import { Dishes } from "./components/dishes";
import { Ingredients } from "./components/ingredients";
import { Period } from "./components/period";
import { Products } from "./components/products";
import { Rating1 } from "./components/rating";
import { Recipes } from "./components/recipes";
import { Search } from "./components/search";
import { Seasons } from "./components/seasons";
import { Suppliers } from "./components/suppliers";
import { Themes } from "./components/themes";

export const initialValues: MenuFilterInput = {
    name: '',
    offset: 0,
    limit: 0,
    themes: [],
    seasons: [],
    periodstartdate: '',
    periodenddate: '',
    recipes: [],
    dishes: [],
    ingredients: [],
    products: [],
    rating: 0
  }
  
  export  const MenuFilter = ({
    products,
    suppliers,
    themes,
    seasons,
    recipes,
    dishes,
    ingredients,
    onChange,
  }: {
    themes: string[] | null;
    seasons: string[] | null;
    suppliers: Menus_suppliers[] | null;
    recipes: Menus_recipes[] | null;
    dishes: Menus_dishes[] | null;
    ingredients: Menus_ingredients[] | null;
    products: Menus_products[] | null;
    onChange: (values: MenuFilterInput) => void;
  }) => {
    return (
      <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
         alert(JSON.stringify(values, null, 2));
         onChange(values)
        }}
        render={({ setFieldValue, handleSubmit }) => (
          <Form >
           <Grid container spacing={2} xs={12}>
         <Grid key={0} item xs={3}>
           <Search setFieldValue={setFieldValue}/>
           </Grid>
             <Grid key={1} item xs={3}>
           <Rating1 
           updateField="rating"
           setFieldValue={setFieldValue}/>
           </Grid>
           <Grid key={2} item xs={6}>
            <Period setFieldValue={setFieldValue}/>
            </Grid>
            <Grid key={3} item xs={3}>
            <Themes 
            themes={themes}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={4} item xs={3}>
            <Seasons 
            seasons={seasons}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={5} item xs={3}>
              <Suppliers 
              suppliers={suppliers}
              setFieldValue={setFieldValue} />
          </Grid>
          <Grid key={6} item xs={3}>
            <Products 
            products={products}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={7} item xs={3}>
            <Ingredients 
            ingredients={ingredients}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={8} item xs={3}>
            <Recipes 
            recipes={recipes}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={8} item xs={3}>
            <Dishes 
            dishes={dishes}
            setFieldValue={setFieldValue} />
            </Grid>         
            </Grid>
            <Grid item>
           <div>
           <Button onClick={() => handleSubmit} variant="contained" fullWidth type="submit" color="secondary" >
           <span>Zoek Menu's</span>
                 </Button>
         </div>
         </Grid>
          </Form>
          )}
          />
          </>
          )
        }