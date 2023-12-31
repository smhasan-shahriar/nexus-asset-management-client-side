import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logOut } = useAuth();
  const [currentUser, pending] = useRole();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut().then(() => {
      toast("logged out");
      navigate("/");
    });
  };
  if (pending) {
    return (
      <div className="w-full h-[10vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const navLinks = (
    <>
     
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink to="/signup-employee">Join As Employee</NavLink>
          </li>
          <li>
            <NavLink to="/signup-admin">Join as HR/Admin</NavLink>
          </li>
        </>
      )}

      {user && currentUser?.role === "employee" && (
        <>
          <li>
            <NavLink to="/myteam">My Team</NavLink>
          </li>
          <li>
            <NavLink to="/myassets">My Assets</NavLink>
          </li>
          <li>
            <NavLink to="/requestasset">Request for an Asset</NavLink>
          </li>
          <li>
            <NavLink to="/requestcustomasset">Make a Custom Request</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </>
      )}
      {user && currentUser?.role === "admin" && (
        <>
        
          <li>
            <NavLink to="/myemployees">My Employee List</NavLink>
          </li>
          <li>
            <NavLink to="/addemployee">Add an Employee</NavLink>
          </li>
          <li>
            <NavLink to="/assets">Asset List</NavLink>
          </li>
          <li>
            <NavLink to="/addasset">Add an Asset</NavLink>
          </li>
          <li>
            <NavLink to="/requests">All Requests</NavLink>
          </li>
          <li>
            <NavLink to="/customrequests">Custom Requests List</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          
        </>
      )}
       <li>
      {user && (
              <div className="lg:flex gap-2 items-center justify-center lg:relative bottom-1  hidden">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={currentUser?.image}
                  alt=""
                />
                <p className="font-bold">{currentUser?.name}</p>
              </div>
            )}
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {isOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
      {user && (
              <div className="flex gap-2 lg:hidden">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={currentUser?.image}
                  alt=""
                />
                <p className="font-bold">{currentUser?.name}</p>
              </div>
            )}
      </li>
                {navLinks}
              </ul>
            )}
          </div>
          <div className="flex justify-center items-center gap-1">
            {!user && (
              <div className="flex justify-center items-center gap-1">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://i.ibb.co/vh2hk8x/icons8-office-64.png"
                  alt=""
                />
                <p className="text-xl font-bold">Nexus Asset Management</p>
              </div>
            )}
            {user && (
              <div className="flex gap-2 items-center justify-center relative bottom-1">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={currentUser?.companyImage}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        {!user ? (
          <div className="navbar-end">
            <a onClick={() => navigate("/login")} className="btn">
              Login
            </a>
          </div>
        ) : (
          <div className="navbar-end">
            <a onClick={handleLogOut} className="btn">
              Log Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
