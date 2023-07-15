import { createBrowserRouter } from "react-router-dom";
import Main from "../Lauout/Main";
import Signup from "../Pages/SignUp/Signup";
import Profile from "../Pages/Profile/Profile";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Media from "../Pages/Media/Media";
import Details from "../Pages/Details/Details";
import Message from "../Pages/Message/Message";
import About from "../Pages/About/About";

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
            },
            {
                path: '/login',
                element: <Login></Login>  
            },
            {
                path: '/profile',
                element: <Profile></Profile> 
            },
            {
                path: '/media',
                element: <Media></Media>
            },
            {
                path: '/singlePost/:id',
                element: <Details></Details>,
                loader: ({params}) => fetch(`https://social-server-sandy.vercel.app/singlePost/${params.id}`)
                
            },
            {
                path: '/message',
                element: <Message></Message>
            },
            {
                path: '/about',
                element: <About></About>
            },

        ]
    }

]);

export default router;