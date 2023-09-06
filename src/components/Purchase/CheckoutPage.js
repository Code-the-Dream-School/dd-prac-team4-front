import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import style from './CheckoutPage.module.css';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51Nfj2pKnb0YvaiB3W0z31bbB7OPEnqem6wnpSbohudeiDkj1NUde9M5kgUwozzrfBqGqRpWU5ivDIInzWdt4q5zw00vMz7fc1c'
);
//Temporary variables for testing
//const paymentAmount = 1099; // This is $10.99 payment amount(added for testing) This amount variable should came from cart
const album = '64d2a94c793389a43fc5a8d6';
const quantity = 1;
const subtotal = 100.0;
const tax = 0.4;
const total = 140.0;

const CheckoutPage = (/*{ album, quantity, subtotal, tax, total}*/) => {
  const [clientSecret, setClientSecret] = useState('');
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Extract order data from navigation.state
    const { orderData } = history.location.state;
    if (orderData) {
      setOrderData(orderData);
      // Create PaymentIntent as soon as the page loads
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_PATH}/orders`,
            {
              orderItems: orderData.orderItems, // Use order data received from state
              subtotal: orderData.subtotal,
              tax: orderData.tax,
              total: orderData.total,
            },
            {
              withCredentials: true,
              headers: { 'Content-Type': 'application/json' },
            }
          );

          setClientSecret(response.data.clientSecret);
        } catch (error) {
          // Handle error here
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [setClientSecret]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div className={style['payment-form']}>
        {clientSecret && (
          <>
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm paymentAmount={subtotal} />
            </Elements>
          </>
        )}
      </div>
    </>
  );
};
export default CheckoutPage;
