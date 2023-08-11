'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./utils/cardTypes-dfd289eb.js');
require('./utils/validator-664a905e.js');
require('./chunk-a9f30d9c.js');
require('./utils/formatter-b9b5447d.js');
require('./utils/index.js');
require('react');
var usePaymentInputs = require('./usePaymentInputs.js');

function PaymentInputsContainer(props) {
  var paymentInputs = usePaymentInputs.default(props);
  return props.children(paymentInputs);
}

exports.default = PaymentInputsContainer;
