import React from 'react';

const PackageCard = ({pack, employeeNumber, price}) => {
    return (
        <div className='py-10 bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center items-center gap-10 text-white'>
            <h1 className='text-4xl font-black'>{pack}</h1>
            <p className='text-2xl'>Maximum Employees {employeeNumber}</p>
            <h2 className='font-bold text-4xl'>${price}/month</h2>
        </div>
    );
};

export default PackageCard;