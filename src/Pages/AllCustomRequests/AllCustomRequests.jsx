import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useRole from '../../Hooks/useRole';
import { useQuery } from '@tanstack/react-query';

const AllCustomRequests = () => {
    const axiosPublic = useAxiosPublic()
    const [currentUser, pending] = useRole();
    const getRequests = async () => {
        const response = await axiosPublic.get(`/allcustomrequests?companySearch=${currentUser.companyName}`)
        return response.data.singleResult;
      }

      const {data: customRequestList} = useQuery({
        queryKey: ["allCustomRequests"],
        enabled: !pending,
        queryFn: getRequests
    })
    console.log(customRequestList)
    return (
        <div>
            <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        All Custom Requests
      </h1>
      <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Asset Name</th>
                <th>Price</th>
                <th>Asset Type</th>
                <th>Asset Image</th>
                <th>Why You need this</th>
                <th>Additional Information</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customRequestList?.map((request, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{request.assetName}</td>
                  <td>{request.assetType}</td>
                  <td>${request.assetPrice}</td>
                  <td><img className='w-16 h-16 rounded-full' src={request.assetImage} alt="" /> </td>
                  <td>{request.requestReason}</td>
                  <td>{request.requestInfo}</td>
                  <td className="">
                    <button className="btn bg-green-600 text-white">
                      Approve
                    </button>
                    <button className="btn bg-red-600 text-white">
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
    );
};

export default AllCustomRequests;