import './utils/cardTypes-4f45f8d3.js';
import './utils/validator-0f41e23d.js';
import './chunk-7eee66c0.js';
import './utils/formatter-b0b2372d.js';
import './utils/index.js';
import 'react';
import usePaymentCard from './usePaymentInputs.js';

function PaymentInputsContainer(props) {
  var paymentInputs = usePaymentCard(props);
  return props.children(paymentInputs);
}

export default PaymentInputsContainer;
