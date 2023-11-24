import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();
  const newUser = useRole()[0];
  const handleLogOut = () => {
    logOut()
    .then (() => {
      toast('logged out')
    })
  }
  if(loading){
    return <p>...........</p>
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

      {user && newUser?.role ==="employee" && (
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
      {user && newUser?.role ==="admin" &&  (
        <>
          <li>
            <NavLink to="/employees">My Employee List</NavLink>
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
        </>
      )}
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
                {navLinks}
              </ul>
            )}
          </div>
          <div className="flex justify-center items-center gap-1">
            {
              !user && <div className="flex justify-center items-center gap-1">
  <img
              className="w-8"
              src="https://i.ibb.co/S7rGZfG/icons8-success-64.png"
              alt=""
            />
            <p className="text-xl font-bold">Nexus Asset Management</p>
              </div>
            }
            {
              user &&   <img
              className="w-8"
              src={user?.photoURL}
              alt=""
            />
            }
          
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        {
          !user ? <div onClick={() => navigate("/login")} className="navbar-end">
          <a className="btn">Login</a>
        </div> :
        <div onClick={handleLogOut} className="navbar-end">
        <a className="btn">Log Out</a>
      </div>
        }
        
      </div>
    </div>
  );
};

export default Navbar;
