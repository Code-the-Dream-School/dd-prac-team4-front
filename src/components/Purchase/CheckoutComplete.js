import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, Box } from '@mui/material';
import style from './CheckoutComplete.module.css';
import { useSearchParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import axiosInstance from '../../apis/axiosClient';
import CheckoutMessageCard from './CheckoutMessageCard';

const ordersEndpoint = '/orders';

const CheckoutComplete = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const clientSecret = searchParams.get('payment_intent_client_secret');
  const orderId = searchParams.get('orderId');

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderData, setOrderData] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

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
        console.log(response.data?.order);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(
          `An error occurred during loading order details with id ${id}. ${error.message}. ${error.request.responseText}.`
        );
      }
    };
    orderDetails(orderId);
  }, [clientSecret]);

  // Calculate the total number of items purchased
  let totalItemsPurchased = 0;
  if (orderData && orderData.orderItems) {
    orderData.orderItems.forEach((item) => {
      totalItemsPurchased += item.quantity;
    });
  }

  return (
    <>
      <Container className={style.mainContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CheckoutMessageCard
              isLoading={isLoading}
              clientSecret={clientSecret}
              totalItemsPurchased={totalItemsPurchased}
              updateStatus={updatePaymentStatus}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper className={`${style.paper} ${style.rightPaper}`}>
              {!isPaymentSuccessful && (
                <Typography variant="h6">
                  Payment was unsuccessful! Sorry for the inconvenience.
                </Typography>
              )}

              {isPaymentSuccessful && (
                <>
                  {isLoading && <Loader className="small-spinner" />}
                  {!isLoading && errorMessage && (
                    <>
                      <Box mt="2rem">
                        <Typography variant="h5" style={{ color: 'red' }}>
                          {errorMessage}
                        </Typography>{' '}
                      </Box>
                    </>
                  )}
                  {!isLoading && !errorMessage && (
                    <>
                      <Box mt="2rem">
                        <Typography variant="h4">Order Details:</Typography>
                      </Box>
                      <Box mt="2rem">
                        <Typography variant="h6">
                          Order ID: {orderData._id}
                        </Typography>
                        {orderData.orderItems.map((item, index) => (
                          <div key={index}>
                            <Typography>Album ID: {item.album}</Typography>
                            <Typography>Quantity: {item.quantity}</Typography>
                          </div>
                        ))}
                      </Box>
                      <Box mt="2rem">
                        <Typography>Subtotal: ${orderData.subtotal}</Typography>
                        <Typography>Tax: {orderData.tax}</Typography>
                        <Typography variant="h6">
                          Total: ${orderData.total}
                        </Typography>
                      </Box>
                    </>
                  )}
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default CheckoutComplete;
