import { Grid, Button, CardActions, Collapse, CardContent, Card } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { FaFilter } from "react-icons/fa";
import { IngredientFilterInput, RecipeFilterInput } from "src/globalTypes";
import { AutoSubmitToken, ExpandMore } from "../../Menus/filtermenus";
import { Categories } from "../../Menus/filtermenus/components/categories";
import { Dishes } from "../../Menus/filtermenus/components/dishes";
import { Ingredients } from "../../Menus/filtermenus/components/ingredients";
import { Menus } from "../../Menus/filtermenus/components/menus";
import { Products } from "../../Menus/filtermenus/components/products";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { Recipes } from "../../Menus/filtermenus/components/recipes";
import { Search } from "../../Menus/filtermenus/components/search";
import { Suppliers } from "../../Menus/filtermenus/components/suppliers";
import { Types } from "../../Menus/filtermenus/components/types";
import { initialRecipeValues } from "../../Recipes/filterrecipes";
import { Ingredients_dishes, Ingredients_menus, Ingredients_products, Ingredients_recipes, Ingredients_suppliers } from "../types/Ingredients";
import {useNavigate} from 'react-router-dom';


export const initialIngredientValues: IngredientFilterInput = {
    dishes: [],
    suppliers: [],
    recipes: [],
    products: [],
    categories: [],
    rating: 0,
    menus: [],
    name: ''
  }
  
  export const IngredientFilter = ({
    setOpenAddIngredient,
    onClose,
    allCategories,
    products,
    suppliers,
    dishes,
    menus,
    recipes,
    onChange,
  }: {
    setOpenAddIngredient: () => void;
    onClose: () => void;
    suppliers: Ingredients_suppliers[] | null;
    dishes: Ingredients_dishes[] | null;
    menus: Ingredients_menus[] | null;
    recipes: Ingredients_recipes[] | null;
    products: Ingredients_products[] | null;
    allCategories: string[] | null;
    onChange: (values: IngredientFilterInput) => void;
  }) => {

    const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)

    const  navigate = useNavigate()
    return (
      <Card>
        <Formik
        initialValues={initialIngredientValues}
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
           <Search placeholder="Zoek Ingredient" setFieldValue={setFieldValue}/>
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
        <Button 
        onClick={() => navigate("/mychefsbase/addingredient")}
        fullWidth color="secondary" variant="contained" ><span> Nieuw ingredient</span>
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
           <Grid key={3} item xs={3}>
            <Categories 
            allCategories={allCategories}
            setFieldValue={setFieldValue} />
            </Grid> 
           <Grid key={2} item xs={3}>
              <Suppliers 
              suppliers={suppliers}
              setFieldValue={setFieldValue} />
          </Grid>
          <Grid key={3} item xs={3}>
            <Products 
            products={products}
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