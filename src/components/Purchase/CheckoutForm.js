import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import style from './CheckoutForm.module.css';

export default function CheckoutForm({ paymentAmount, order, orderId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [_email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStripeLoaded, setIsStripeLoaded] = useState(false);
  useEffect(() => {
    if (!stripe) {
      return;
    }
    // Stripe.js has loaded
    setIsStripeLoaded(true);
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStripeLoaded || !stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/completed?orderId=${orderId}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, customer will be redirected to
    // `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className={style.checkoutFormContainer}
    >
      <p>
        Your payment amount: <b>${paymentAmount}</b>
      </p>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={!isStripeLoaded || isLoading || !stripe || !elements}
        id="submit"
        className={style['payment-btn']}
      >
        <span id="button-text">
          {isLoading ? (
            <div className={style.spinner} id="spinner"></div>
          ) : (
            'Submit Payment'
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
