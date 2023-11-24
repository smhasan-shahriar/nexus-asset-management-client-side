import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import useAuth from '../../Hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)


const Payment = () => {
    const {payment} = useAuth()
    const [paymentDue, setPaymentDue] = useState(5);
    useEffect(()=>{
        if(payment === "basic"){
            setPaymentDue(5)
        }
        if(payment === "standard"){
            setPaymentDue(8)
        }
        if(payment === "advanced"){
            setPaymentDue(10)
        }
    } ,[payment])
    return (
        <div>
            <h1 className='text-5xl w-full bg-black flex justify-center items-center text-white py-20'>Make Payment</h1>
            <p className='my-5 text-center font-bold text-xl'>Total Payable: ${paymentDue}</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm paymentDue={paymentDue}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;