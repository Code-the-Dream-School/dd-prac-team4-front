import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import StyledBackButton from '../layout/BackButton/StyledBackButton';

const PaymentStatus = ({ clientSecret, updateStatus }) => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null); // New state for success status

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // Inspect the PaymentIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      console.log('paymentIntent: ', paymentIntent);
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Success! Payment received.');
          setIsSuccess(true);
          break;

        case 'processing':
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          setIsSuccess(false);
          break;

        case 'requires_payment_method':
          setMessage('Payment failed. Please try again.');
          setIsSuccess(false);
          break;

        default:
          setMessage('Something went wrong.');
          setIsSuccess(false);
          break;
      }
    });
  }, [stripe, clientSecret]);

  useEffect(() => {
    updateStatus(isSuccess);
  }, [updateStatus, isSuccess]);

  return (
    <>
      <div>
        {isSuccess === true ? (
          message
        ) : (
          <>
            {message}
            {/* Renders a custom StyledBackButton component with a link to the payment page, 
            styled by default with a className "link-color" color, and text "Go to payment page" 
            which passed to the component as a child */}
            <StyledBackButton
              linkName={'/checkout'}
              className={'link-color'}
              children
            >
              <span>Go to payment page</span>
            </StyledBackButton>
          </>
        )}
      </div>
    </>
  );
};
export default PaymentStatus;
