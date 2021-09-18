import { Paper, Grid, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { DishFilterInput } from "src/globalTypes";
import { Ingredients } from "../../Menus/filtermenus/components/ingredients";
import { Menus } from "../../Menus/filtermenus/components/menus";
import { Products } from "../../Menus/filtermenus/components/products";
import { Comment, Rating1 } from "../../Menus/filtermenus/components/rating";
import { Recipes } from "../../Menus/filtermenus/components/recipes";
import { Search } from "../../Menus/filtermenus/components/search";
import { Suppliers } from "../../Menus/filtermenus/components/suppliers";
import { Themes } from "../../Menus/filtermenus/components/themes";
import { Types } from "../../Menus/filtermenus/components/types";
import { Dishes_ingredients, Dishes_menus, Dishes_products, Dishes_recipes, Dishes_suppliers } from "../types/Dishes";


export const initialValues: DishFilterInput = {
    themes: [],
    recipes: [],
    ingredients: [],
    products: [],
    rating: 0,
    menus: [],
    types: [],
    comment: [],
    course: [],
  }
  
  export const DishFilter = ({
    products,
    suppliers,
    themes,
    types,
    recipes,
    menus,
    ingredients,
    onChange,
  }: {
    types: string[] | null;
    themes: string[] | null;
    suppliers: Dishes_suppliers[] | null;
    recipes: Dishes_recipes[] | null;
    menus: Dishes_menus[] | null;
    ingredients: Dishes_ingredients[] | null;
    products: Dishes_products[] | null;
    onChange: (values: DishFilterInput) => void;
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
           <Search placeholder={null} setFieldValue={setFieldValue}/>
           </Grid>
             <Grid key={1} item xs={3}>
           <Rating1 
           updateField="rating"
           setFieldValue={setFieldValue}/>
           </Grid>
           <Grid key={2} item xs={3}>
           <Comment
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={3} item xs={3}>
            <Themes 
            themes={themes}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={4} item xs={3}>
            <Types 
            types={types}
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
            <Menus 
            menus={menus}
            setFieldValue={setFieldValue} />
            </Grid>
            </Grid>
            <Grid key={10} item>
           <div>
           <Button onClick={() => handleSubmit} variant="contained" fullWidth type="submit" color="secondary" >
           <span>Zoek Gerechten</span>
                 </Button>
                  </div>
         </Grid>
          </Form>
          )}
          />
          </>
          )
        }