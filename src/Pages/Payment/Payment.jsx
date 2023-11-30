import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import useAuth from '../../Hooks/useAuth';
import { Helmet } from 'react-helmet';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)


const Payment = () => {
    const {payment} = useAuth()
    const [paymentDue, setPaymentDue] = useState(5);
    const [memberLimit, setMemberLimit] = useState(0);
    useEffect(()=>{
        if(payment === "basic"){
            setPaymentDue(5);
            setMemberLimit(5);
        }
        if(payment === "standard"){
            setPaymentDue(8);
            setMemberLimit(10);
        }
        if(payment === "advanced"){
            setPaymentDue(15)
            setMemberLimit(20);
        }
    } ,[])
    return (
        <div>
             <Helmet>
        <title>Nexus | Make Payment</title>
      </Helmet>
            <h1 className='text-5xl w-full bg-black flex justify-center items-center text-white py-20'>Make Payment</h1>
            <p className='my-5 text-center font-bold text-xl'>Total Payable: ${paymentDue}</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm paymentDue={paymentDue} memberLimit={memberLimit}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;