import React from 'react';
import SectionCustomRequests from './SectionCustomRequests';
import SectionPendingRequests from './SectionPendingRequests';
import useRole from '../../Hooks/useRole';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import SectionMonthlyRequests from './SectionMonthlyRequests';
import FrequentlyRequested from './FrequentlyRequested';

const HomeUser = () => {
    const [currentUser, pending] = useRole();
    const axiosPublic = useAxiosPublic();
    const getMyAssets = async () => {
        const response = await axiosPublic.get(
          `/allrequests?emailSearch=${currentUser?.email}`
        );
        return response.data.singleResult;
      };
      const { data: myAssetList, refetch: myAssetListRefetch } = useQuery({
        queryKey: ["myAssets", currentUser],
        enabled: !pending,
        queryFn: getMyAssets,
      });

    return (
        <div>
            <SectionCustomRequests></SectionCustomRequests>
            <SectionPendingRequests requests={myAssetList}></SectionPendingRequests>
            <SectionMonthlyRequests requests={myAssetList}></SectionMonthlyRequests>
            <FrequentlyRequested></FrequentlyRequested>
        </div>
    );
};

export default HomeUser;