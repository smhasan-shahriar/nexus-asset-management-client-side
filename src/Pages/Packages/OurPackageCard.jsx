import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const OurPackageCard = ({pack, employeeNumber, price}) => {
    const {payment, updatePayment} = useAuth()
    const navigate = useNavigate()
    const handlePurchase = () => {
        updatePayment(pack);
        navigate('/payment')
    }
    return (
        <div className='py-10 bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center items-center gap-10 text-white'>
            <h1 className='text-4xl font-black'>{pack}</h1>
            <p className='text-2xl'>Maximum Employees {employeeNumber}</p>
            <h2 className='font-bold text-4xl'>${price}/month</h2>
            <button onClick={handlePurchase} className='btn'>Buy Pack</button>
        </div>
    );
};

export default OurPackageCard;