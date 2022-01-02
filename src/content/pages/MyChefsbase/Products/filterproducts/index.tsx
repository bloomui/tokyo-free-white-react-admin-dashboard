import { Grid, Button, CardActions, Collapse, CardContent, Card } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { FaFilter } from "react-icons/fa";
import { IngredientFilterInput, ProductFilterInput, RecipeFilterInput } from "src/globalTypes";
import { AutoSubmitToken, ExpandMore } from "../../Menus/filtermenus";
import { Dishes } from "../../Menus/filtermenus/components/dishes";
import { Ingredients } from "../../Menus/filtermenus/components/ingredients";
import { Menus } from "../../Menus/filtermenus/components/menus";
import { PriceRange, Prices } from "../../Menus/filtermenus/components/prices";
import { Brands } from "../../Menus/filtermenus/components/seasons";
import { Rating1 } from "../../Menus/filtermenus/components/rating";
import { Recipes } from "../../Menus/filtermenus/components/recipes";
import { Search } from "../../Menus/filtermenus/components/search";
import { Strings } from "../../Menus/filtermenus/components/strings";
import { Suppliers } from "../../Menus/filtermenus/components/suppliers";
import { Types } from "../../Menus/filtermenus/components/types";
import { initialRecipeValues } from "../../Recipes/filterrecipes";
import {useNavigate} from 'react-router-dom';
import { H3 } from "src/content/pages/Components/TextTypes";


export type ProductFilterFormInput = {
    dishes: string[],
    suppliers: string[],
    recipes: string[],
    ingredients: string[],
    rating: string,
    menus: string[],
    name: string,
    brands: string[],
    origins: string[],
    maxPrice: string,
    minPrice: string,
}

export const mapFormToInput = (form: ProductFilterFormInput) => {
  const mapped: ProductFilterInput = {
    dishes: form.dishes,
    suppliers: form.suppliers,
    recipes: form.recipes,
    ingredients: form.ingredients,
    rating: Number(form.rating),
    menus: form.menus,
    name: form.name,
    brands: form.brands,
    origins: form.origins,
    maxPrice: Number(form.maxPrice),
    minPrice: Number(form.minPrice),
  }
  return mapped
}

export const initialProductValues: ProductFilterFormInput = {
    dishes: [],
    suppliers: [],
    recipes: [],
    ingredients: [],
    rating: '',
    menus: [],
    name: '',
    brands: [],
    origins: [],
    maxPrice: '1000',
    minPrice: '',
  }
  
  export const ProductFilter = ({
    origins,
    brands,
    onChange,
  }: {
    origins: string[] | null;
    brands: string[] | null;
    onChange: (values: ProductFilterFormInput) => void;
  }) => {

    const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)
    const navigate = useNavigate()

    return (
      <Card>
        <Formik
        initialValues={initialProductValues}
        onSubmit={(values) => {
         onChange(values)
        }}
        >
        {({ setFieldValue }) => {
          return (
            <>
           <Grid container xs={12}>
            <CardActions disableSpacing>
            <Grid key={0} item>
           <Search placeholder="Zoek product" setFieldValue={setFieldValue}/>
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
        <Button fullWidth color="secondary" variant="contained" onClick={() => navigate("/mychefsbase/addproduct")}>
                      <span> Nieuw product</span>
                  </Button>
        </Grid>
      </CardActions>
      </Grid>
      <Collapse in={openFilterInputDialog} timeout="auto" unmountOnExit>
        <CardContent>   
                  <Grid container spacing={2} xs={12}>
             <Grid item xs={3}>
           <Rating1 
           updateField="rating"
           setFieldValue={setFieldValue}/>
           </Grid>
           <Grid key={2} item xs={3}>
              <Suppliers 
              setFieldValue={setFieldValue} />
          </Grid>
          <Grid key={3} item xs={3}>
            <Ingredients 
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={4} item xs={3}>
            <Recipes 
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={5} item xs={3}>
            <Dishes 
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={6} item xs={3}>
            <Menus 
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={7} item xs={3}>
            <Brands
            brands={brands}
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
              <H3 title="Prijs"/>
            <PriceRange
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