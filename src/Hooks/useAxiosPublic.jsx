import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: 'https://some-domain.com/api/'
  });

const useAxiosPublic = () => {
    return instance;
};

export default useAxiosPublic;