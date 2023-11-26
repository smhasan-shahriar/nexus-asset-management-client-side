import React from 'react';
import useRole from '../../Hooks/useRole';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import CustomRequestCard from './CustomRequestCard';

const SectionCustomRequests = () => {
    const [currentUser, pending] = useRole();
    const axiosPublic = useAxiosPublic()
    const getRequests = async () => {
        const response = await axiosPublic.get(
          `/allcustomrequests?emailSearch=${currentUser?.email}`
        );
        return response.data.singleResult;
      };
    
      const { data: customRequestList, refetch: customRequestListRefetch } = useQuery({
        queryKey: ["allCustomRequests"],
        enabled: !pending,
        queryFn: getRequests,
      });
    return (
        <div>
            <h1 className="text-5xl w-full flex justify-center items-center text-black py-10">
        My Custom Requests
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 my-10'>
       { customRequestList?.map(item => <CustomRequestCard key={item._id} data={item}></CustomRequestCard> )}
      </div>
        </div>
    );
};

export default SectionCustomRequests;