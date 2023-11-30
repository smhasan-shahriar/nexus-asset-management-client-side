import React from "react";
import { Helmet } from "react-helmet";
import useRole from "../../Hooks/useRole";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { RiAdminLine, RiUser3Line } from "react-icons/ri";

const MyTeam = () => {
  const [user, pending] = useRole();
  const axiosPublic = useAxiosPublic();
  const getTeamMates = async () => {
    const response = await axiosPublic.get(
      `/find-users?userCompany=${user?.userCompany}`
    );
    return response.data;
  };
  const { data: teamMates, refetch: teamMatesRefetch } = useQuery({
    queryKey: ["existingUsers"],
    enabled: !pending,
    queryFn: getTeamMates,
  });

  const currentMonth = new Date().getMonth();
  const filteredTeamMates = teamMates?.filter((member) => {
    const dobMonth = new Date(member.dateOfBirth).getMonth();
    return dobMonth === currentMonth;
  });

  return (
    <div>
      <Helmet>
        <title>Nexus | My Team</title>
      </Helmet>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        My Team
      </h1>
      {
        (user?.role === "employee" && user?.userCompany === "none") ? <div className="text-2xl font-bold flex justify-center items-center w-full text-center" style={{"minHeight" : "calc(100vh - 356px)"}}>

        <h1>You are currently not in any team. Please Contact with Your HR</h1>

        </div>
        :
        <>
        <div>
        <h2 className="text-3xl text-center my-10 font-bold">
          Upcoming Events
        </h2>
        <div className="flex flex-col lg:flex-row my-10 gap-10">
          <div className="lg:w-1/3">
            <img
              className="w-full max-h-[400px] object-cover"
              src="https://i.ibb.co/qDHMxmV/tim-zankert-gm3-M-Csuyn-I-unsplash-1.jpg"
              alt=""
            />
          </div>
          <div>
          <h2 className="text-3xl text-center my-10 font-bold">
          Birthday this month
        </h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Member Image</th>
                    <th>Member Name</th>
                    <th>Date of Birth</th>
                    <th>Remaining Days</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeamMates?.map((user, index) => (
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
                      <td className="">{user.dateOfBirth}</td>
                     <td>
                        {
                            Math.ceil(((new Date(user.dateOfBirth)).getTime() - (new Date()).getTime())/((1000 * 60 * 60 * 24))) ? 'Birthday celebrated' : Math.ceil(((new Date(user.dateOfBirth)).getTime() - (new Date()).getTime())/((1000 * 60 * 60 * 24))) 
                        }

                     </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-3xl text-center my-10 font-bold">Team Members</h2>
        <div className="flex  flex-col lg:flex-row gap-10">
          <div className="lg:w-1/3">
            <img
              className="w-full max-h-[400px] object-cover"
              src="https://i.ibb.co/cYHtff1/annie-spratt-Qckxruozj-Rg-unsplash.jpg"
              alt=""
            />
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Member Image</th>
                    <th>Member Name</th>
                    <th>Member Type</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMates?.map((user, index) => (
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
                      <td className="text-xl font-bold">
                        {user.role === "admin" && <RiAdminLine />}
                        {user.role === "employee" && <RiUser3Line />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        
        </>
      }
      
    </div>
  );
};

export default MyTeam;
