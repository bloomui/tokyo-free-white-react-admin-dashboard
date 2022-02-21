import React, { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { PartialRouteObject } from "react-router";

import SidebarLayout from "src/layouts/SidebarLayout";
import BaseLayout from "src/layouts/BaseLayout";

import SuspenseLoader from "src/components/SuspenseLoader";
import SignInForm from "./content/pages/SignIn";
import SignUpForm from "./content/pages/SignUp";
import MyChefsBase from "./content/pages/MyChefsbase";
import {
  AddRecipePage,
  AddRecipePage1,
} from "./content/pages/MyChefsbase/Recipes/AddRecipe";
import { AddProductPage } from "./content/pages/MyChefsbase/Products/AddProduct";
import { AddIngredientPage } from "./content/pages/MyChefsbase/Ingredients/AddIngredient";
import { AddDishPage } from "./content/pages/MyChefsbase/Dishes/AddDish";
import { AddMenuPage } from "./content/pages/MyChefsbase/Menus/AddMenu";
import { AddSupplierPage } from "./content/pages/MyChefsbase/Suppliers/AddSupplier";
import { Orders } from "./content/pages/Orders";
import {
  IngredientContent,
  RecipeContent,
  RecipesAndIngredients,
} from "./content/pages/MyChefsbase/Content";
import { IngredientPage } from "./content/pages/MyChefsbase/Ingredients";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import("src/content/overview")));

// Dashboards

const Crypto = Loader(lazy(() => import("src/content/dashboards/Crypto")));

// Applications

const Messenger = Loader(
  lazy(() => import("src/content/applications/Messenger"))
);
const Transactions = Loader(
  lazy(() => import("src/content/applications/Transactions"))
);
const UserProfile = Loader(
  lazy(() => import("src/content/applications/Users/profile"))
);
const UserSettings = Loader(
  lazy(() => import("src/content/applications/Users/settings"))
);

// Components

const Buttons = Loader(
  lazy(() => import("src/content/pages/Components/Buttons"))
);
const Modals = Loader(
  lazy(() => import("src/content/pages/Components/Modals"))
);
const Accordions = Loader(
  lazy(() => import("src/content/pages/Components/Accordions"))
);
const Tabs = Loader(lazy(() => import("src/content/pages/Components/Tabs")));
const Badges = Loader(
  lazy(() => import("src/content/pages/Components/Badges"))
);
const Tooltips = Loader(
  lazy(() => import("src/content/pages/Components/Tooltips"))
);
const Avatars = Loader(
  lazy(() => import("src/content/pages/Components/Avatars"))
);
const Cards = Loader(lazy(() => import("src/content/pages/Components/Cards")));
const Forms = Loader(lazy(() => import("src/content/pages/Components/Forms")));

// Status

const Status404 = Loader(
  lazy(() => import("src/content/pages/Status/Status404"))
);
const Status500 = Loader(
  lazy(() => import("src/content/pages/Status/Status500"))
);
const StatusComingSoon = Loader(
  lazy(() => import("src/content/pages/Status/ComingSoon"))
);
const StatusMaintenance = Loader(
  lazy(() => import("src/content/pages/Status/Maintenance"))
);

export const Router: PartialRouteObject[] = [
  {
    path: "*",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "overview",
        element: <Navigate to="/" replace />,
      },
      {
        path: "status",
        children: [
          {
            path: "/",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "500",
            element: <Status500 />,
          },
          {
            path: "maintenance",
            element: <StatusMaintenance />,
          },
          {
            path: "coming-soon",
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
];

const routes = (isLoggedIn: boolean) => [
  {
    path: "*",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "authorize",
        children: [
          {
            path: "signin",
            element: <SignInForm />,
          },
          {
            path: "signup",
            element: <SignUpForm />,
          },
        ],
      },
      {
        path: "overview",
        element: <Navigate to="/" replace />,
      },
      {
        path: "status",
        children: [
          {
            path: "/",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "500",
            element: <Status500 />,
          },
          {
            path: "maintenance",
            element: <StatusMaintenance />,
          },
          {
            path: "coming-soon",
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "mychefsbase",
    element: <SidebarLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/mychefsbase/chefsbase" replace />,
      },
      {
        path: "chefsbase",
        element: isLoggedIn ? (
          <RecipesAndIngredients content={<RecipeContent />} />
        ) : (
          <Navigate to="/authorize/signin" />
        ),
      },
      {
        path: "recipes",
        element: <RecipesAndIngredients content={<RecipeContent />} />,
      },
      {
        path: "ingredients",
        element: <RecipesAndIngredients content={<IngredientContent />} />,
      },
      {
        path: "inventaris",
        element: <StatusComingSoon />,
      },
      {
        path: "orders",
        element: <StatusComingSoon />,
      },
      {
        path: "addsupplier",
        element: <AddSupplierPage />,
      },
      {
        path: "addproduct",
        element: <AddProductPage />,
      },
      {
        path: "addingredient",
        element: <AddIngredientPage />,
      },
      {
        path: "addrecipe",
        element: <AddRecipePage1 />,
      },
      {
        path: "adddish",
        element: <AddDishPage />,
      },
      {
        path: "addmenu",
        element: <AddMenuPage />,
      },
    ],
  },
  {
    path: "management",
    element: <SidebarLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/management/transactions" replace />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "profile",
        children: [
          {
            path: "/",
            element: <Navigate to="details" replace />,
          },
          {
            path: "details",
            element: <UserProfile />,
          },
          {
            path: "settings",
            element: <UserSettings />,
          },
        ],
      },
    ],
  },
  {
    path: "components",
    element: <SidebarLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/components/buttons" replace />,
      },
      {
        path: "buttons",
        element: <Buttons />,
      },
      {
        path: "modals",
        element: <Modals />,
      },
      {
        path: "accordions",
        element: <Accordions />,
      },
      {
        path: "tabs",
        element: <Tabs />,
      },
      {
        path: "badges",
        element: <Badges />,
      },
      {
        path: "tooltips",
        element: <Tooltips />,
      },
      {
        path: "avatars",
        element: <Avatars />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "forms",
        element: <Forms />,
      },
    ],
  },
];

export default routes;
