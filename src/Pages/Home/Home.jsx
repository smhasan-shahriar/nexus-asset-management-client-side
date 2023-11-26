import React from "react";
import Banner from "./Banner";
import Package from "./Package";
import About from "./About";
import { Helmet } from "react-helmet";
import useRole from "../../Hooks/useRole";
import useAuth from "../../Hooks/useAuth";
import SectionCustomRequests from "./SectionCustomRequests";
import HomeUser from "./HomeUser";
import HomeAdmin from "./HomeAdmin";

const Home = () => {
  const { user, loading } = useAuth();
  const [currentUser, pending] = useRole();
  if (pending || loading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Helmet>
        <title>Nexus Asset Management</title>
      </Helmet>
      {!user && (
        <>
          <Banner></Banner>
          <About></About>
          <Package></Package>
        </>
      )}
      {
        user && currentUser?.role === "employee" && currentUser?.userCompany !== "none" && <>
        <HomeUser></HomeUser>
        
        </>
      }
      {
        user && currentUser?.role === "admin" && currentUser?.userCompany !== "none" && <>
        <HomeAdmin></HomeAdmin>
        
        </>
      }
      {
        user && currentUser?.role === "employee" && currentUser?.userCompany === "none" && <div className="text-2xl font-bold flex justify-center items-center min-h-screen w-full">

        <h1>You are currently not in any team. Please Contact with Your HR</h1>

        </div>
      }
    </div>
  );
};

export default Home;
