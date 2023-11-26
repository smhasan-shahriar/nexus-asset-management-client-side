import React from "react";
import useRole from "../../Hooks/useRole";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyEmployeeList = () => {
  const [user, pending] = useRole();
  const axiosPublic = useAxiosPublic();
  const getExistingUsers = async () => {
    const response = await axiosPublic.get(
      `/find-users?userCompany=${user?.companyName}`
    );
    return response.data;
  };
  const getNewUsers = async () => {
    const response = await axiosPublic.get(`/find-users?userCompany=none`);
    return response.data;
  };
  const { data: newUsers, refetch: newUserRefetch } = useQuery({
    queryKey: ["newUsers"],
    enabled: !pending,
    queryFn: getNewUsers,
  });
  const { data: existingUsers, refetch: existingUserRefetch } = useQuery({
    queryKey: ["existingUsers"],
    enabled: !pending,
    queryFn: getExistingUsers,
  });

  const handleRemoveEmployee = (email) => {
    const updatedUser = { userCompany: "none" };
    axiosPublic.put(`/manage-team-member/${email}`, updatedUser).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast("team member removed successfully");
        existingUserRefetch();
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>Nexus | My Employee List</title>
      </Helmet>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        My Employee List
      </h1>
      <h1 className="text-2xl w-full bg-black flex justify-evenly items-center text-white py-10 my-5">
        <p>Existing Members: {existingUsers?.length}</p>
        <p>Your Limit: {user?.employeeLimit}</p>
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Member Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {existingUsers?.map((user, index) => (
              <tr key={index}>
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
                <td className="btn">{user.role}</td>
                <th>
                  <button
                    onClick={() => handleRemoveEmployee(user?.email)}
                    className="btn bg-red-500 text-white"
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployeeList;
