import React, { Children } from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [currentUser, pending] = useRole();
    const location = useLocation()

    if(loading || pending){
        return (
            <div className="w-full h-[80vh] flex justify-center items-center">
              <span className="loading loading-spinner loading-xs"></span>
              <span className="loading loading-spinner loading-sm"></span>
              <span className="loading loading-spinner loading-md"></span>
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          );
    }

    if (user && currentUser.role === "admin"){
        return children;
    }
    else{
        return <Navigate state={location.pathname} to="/login" replace></Navigate>
      }
};

export default AdminRoute;