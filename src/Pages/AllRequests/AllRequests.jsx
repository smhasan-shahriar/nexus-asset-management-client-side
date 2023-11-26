import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../Hooks/useRole';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

const AllRequests = () => {
    const axiosPublic = useAxiosPublic()
    const [currentUser, pending] = useRole();
    const getRequests = async () => {
        const response = await axiosPublic.get(`/allrequests?companySearch=${currentUser.companyName}`)
        return response.data.singleResult;
      }
    
      const {data: requestList, refetch: requestListRefetch} = useQuery({
          queryKey: ["allRequests", currentUser?.companyName],
          enabled: !pending,
          queryFn: getRequests
      })
      console.log(requestList)
      
      const handleReject = id => {
        axiosPublic.put(`/manage-request/${id}`, {newStatus: 'rejected'})
        .then(res => {
          if(res.data.modifiedCount > 0){
            toast('item rejected');
            requestListRefetch();
          }
        })
      }
      const handleApprove = request => {
        axiosPublic.put(`/manage-request/${request._id}`, {newStatus: 'approved', assetId: request.assetId})
        .then(res => {
          if(res.data.modifiedCount > 0){
            toast('item approved');
            requestListRefetch();
          }
        })
      }


    return (
        <div>
           <Helmet>
        <title>Nexus | Customer Requests</title>
      </Helmet>
            <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        All Requests
      </h1>
      <div className='flex flex-col lg:flex-row items-center m-10 justify-between'>
            <form >
                <input
                  name="nameSearch"
                  className="text-sm p-[13px] md:w-[360px] w-[220px] border border-r-0"
                  type="text"
                  placeholder="Search by requester name"
                />
                <input
                  type="submit"
                  className="w-[110px] h-[50px] bg-[#FF444A] text-white rounded-r-lg font-semibold btn rounded-none"
                  value="Search"
                ></input>
            </form>
            <form >
                <input
                  name="emailSearch"
                  className="text-sm p-[13px] md:w-[360px] w-[220px] border border-r-0"
                  type="email"
                  placeholder="Search by requester email"
                />
                <input
                  type="submit"
                  className="w-[110px] h-[50px] bg-[#FF444A] text-white rounded-r-lg font-semibold btn rounded-none"
                  value="Search"
                ></input>
            </form>
          </div>
          <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Asset Name</th>
                <th>Asset Type</th>
                <th>Requester Email</th>
                <th>Requester Name</th>
                <th>Request Date</th>
                <th>Additional note</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requestList?.map((request, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{request.assetName}</td>
                  <td>{request.assetType}</td>
                  <td>{request.userEmail}</td>
                  <td>{request.userName}</td>
                  <td>{new Date(request.requestedDate).toLocaleDateString()}</td>
                  <td>{request.additionalNote}</td>
                  <td>{request.status}</td>
                  <td className="">
                    <button  onClick={() => handleApprove(request)}  disabled={request.status === "rejected" || request.status === "approved"} className="btn bg-green-600 text-white">
                      Approve
                    </button>
                    <button onClick={() => handleReject(request._id)}  disabled={request.status === "rejected" || request.status === "approved"} className="btn bg-red-600 text-white">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
        </div>
    );
};

export default AllRequests;