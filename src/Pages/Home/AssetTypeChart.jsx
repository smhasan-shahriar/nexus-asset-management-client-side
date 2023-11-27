import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useRole from '../../Hooks/useRole';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const AssetTypeChart = () => {
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
        const {assetType} = request;
        requestCount[assetType] = (requestCount[assetType] || 0) + 1;
        
    })
    const topMostRequests = Object.keys(requestCount).map(name => ({
        name,
        value: requestCount[name]
    }))

    console.log(topMostRequests)
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
    return (
        <div className='my-10'>
        <h1 className="text-5xl text-center w-full flex justify-center items-center text-black py-10">
          Returnable Items vs Non-returnable items in request
        </h1>
        <div className="flex justify-center">
        <PieChart width={400} height={400}>
          
          <Pie
            data={topMostRequests}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
          
            {topMostRequests.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
        
   
        </div>
      </div>
    );
};

export default AssetTypeChart;