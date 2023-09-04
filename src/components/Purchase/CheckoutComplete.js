import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { Container, Paper, Typography, Grid, Box } from '@mui/material';
import NavigateButton from '../layout/NavigateButton/NavigateButton';
import style from './CheckoutComplete.module.css';
import PaymentStatus from './PaymentStatus';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import axiosInstance from '../../apis/axiosClient';
import { useAuth } from '@akosasante/react-auth-context';

const stripePromise = loadStripe(
  'pk_test_51Nfj2pKnb0YvaiB3W0z31bbB7OPEnqem6wnpSbohudeiDkj1NUde9M5kgUwozzrfBqGqRpWU5ivDIInzWdt4q5zw00vMz7fc1c'
);

const ordersEndpoint = '/orders';

const CheckoutComplete = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const clientSecret = searchParams.get('payment_intent_client_secret');
  const orderId = searchParams.get('orderId');

  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderData, setOrderData] = useState(null);

  const { user } = useAuth();
  const userEmail = user.user.email;

  // Callback function to update isPaymentSuccessful
  const updatePaymentStatus = (isSuccess) => {
    setIsPaymentSuccessful(isSuccess);
  };

  useEffect(() => {
    const orderDetails = async (id) => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const response = await axiosInstance.get(`${ordersEndpoint}/${id}`);
        setIsLoading(false);
        setOrderData(response.data?.order);
        console.log(JSON.stringify(response.data?.order));
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(
          `An error occurred during loading order details with id ${id}`
        );
      }
    };
    orderDetails(orderId);
  }, [clientSecret]);

  return (
    <>
      <Container className={style.mainContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
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
              {isPaymentSuccessful ? (
                <>
                  {isLoading ? (
                    <Loader className="small-spinner" />
                  ) : errorMessage !== '' ? (
                    <>
                      <Box mt="2rem">
                        <Typography variant="h8">
                          {`Your order of ${1} albums has been completed.`}
                          <br />
                          {`A confirmation email was sent to ${userEmail}`}
                        </Typography>
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
                    <Typography variant="h6">{errorMessage}</Typography>
                  )}
                </>
              ) : null}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper className={`${style.paper} ${style.rightPaper}`}>
              {isPaymentSuccessful ? (
                <>
                  {isLoading ? (
                    <Loader className="small-spinner" />
                  ) : errorMessage !== '' ? (
                    <>
                      <Typography variant="h6">Order Details:</Typography>
                      {/* --------- */}
                      <Typography variant="h6">
                        Order ID: {orderData._id}
                      </Typography>
                      <Typography>Amount: ${orderData.total}</Typography>
                      {/* ---------- */}
                    </>
                  ) : (
                    <Typography variant="h6">{errorMessage}</Typography> // Other order data fields can be added here
                  )}
                </>
              ) : (
                <Typography variant="h6">
                  Payment was unsuccessful! Sorry for the inconvenience.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default CheckoutComplete;
