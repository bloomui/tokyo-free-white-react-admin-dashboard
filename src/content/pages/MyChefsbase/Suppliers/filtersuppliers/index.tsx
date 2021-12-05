import { Grid, Button, CardActions, Collapse, CardContent, Card } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { FaFilter } from "react-icons/fa";
import { IngredientFilterInput, ProductFilterInput, RecipeFilterInput, SupplierFilterInput } from "src/globalTypes";
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
import {useNavigate} from 'react-router-dom';


export const initialSupplierValues: SupplierFilterInput = {
    dishes: [],
    products: [],
    recipes: [],
    ingredients: [],
    rating: 0,
    menus: [],
    name: '',
  }
  
  export const SupplierFilter = ({
    setOpenAddSupplier,
    onClose,
    // ingredients,
    // products,
    // dishes,
    // menus,
    // recipes,
    onChange,
  }: {
    setOpenAddSupplier: () => void;
    onClose: () => void;
    // products: Suppliers_products[] | null;
    // dishes: Suppliers_dishes[] | null;
    // menus: Suppliers_menus[] | null;
    // recipes: Suppliers_recipes[] | null;
    // ingredients: Suppliers_ingredients[] | null;
    onChange: (values: SupplierFilterInput) => void;
  }) => {

    const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)

    const navigate = useNavigate()
    return (
      <Card>
        <Formik
        initialValues={initialSupplierValues}
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
           <Search placeholder="Zoek leverancier" setFieldValue={setFieldValue}/>
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
        <Button fullWidth color="secondary" variant="contained" onClick={setOpenAddSupplier}>
                      <span> Nieuwe leverancier</span>
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
           {/* <Products
            products={products}
            setFieldValue={setFieldValue} /> */}
            </Grid>
            <Grid item xs={3}>
            {/* <Ingredients 
              ingredients={ingredients}
              setFieldValue={setFieldValue} /> */}
              </Grid>
            <Grid item xs={3}>
            {/* <Recipes 
            recipes={recipes}
            setFieldValue={setFieldValue} /> */}
            </Grid>
            <Grid item xs={3}>
            {/* <Dishes 
            dishes={dishes}
            setFieldValue={setFieldValue} /> */}
            </Grid>
            <Grid item xs={3}>
            {/* <Menus 
            menus={menus}
            setFieldValue={setFieldValue} /> */}
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