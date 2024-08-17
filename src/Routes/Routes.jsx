import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: "/",
            element: <Home></Home>,
            loader: () => fetch('http://localhost:5000/ProductsCount')
        },
        {
            path: "/login",
            element:<Login></Login>,
        },
        {
            path: "/register",
            element: <Register></Register>,
        },
      ]
    },
  ]);

  export default router;