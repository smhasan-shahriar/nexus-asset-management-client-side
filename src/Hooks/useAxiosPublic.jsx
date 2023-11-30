import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: 'https://asset-management-system-server.vercel.app'
  });

const useAxiosPublic = () => {
    return instance;
};
// http://localhost:5000/
export default useAxiosPublic;