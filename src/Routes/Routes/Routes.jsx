import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import SearchDonors from "../../Pages/SearchDonors/SearchDonors";
import Fundings from "../../Pages/Fundings/Fundings/Fundings";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import Profile from "../../Pages/Dashboard/Profile/Profile";

import CreateDonationRequest from "../../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequest from "../../Pages/Dashboard/MyDonationRequest/MyDonationRequest";
import UpdatedDonationRequest from "../../Components/UpdatedDonationRequest/UpdatedDonationRequest";
import DashboardRole from "../../Pages/Dashboard/DashboardRole/DashboardRole/DashboardRole";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";
import DonarRequest from "../../Pages/DonarRequest/DonarRequest";
import BloodDonationDetails from "../../Components/BloodDonationDetails/BloodDonationDetails";
import AllUsersPage from "../../Pages/Dashboard/DashboardRole/AdminDashboard/AllUsersPage";
import AllDonationRequest from "../../Pages/Dashboard/DashboardRole/AdminDashboard/AllDonationRequest";
import AdminRoute from "../AdminRoute/AdminRoute";
import ContentManagement from "../../Pages/Dashboard/ContentManageMent/ContentManagement";
import AddBlog from "../../Pages/Dashboard/ContentManageMent/AddBlog";
// import AddBlog from "../../Pages/Dashboard/AddBlog/AddBlog";
// import AdminAndVolunRoute from "../AdminRoute/AdminAndVolun/AdminAndVolunRoute";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/donarRequests',
                element: <DonarRequest></DonarRequest>
            },
            {
                path: '/fundings',
                element: <PrivateRoute>
                    <Fundings></Fundings>
                </PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/searchDonors',
                element: <SearchDonors></SearchDonors>
            },
            {
                path: '/donarRequestDetails/:id',
                element: <PrivateRoute>
                    <BloodDonationDetails></BloodDonationDetails>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://reddrop-bdserver.vercel.app/donation-request/${params.id}`)
            },
        ]
    },
    {
        path: '/dashboard',
        element:
            <PrivateRoute>
                <Dashboard></Dashboard>
            </PrivateRoute>
        ,
        children: [
            {

                path: '/dashboard',
                element: <DashboardRole></DashboardRole>

            },
            {
                path: 'all-users',
                element: <PrivateRoute>
                    <AdminRoute>
                        <AllUsersPage></AllUsersPage>
                    </AdminRoute>
                </PrivateRoute>

            },
            {
                path: 'all-blood-donation-request',
                element: <PrivateRoute>
                    {/* <AdminAndVolunRoute> */}

                    <AllDonationRequest></AllDonationRequest>

                    {/* </AdminAndVolunRoute> */}
                </PrivateRoute>
            },
            {

                path: 'create-donation-request',
                element: <PrivateRoute>
                    <CreateDonationRequest></CreateDonationRequest>
                </PrivateRoute>

            },
            {

                path: 'my-donation-requests',
                element: <PrivateRoute>
                    <MyDonationRequest></MyDonationRequest>
                </PrivateRoute>

            },
            {

                path: 'content-management',
                element: <ContentManagement></ContentManagement>

            },
            {

                path: 'content-management/add-blog',
                element: <AddBlog></AddBlog>

            },
            {

                path: 'updated-donation-request/:id',
                element: <PrivateRoute> <UpdatedDonationRequest></UpdatedDonationRequest></PrivateRoute>,
                loader: ({ params }) => fetch(`https://reddrop-bdserver.vercel.app/donation-request/${params.id}`)
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },

        ]

    }
]);