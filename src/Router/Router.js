import { createBrowserRouter } from "react-router-dom";
import Main from "../Lauout/Main";

const router = createBrowserRouter([


    {
        path: '/',
        element: <Main></Main>,
        children:[
            {
                path: '/',
                
            }
        ]
    }

]);

export default router;