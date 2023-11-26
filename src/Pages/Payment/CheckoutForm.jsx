import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";


const CheckoutForm = ({paymentDue, memberLimit}) => {
    const [error, setError] = useState('');
    const {user, payment} = useAuth()
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()

    const totalPrice = paymentDue;

    useEffect(()=> {
        axiosPublic.post('/create-payment-intent', {price: totalPrice})
        .then(res => {
            setClientSecret(res.data.clientSecret)
        })
    },[totalPrice, axiosPublic])


    const handleSubmit = async e => {
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log('payment error', error);
      setError(error.message);
  }
  else {
      console.log('payment method', paymentMethod)
      setError('');
  }
  const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
        card: card,
        billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
        }
    }
})

if (confirmError) {
    console.log(confirmError)
}


    else{
      console.log('payment intent', paymentIntent)
      if(paymentIntent.status === 'succeeded'){
        
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date()
        }
        const updatedUser = {
          
          
          employeeLimit : memberLimit}
        axiosPublic.put(`/adminusers/${user?.email}`, updatedUser)
        .then(res => {
          if(res.data.modifiedCount > 0){
            toast(`Payment Successful. your transact id ${paymentIntent.id}`)
            navigate('/')
          }
        })
        
        }
      }
    }

   

  return (
    <div className="my-20">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <CardElement className="border-2 p-4"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className=" btn btn-primary my-4 max-w-[100px] mx-auto px-10"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600"></p>
        {transactionId && <p className="text-green-500">Your transaction id: {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
