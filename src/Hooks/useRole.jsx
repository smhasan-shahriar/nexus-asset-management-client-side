import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const axiosPublic = useAxiosPublic();
    const {user, loading} = useAuth();
    const {data: role, isPending: pending} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/checkuser?email=${user?.email}`)
            return res.data;
        }
    })
    
    return [role, pending]
    

};

export default useRole;