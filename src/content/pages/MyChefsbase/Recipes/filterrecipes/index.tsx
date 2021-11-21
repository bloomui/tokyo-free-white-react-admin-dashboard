import { Grid, Button, CardActions, Collapse, CardContent, Card } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { FaFilter } from "react-icons/fa";
import { RecipeFilterInput } from "src/globalTypes";
import { AutoSubmitToken, ExpandMore } from "../../Menus/filtermenus";
import { Dishes } from "../../Menus/filtermenus/components/dishes";
import { Ingredients } from "../../Menus/filtermenus/components/ingredients";
import { Menus } from "../../Menus/filtermenus/components/menus";
import { Products } from "../../Menus/filtermenus/components/products";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { Search } from "../../Menus/filtermenus/components/search";
import { Suppliers } from "../../Menus/filtermenus/components/suppliers";
import { Types } from "../../Menus/filtermenus/components/types";
import { Recipes_suppliers, Recipes_dishes, Recipes_menus, Recipes_ingredients, Recipes_products } from "../types/Recipes";
import {useNavigate} from 'react-router-dom';


export const initialRecipeValues: RecipeFilterInput = {
    dishes: [],
    suppliers: [],
    ingredients: [],
    products: [],
    rating: 0,
    menus: [],
    types: [],
    name: ''
  }
  
  export const RecipeFilter = ({
    setOpenAddRecipe,
    onClose,
    products,
    suppliers,
    types,
    dishes,
    menus,
    ingredients,
    onChange,
  }: {
    setOpenAddRecipe: () => void;
    onClose: () => void;
    types: string[] | null;
    suppliers: Recipes_suppliers[] | null;
    dishes: Recipes_dishes[] | null;
    menus: Recipes_menus[] | null;
    ingredients: Recipes_ingredients[] | null;
    products: Recipes_products[] | null;
    onChange: (values: RecipeFilterInput) => void;
  }) => {

    const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)
    const navigate = useNavigate()

    return (
      <Card>
        <Formik
        initialValues={initialRecipeValues}
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
        <Button 
        onClick={() => navigate("/mychefsbase/addrecipe")} fullWidth color="secondary" variant="contained" >
                      <span> Nieuw recept</span>
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
            <Types 
            types={types}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={3} item xs={3}>
              <Suppliers 
              suppliers={suppliers}
              setFieldValue={setFieldValue} />
          </Grid>
          <Grid key={4} item xs={3}>
            <Products 
            products={products}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={5} item xs={3}>
            <Ingredients 
            ingredients={ingredients}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={6} item xs={3}>
            <Dishes 
            dishes={dishes}
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={7} item xs={3}>
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