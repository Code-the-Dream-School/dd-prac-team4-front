import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import style from './CheckoutPage.module.css';
import CheckoutForm from './CheckoutForm';
import axiosInstance from '../../apis/axiosClient';
import { useLocation } from 'react-router-dom';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51Nfj2pKnb0YvaiB3W0z31bbB7OPEnqem6wnpSbohudeiDkj1NUde9M5kgUwozzrfBqGqRpWU5ivDIInzWdt4q5zw00vMz7fc1c'
);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');

  const [orderId, setOrderId] = useState(null);
  const location = useLocation();
  // Extract order data from navigation.state
  const { orderData } = location.state || {};

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(`/orders`, {
          orderItems: orderData.orderItems, // Use order data received from state
          subtotal: orderData.subtotal,
          tax: orderData.tax,
          total: orderData.total,
        });
        setOrderId(response.data.order._id);
        setClientSecret(response.data.clientSecret);
        return response.data.clientSecret;
      } catch (error) {
        // Handle error here
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [
    location.state,
    orderData.orderItems,
    orderData.subtotal,
    orderData.tax,
    orderData.total,
  ]);

  console.log('Order data ' + JSON.stringify(orderData));
  console.log('client secret ' + clientSecret);

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
        {clientSecret && orderId !== null && (
          <>
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm paymentAmount={orderData.total} orderId={orderId} />
            </Elements>
          </>
        )}
      </div>
    </>
  );
};
export default CheckoutPage;
