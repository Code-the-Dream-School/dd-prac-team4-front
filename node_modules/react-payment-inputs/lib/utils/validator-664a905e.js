'use strict';

var cardTypes = require('./cardTypes-dfd289eb.js');

var MONTH_REGEX = /(0[1-9]|1[0-2])/;
var EMPTY_CARD_NUMBER = 'Enter a card number';
var EMPTY_EXPIRY_DATE = 'Enter an expiry date';
var EMPTY_CVC = 'Enter a CVC';
var EMPTY_ZIP = 'Enter a ZIP code';
var INVALID_CARD_NUMBER = 'Card number is invalid';
var INVALID_EXPIRY_DATE = 'Expiry date is invalid';
var INVALID_CVC = 'CVC is invalid';
var MONTH_OUT_OF_RANGE = 'Expiry month must be between 01 and 12';
var YEAR_OUT_OF_RANGE = 'Expiry year cannot be in the past';
var DATE_OUT_OF_RANGE = 'Expiry date cannot be in the past';
var hasCardNumberReachedMaxLength = function hasCardNumberReachedMaxLength(currentValue) {
  var cardType = cardTypes.getCardTypeByValue(currentValue);
  return cardType && currentValue.length >= cardType.lengths[cardType.lengths.length - 1];
};
var isNumeric = function isNumeric(e) {
  return /^\d*$/.test(e.key);
};
var validateLuhn = function validateLuhn(cardNumber) {
  return cardNumber.split('').reverse().map(function (digit) {
    return parseInt(digit, 10);
  }).map(function (digit, idx) {
    return idx % 2 ? digit * 2 : digit;
  }).map(function (digit) {
    return digit > 9 ? digit % 10 + 1 : digit;
  }).reduce(function (accum, digit) {
    return accum += digit;
  }) % 10 === 0;
};
var getCardNumberError = function getCardNumberError(cardNumber, cardNumberValidator) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$errorMessages = _ref.errorMessages,
      errorMessages = _ref$errorMessages === void 0 ? {} : _ref$errorMessages;

  if (!cardNumber) {
    return errorMessages.emptyCardNumber || EMPTY_CARD_NUMBER;
  }

  var rawCardNumber = cardNumber.replace(/\s/g, '');
  var cardType = cardTypes.getCardTypeByValue(rawCardNumber);

  if (cardType && cardType.lengths) {
    var doesCardNumberMatchLength = cardType.lengths.includes(rawCardNumber.length);

    if (doesCardNumberMatchLength) {
      var isLuhnValid = validateLuhn(rawCardNumber);

      if (isLuhnValid) {
        if (cardNumberValidator) {
          return cardNumberValidator({
            cardNumber: rawCardNumber,
            cardType: cardType,
            errorMessages: errorMessages
          });
        }

        return;
      }
    }
  }

  return errorMessages.invalidCardNumber || INVALID_CARD_NUMBER;
};
var getExpiryDateError = function getExpiryDateError(expiryDate, expiryValidator) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$errorMessages = _ref2.errorMessages,
      errorMessages = _ref2$errorMessages === void 0 ? {} : _ref2$errorMessages;

  if (!expiryDate) {
    return errorMessages.emptyExpiryDate || EMPTY_EXPIRY_DATE;
  }

  var rawExpiryDate = expiryDate.replace(' / ', '').replace('/', '');

  if (rawExpiryDate.length === 4) {
    var month = rawExpiryDate.slice(0, 2);
    var year = "20".concat(rawExpiryDate.slice(2, 4));

    if (!MONTH_REGEX.test(month)) {
      return errorMessages.monthOutOfRange || MONTH_OUT_OF_RANGE;
    }

    if (parseInt(year) < new Date().getFullYear()) {
      return errorMessages.yearOutOfRange || YEAR_OUT_OF_RANGE;
    }

    if (parseInt(year) === new Date().getFullYear() && parseInt(month) < new Date().getMonth() + 1) {
      return errorMessages.dateOutOfRange || DATE_OUT_OF_RANGE;
    }

    if (expiryValidator) {
      return expiryValidator({
        expiryDate: {
          month: month,
          year: year
        },
        errorMessages: errorMessages
      });
    }

    return;
  }

  return errorMessages.invalidExpiryDate || INVALID_EXPIRY_DATE;
};
var getCVCError = function getCVCError(cvc, cvcValidator) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      cardType = _ref3.cardType,
      _ref3$errorMessages = _ref3.errorMessages,
      errorMessages = _ref3$errorMessages === void 0 ? {} : _ref3$errorMessages;

  if (!cvc) {
    return errorMessages.emptyCVC || EMPTY_CVC;
  }

  if (cvc.length < 3) {
    return errorMessages.invalidCVC || INVALID_CVC;
  }

  if (cardType && cvc.length !== cardType.code.length) {
    return errorMessages.invalidCVC || INVALID_CVC;
  }

  if (cvcValidator) {
    return cvcValidator({
      cvc: cvc,
      cardType: cardType,
      errorMessages: errorMessages
    });
  }

  return;
};
var getZIPError = function getZIPError(zip) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref4$errorMessages = _ref4.errorMessages,
      errorMessages = _ref4$errorMessages === void 0 ? {} : _ref4$errorMessages;

  if (!zip) {
    return errorMessages.emptyZIP || EMPTY_ZIP;
  }

  return;
};

