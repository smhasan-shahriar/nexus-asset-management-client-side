import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useRole from '../../Hooks/useRole';
import { useQuery } from '@tanstack/react-query';

const PendingRequestAll = () => {
    const axiosPublic = useAxiosPublic()
    const [currentUser, pending] = useRole();
    const getRequests = async () => {
        const response = await axiosPublic.get(`/allrequests?companySearch=${currentUser.userCompany}`)
        return response.data.singleResult;
      }
      const {data: requestList, refetch: requestListRefetch} = useQuery({
        queryKey: ["allRequests", currentUser?.userCompany],
        enabled: !pending,
        queryFn: getRequests
    })
    const pendingRequest = requestList?.filter(item => item.status === 'pending').slice(0,4)
    return (
        <div className='my-10'>
      <h1 className="text-5xl text-center w-full flex justify-center items-center text-black py-10">
        All Pending Requests
      </h1>
      <div className="flex justify-center">
        <div className="lg:w-[700px] overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Asset Name</th>
                <th>Asset Type</th>
                <th>Requester Name</th>
                <th>Request Date</th>
                <th>Request Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequest?.map((asset, index) => (
                <tr className="font-semibold" key={index}>
                  <th>{index + 1}</th>
                  <td>{asset.assetName}</td>
                  <td className="capitalize">{asset.assetType}</td>
                  <td>{asset.userName}</td>
                  <td>{new Date(asset.requestedDate).toLocaleDateString()}</td>
                  <td className="text-red-500 font-bold capitalize">
                    {asset.status}
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

export default PendingRequestAll;