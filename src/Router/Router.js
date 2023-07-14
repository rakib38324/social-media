import { createBrowserRouter } from "react-router-dom";
import Main from "../Lauout/Main";
import Home from "../Home/Home";
import Signup from "../Pages/SignUp/Signup";

const router = createBrowserRouter([


    {
        path: '/',
        element: <Main></Main>,
        children:[
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/signup',
                element: <Signup></Signup>   
            }
        ]
    }

]);

export default router;