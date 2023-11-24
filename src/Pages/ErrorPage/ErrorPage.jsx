import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='min-h-screen bg-gradient-to-r from-indigo-200 via-red-300 to-yellow-200 flex justify-center items-center flex-col'>
            <h2 className='font-black text-8xl'>404</h2>
            <h3 className='font-bold text-4xl mt-10 mb-2'>PAGE NOT FOUND</h3>
            <p>The page you are looking for is not available right now</p>
            <Link to="/" className='btn btn-outline my-5'> Go to Homepage</Link>
        </div>
    );
};

export default ErrorPage;