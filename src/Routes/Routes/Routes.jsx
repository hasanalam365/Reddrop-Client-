import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
        ]
    },
]);