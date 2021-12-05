import { useQuery } from "@apollo/client";
import { Paper, Grid, Button, CardActions, Collapse, CardContent, Card } from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { FaFilter } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import { DishFilterInput } from "src/globalTypes";
import { AutoSubmitToken, ExpandMore } from "../../Menus/filtermenus";
import { Ingredients } from "../../Menus/filtermenus/components/ingredients";
import { Menus } from "../../Menus/filtermenus/components/menus";
import { Products } from "../../Menus/filtermenus/components/products";
import { Comment, Rating1 } from "../../Menus/filtermenus/components/rating";
import { Recipes } from "../../Menus/filtermenus/components/recipes";
import { Search } from "../../Menus/filtermenus/components/search";
import { Suppliers } from "../../Menus/filtermenus/components/suppliers";
import { Themes } from "../../Menus/filtermenus/components/themes";
import { Types } from "../../Menus/filtermenus/components/types";
import { DishesData } from "../api";


export const initialValues: DishFilterInput = {
    suppliers: [],
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
    setOpenAddDish,
    onClose,
    // products,
    // suppliers,
    themes,
    // recipes,
    // menus,
    // ingredients,
    onChange,
  }: {
    setOpenAddDish: () => void;
    onClose: () => void;
    themes: string[] | null;
    // suppliers: Dishes_suppliers[] | null;
    // recipes: Dishes_recipes[] | null;
    // menus: Dishes_menus[] | null;
    // ingredients: Dishes_ingredients[] | null;
    // products: Dishes_products[] | null;
    onChange: (values: DishFilterInput) => void;
  }) => {

    const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)

    const navigate = useNavigate()
    return (
      <Card>
        <Formik
        initialValues={initialValues}
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
           <Search placeholder="Zoek Gerecht" setFieldValue={setFieldValue}/>
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
        onClick={() => navigate("/mychefsbase/adddish")}
        fullWidth color="secondary" variant="contained" ><span> Nieuw gerecht</span>
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
           <Comment
            setFieldValue={setFieldValue} />
            </Grid>
            <Grid key={3} item xs={3}>
            <Themes 
            themes={themes}
            setFieldValue={setFieldValue} />
            </Grid>           
            <Grid key={5} item xs={3}>
              {/* <Suppliers 
              suppliers={suppliers}
              setFieldValue={setFieldValue} /> */}
          </Grid>
          <Grid key={6} item xs={3}>
            {/* <Products 
            products={products}
            setFieldValue={setFieldValue} /> */}
            </Grid>
            <Grid key={7} item xs={3}>
            {/* <Ingredients 
            ingredients={ingredients}
            setFieldValue={setFieldValue} /> */}
            </Grid>
            <Grid key={8} item xs={3}>
            {/* <Recipes 
            recipes={recipes}
            setFieldValue={setFieldValue} /> */}
            </Grid>
            <Grid key={8} item xs={3}>
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