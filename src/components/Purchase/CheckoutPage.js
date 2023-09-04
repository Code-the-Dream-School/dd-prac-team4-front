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
const album = '64f0ea30375f230a5e1832bb';
const quantity = 5;
const subtotal = 500.0;
const tax = 0.15;
const total = 550.0;

const CheckoutPage = (/*{ album, quantity, subtotal, tax, total}*/) => {
  const [clientSecret, setClientSecret] = useState('');
  const [order, setOrder] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_PATH}/orders`,
          {
            orderItems: [{ album, quantity }],
            subtotal,
            tax,
            total,
          },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        );

        setClientSecret(response.data.clientSecret);
        setOrder(response.data.order);
      } catch (error) {
        // Handle error here
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [subtotal, album, quantity, tax, total, setClientSecret]);

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
              <CheckoutForm paymentAmount={subtotal} order={order} />
            </Elements>
          </>
        )}
      </div>
    </>
  );
};
export default CheckoutPage;
