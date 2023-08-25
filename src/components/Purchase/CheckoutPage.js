import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import style from './CheckoutPage.module.css';
import CheckoutForm from './CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51Nfj2pKnb0YvaiB3W0z31bbB7OPEnqem6wnpSbohudeiDkj1NUde9M5kgUwozzrfBqGqRpWU5ivDIInzWdt4q5zw00vMz7fc1c'
);
const paymentAmount = 1099; // This is $10.99 payment amount(added for testing) This amount variable should came from cart

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('http://localhost:8000/api/v1/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentAmount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [paymentAmount]);

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
              <CheckoutForm paymentAmount={paymentAmount} />
            </Elements>
          </>
        )}
      </div>
    </>
  );
};
export default CheckoutPage;
