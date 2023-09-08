import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import Loader from '../layout/Loader/Loader';
import { Elements } from '@stripe/react-stripe-js';
import NavigateButton from '../layout/NavigateButton/NavigateButton';
import PaymentStatus from './PaymentStatus';
import { useAuth } from '@akosasante/react-auth-context';
import style from './CheckoutMessageCard.module.css';

const stripePromise = loadStripe(
  'pk_test_51Nfj2pKnb0YvaiB3W0z31bbB7OPEnqem6wnpSbohudeiDkj1NUde9M5kgUwozzrfBqGqRpWU5ivDIInzWdt4q5zw00vMz7fc1c'
);

const CheckoutMessageCard = ({
  isLoading = { isLoading },
  clientSecret,
  totalItemsPurchased,
  updateStatus,
}) => {
  const { user } = useAuth();
  const userEmail = user.user.email;
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(null);

  // Callback function to update isPaymentSuccessful
  const updatePaymentStatus = (isSuccess) => {
    if (isSuccess !== null) {
      setIsPaymentSuccessful(isSuccess);
    }
  };

  useEffect(() => {
    if (isPaymentSuccessful !== null) {
      updateStatus(isPaymentSuccessful);
    }
  }, [updateStatus, isPaymentSuccessful]);

  return (
    <>
      <Paper className={`${style.paper} ${style.leftPaper}`}>
        <Box mt="1rem">
          <Typography variant="h4">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentStatus
                clientSecret={clientSecret}
                updateStatus={updatePaymentStatus}
              />
            </Elements>
          </Typography>
        </Box>
        {isLoading ? (
          <Loader className="small-spinner" />
        ) : isPaymentSuccessful ? (
          <>
            <Box mt="2rem">
              {totalItemsPurchased > 0 ? (
                <Typography variant="h8">
                  {`Your order of ${totalItemsPurchased} ${
                    totalItemsPurchased === 1 ? 'album' : 'albums'
                  } has been completed.`}
                  <br />
                  {`A confirmation email was sent to ${userEmail}`}
                </Typography>
              ) : (
                <Typography variant="h8">
                  Sorry. Something went wrong. We can't display order details.
                </Typography>
              )}
            </Box>
            <Box mt="2rem">
              <NavigateButton
                linkName={'/'}
                variant={'contained'}
                color={'secondary'}
                children={'Return to Marketplace'}
                fullWidth
              />
            </Box>
          </>
        ) : (
          <Typography></Typography>
        )}
      </Paper>
    </>
  );
};
export default CheckoutMessageCard;
