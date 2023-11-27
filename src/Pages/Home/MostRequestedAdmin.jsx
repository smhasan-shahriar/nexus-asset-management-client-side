import React, { PureComponent } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useRole from '../../Hooks/useRole';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';

const MostRequestedAdmin = () => {
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
    const requestCount = {};
    requestList?.forEach(request => {
        const {assetName} = request;
        requestCount[assetName] = (requestCount[assetName] || 0) + 1;
        
    })
    const topMostRequests = Object.keys(requestCount).map(item => ({
        item,
        count: requestCount[item]
    }))
    topMostRequests.sort((a, b) => b.count - a.count)
    const mostRequests = topMostRequests.slice(0, 4)
    console.log(mostRequests)
    return (
        <div className='my-10'>
        <h1 className="text-5xl w-full flex justify-center items-center text-black py-10">
          Top Most Requested Items
        </h1>
        <div className="flex justify-center">
       
        <div className="md:w-[700px] w-[400px] overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Request Times</th>
              </tr>
            </thead>
            <tbody>
              {mostRequests?.map((asset, index) => (
                <tr className="font-semibold" key={index}>
                  <td>{asset.item}</td>
                  <td className="capitalize">{asset.count}</td>
                 
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

export default MostRequestedAdmin;