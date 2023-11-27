import React from "react";
import useRole from "../../Hooks/useRole";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiAdminLine, RiUser3Line } from "react-icons/ri";

const AddEmployee = () => {
  const [user, pending] = useRole();
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic();
  const getNewUsers = async () => {
    const response = await axiosPublic.get(`/find-users?userCompany=none`);
    return response.data;
  };
  const { data: newUsers, refetch: newUserRefetch } = useQuery({
    queryKey: ["newUsers"],
    enabled: !pending,
    queryFn: getNewUsers,
  });
  const getExistingUsers = async () => {
    const response = await axiosPublic.get(
      `/find-users?userCompany=${user?.userCompany}`
    );
    return response.data;
  };
  const { data: existingUsers, refetch: existingUserRefetch  } = useQuery({
    queryKey: ["existingUsers"],
    enabled: !pending,
    queryFn: getExistingUsers,
  });

  const handleAddEmployee = (email) => {
    const updatedUser = {userCompany: user?.userCompany, companyImage: user?.companyImage }
    axiosPublic.put(`/manage-team-member/${email}`, updatedUser)
    .then(res => {
      if(res.data.modifiedCount > 0){
        toast('team member added successfully')
        newUserRefetch();
        existingUserRefetch();
      }
    })
  }
  const currentMembers = existingUsers?.length;
  const limit = user?.employeeLimit;

  return (
    <div>
      <Helmet>
                <title>Nexus | Add Employee</title>
            </Helmet>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        Add Employee
      </h1>
      <h1 className="text-2xl w-full bg-black flex justify-evenly items-center text-white py-10 my-5 px-5">
        <p>Existing Members: {currentMembers}</p>
        <p>Your Limit: {limit}</p>
        <button onClick={() => navigate("/packages")} className="btn">Increase Limit</button>
      </h1>
      <div className="overflow-x-auto"  style={{"minHeight" : "calc(100vh - 524px)"}}>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Member Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {newUsers?.map((user, index) => (
              <tr key={index}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td className="text-xl font-bold"> {user.role === "admin" && <RiAdminLine />}
                        {user.role === "employee" && <RiUser3Line />}</td>
                <th>
                  <button disabled= {currentMembers > limit } onClick={() => handleAddEmployee(user.email)} className="btn bg-green-500 text-white">Add</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddEmployee;
