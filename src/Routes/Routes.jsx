import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import SignUpEmployee from '../Pages/SignUp/SignUpEmployee';
import SignUpAdmin from '../Pages/SignUp/SignUpAdmin';
import Login from '../Pages/Login/Login';
import Payment from '../Pages/Payment/Payment';


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
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
        }
      ]
    },
  ]);

