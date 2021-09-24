import React from "react";
import { Route } from "react-router";
import MyChefsBase from "./content/dashboards/Crypto";
import SignUp from "./content/pages/SignUp";

export const paths = {}
//     home: "/",
//     logIn: "/login",
//     signUp: "/sign-up",
//     myChefsbase: "/mychefsbase",
//     myInventory: "/my-inventory",
//     myAccount: "/my-account",
//     myInspirations: "/my-inspirations",
//     myOrders: "/my-orders",
//     myCalendar: "/my-calendar",
//     myMail: "/my-mail",
// }

// export const routes = {
//     ... paths,
//     home: () => `/`,
//     logIn: () => "/login",
//     signUp: () => `/sign-up`,
//     myChefsbase: () => `/mychefsbase`,
//     myInventory: () => `/my-inventory`,
//     myAccount: () => `/my-account`,
//     myInspirations: () => `/my-inspirations`,
//     myOrders: () => `/my-orders`,
//     myCalendar: () => `/my-calendar`,
//     myMail: () => `/my-mail`,
// };

// const Router = () => {
//     return (
//         <Switch>
//             <Route exact path="/">
//                 <Home/>
//             </Route>
//         <Route path={paths.logIn}>
//             <LogIn />
//             </Route>
//             <Route path={paths.signUp}>
//             <SignUp />
//             </Route>
//             <Route exact path={paths.myChefsbase} component={MyChefsBase} />
//             <Route path={paths.myInventory}>
//                 <MyInventory />
//             </Route>
//             <Route path={paths.myAccount}>
//                 <MyInventory />
//             </Route>
//             <Route path={paths.myInspirations}>
//                 <MyInspirations />
//             </Route>
//             <Route path={paths.myOrders}>
//                 <MyOrders />
//             </Route>
//             <Route path={paths.myInventory}>
//                 <MyInventory />
//             </Route>
//             <Route path={paths.myCalendar}>
//                 <MyCalendar />
//             </Route>
//             <Route path={paths.myMail}>
//                 <MyMail />
//             </Route>
//             <Route component={() => <div>Pagina niet gevonden</div>} />
//             </Switch>
//     )
// }

// export default Router;