var validator = /*#__PURE__*/Object.freeze({
  EMPTY_CARD_NUMBER: EMPTY_CARD_NUMBER,
  EMPTY_EXPIRY_DATE: EMPTY_EXPIRY_DATE,
  EMPTY_CVC: EMPTY_CVC,
  EMPTY_ZIP: EMPTY_ZIP,
  INVALID_CARD_NUMBER: INVALID_CARD_NUMBER,
  INVALID_EXPIRY_DATE: INVALID_EXPIRY_DATE,
  INVALID_CVC: INVALID_CVC,
  MONTH_OUT_OF_RANGE: MONTH_OUT_OF_RANGE,
  YEAR_OUT_OF_RANGE: YEAR_OUT_OF_RANGE,
  DATE_OUT_OF_RANGE: DATE_OUT_OF_RANGE,
  hasCardNumberReachedMaxLength: hasCardNumberReachedMaxLength,
  isNumeric: isNumeric,
  validateLuhn: validateLuhn,
  getCardNumberError: getCardNumberError,
  getExpiryDateError: getExpiryDateError,
  getCVCError: getCVCError,
  getZIPError: getZIPError
});

exports.DATE_OUT_OF_RANGE = DATE_OUT_OF_RANGE;
exports.EMPTY_CARD_NUMBER = EMPTY_CARD_NUMBER;
exports.EMPTY_CVC = EMPTY_CVC;
exports.EMPTY_EXPIRY_DATE = EMPTY_EXPIRY_DATE;
exports.EMPTY_ZIP = EMPTY_ZIP;
exports.INVALID_CARD_NUMBER = INVALID_CARD_NUMBER;
exports.INVALID_CVC = INVALID_CVC;
exports.INVALID_EXPIRY_DATE = INVALID_EXPIRY_DATE;
exports.MONTH_OUT_OF_RANGE = MONTH_OUT_OF_RANGE;
exports.YEAR_OUT_OF_RANGE = YEAR_OUT_OF_RANGE;
exports.getCVCError = getCVCError;
exports.getCardNumberError = getCardNumberError;
exports.getExpiryDateError = getExpiryDateError;
exports.getZIPError = getZIPError;
exports.hasCardNumberReachedMaxLength = hasCardNumberReachedMaxLength;
exports.isNumeric = isNumeric;
exports.validateLuhn = validateLuhn;
exports.validator = validator;
