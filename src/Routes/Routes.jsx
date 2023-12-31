import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import SignUpEmployee from '../Pages/SignUp/SignUpEmployee';
import SignUpAdmin from '../Pages/SignUp/SignUpAdmin';
import Login from '../Pages/Login/Login';
import Payment from '../Pages/Payment/Payment';
import AddAsset from '../Pages/AddAsset/AddAsset';
import AssetListAdmin from '../Pages/AssetListAdmin/AssetListAdmin';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import RequestAsset from '../Pages/RequestAsset/RequestAsset';
import MakeCustomRequest from '../Pages/MakeCustomRequest/MakeCustomRequest';
import Profile from '../Pages/Profile/Profile';
import AllRequests from '../Pages/AllRequests/AllRequests';
import AllCustomRequests from '../Pages/AllCustomRequests/AllCustomRequests';
import AddEmployee from '../Pages/AddEmployee/AddEmployee';
import MyEmployeeList from '../Pages/MyEmployeeList/MyEmployeeList';
import OurPackages from '../Pages/Packages/OurPackages';
import MyAssets from '../Pages/MyAssets/MyAssets';
import MyTeam from '../Pages/MyTeam/MyTeam';
import PrivateRoutes from './PrivateRoutes';
import AdminRoute from './AdminRoute';
import UpdateAsset from '../Pages/UpdateAsset/UpdateAsset';
import PrintComponent from '../Components/PrintCompnent/PrintComponent';


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/signup-employee",
            element: <SignUpEmployee></SignUpEmployee>
        },
        {
            path: "/signup-admin",
            element: <SignUpAdmin></SignUpAdmin>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
          path: "/payment",
          element: <Payment></Payment>
        },
        //admin routes
        {
          path: "/addasset",
          element: <AdminRoute><AddAsset></AddAsset></AdminRoute> 
        },
        {
          path: "/assets",
          element: <AdminRoute><AssetListAdmin></AssetListAdmin></AdminRoute> 
        }, 
        {
          path: "/requests",
          element: <AdminRoute><AllRequests></AllRequests></AdminRoute>  
        },
        {
          path: "/customrequests",
          element: <AdminRoute><AllCustomRequests></AllCustomRequests></AdminRoute>  
        },
        {
          path: "/addemployee",
          element: <AdminRoute><AddEmployee></AddEmployee></AdminRoute>
        },
        {
          path: "/myemployees",
          element: <AdminRoute><MyEmployeeList></MyEmployeeList></AdminRoute> 
        },
        {
          path: "/updateasset/:id",
          element: <UpdateAsset></UpdateAsset>
        },
        //employee routes
        {
          path: "/myteam",
          element: <PrivateRoutes><MyTeam></MyTeam></PrivateRoutes>
        },
        
        {
          path: "/requestasset",
          element: <PrivateRoutes><RequestAsset></RequestAsset></PrivateRoutes> 
        },
        {
          path: "/requestcustomasset",
          element: <PrivateRoutes> <MakeCustomRequest></MakeCustomRequest></PrivateRoutes>
        },
        {
          path: "/profile",
          element: <PrivateRoutes><Profile></Profile></PrivateRoutes> 
        },
        {
          path: "/myassets",
          element: <PrivateRoutes><MyAssets></MyAssets></PrivateRoutes> 
        },
        
        {
          path: "/packages",
          element: <OurPackages></OurPackages>
        },
        {
          path: "/print",
          element:  <PrintComponent></PrintComponent>
        }
        

      ]
    },
  ]);

