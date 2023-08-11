'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./utils/cardTypes-dfd289eb.js');
require('./utils/validator-664a905e.js');
var __chunk_1 = require('./chunk-a9f30d9c.js');
require('./utils/formatter-b9b5447d.js');
var index = require('./utils/index.js');
var React = _interopDefault(require('react'));

function usePaymentCard() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$autoFocus = _ref.autoFocus,
      autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus,
      errorMessages = _ref.errorMessages,
      onBlur = _ref.onBlur,
      onChange = _ref.onChange,
      onError = _ref.onError,
      onTouch = _ref.onTouch,
      cardNumberValidator = _ref.cardNumberValidator,
      cvcValidator = _ref.cvcValidator,
      expiryValidator = _ref.expiryValidator;

  var cardNumberField = React.useRef();
  var expiryDateField = React.useRef();
  var cvcField = React.useRef();
  var zipField = React.useRef();
  /** ====== START: META STUFF ====== */

  var _React$useState = React.useState({
    cardNumber: false,
    expiryDate: false,
    cvc: false,
    zip: false
  }),
      _React$useState2 = __chunk_1._slicedToArray(_React$useState, 2),
      touchedInputs = _React$useState2[0],
      setTouchedInputs = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = __chunk_1._slicedToArray(_React$useState3, 2),
      isTouched = _React$useState4[0],
      setIsTouched = _React$useState4[1];

  var _React$useState5 = React.useState({
    cardNumber: undefined,
    expiryDate: undefined,
    cvc: undefined,
    zip: undefined
  }),
      _React$useState6 = __chunk_1._slicedToArray(_React$useState5, 2),
      erroredInputs = _React$useState6[0],
      setErroredInputs = _React$useState6[1];

  var _React$useState7 = React.useState(),
      _React$useState8 = __chunk_1._slicedToArray(_React$useState7, 2),
      error = _React$useState8[0],
      setError = _React$useState8[1];

  var _React$useState9 = React.useState(),
      _React$useState10 = __chunk_1._slicedToArray(_React$useState9, 2),
      cardType = _React$useState10[0],
      setCardType = _React$useState10[1];

  var _React$useState11 = React.useState(),
      _React$useState12 = __chunk_1._slicedToArray(_React$useState11, 2),
      focused = _React$useState12[0],
      setFocused = _React$useState12[1];

  var setInputError = React.useCallback(function (input, error) {
    setErroredInputs(function (erroredInputs) {
      if (erroredInputs[input] === error) return erroredInputs;
      var newError = error;

      var newErroredInputs = __chunk_1._objectSpread({}, erroredInputs, __chunk_1._defineProperty({}, input, error));

      if (error) {
        setError(error);
      } else {
        newError = Object.values(newErroredInputs).find(Boolean);
        setError(newError);
      }

      onError && onError(newError, newErroredInputs);
      return newErroredInputs;
    });
  }, []); // eslint-disable-line

  var setInputTouched = React.useCallback(function (input, value) {
    requestAnimationFrame(function () {
      if (document.activeElement.tagName !== 'INPUT') {
        setIsTouched(true);
      } else if (value === false) {
        setIsTouched(false);
      }
    });
    setTouchedInputs(function (touchedInputs) {
      if (touchedInputs[input] === value) return touchedInputs;

      var newTouchedInputs = __chunk_1._objectSpread({}, touchedInputs, __chunk_1._defineProperty({}, input, value));

      onTouch && onTouch(__chunk_1._defineProperty({}, input, value), newTouchedInputs);
      return newTouchedInputs;
    });
  }, []); // eslint-disable-line

  /** ====== END: META STUFF ====== */

  /** ====== START: CARD NUMBER STUFF ====== */

  var handleBlurCardNumber = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onBlur && props.onBlur(e);
      onBlur && onBlur(e);
      setFocused(undefined);
      setInputTouched('cardNumber', true);
    };
  }, [onBlur, setInputTouched]);
  var handleChangeCardNumber = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      var formattedCardNumber = e.target.value || '';
      var cardNumber = formattedCardNumber.replace(/\s/g, '');
      var cursorPosition = cardNumberField.current.selectionStart;
      var cardType = index.default.cardTypes.getCardTypeByValue(cardNumber);
      setCardType(cardType);
      setInputTouched('cardNumber', false); // @ts-ignore

      cardNumberField.current.value = index.default.formatter.formatCardNumber(cardNumber);
      props.onChange && props.onChange(e);
      onChange && onChange(e); // Due to the card number formatting, the selection cursor will fall to the end of
      // the input field. Here, we want to reposition the cursor to the correct place.

      requestAnimationFrame(function () {
        if (document.activeElement !== cardNumberField.current) return;

        if (cardNumberField.current.value[cursorPosition - 1] === ' ') {
          cursorPosition = cursorPosition + 1;
        }

        cardNumberField.current.setSelectionRange(cursorPosition, cursorPosition);
      });
      var cardNumberError = index.default.validator.getCardNumberError(cardNumber, cardNumberValidator, {
        errorMessages: errorMessages
      });

      if (!cardNumberError && autoFocus) {
        expiryDateField.current && expiryDateField.current.focus();
      }

      setInputError('cardNumber', cardNumberError);
      props.onError && props.onError(cardNumberError);
    };
  }, [autoFocus, cardNumberValidator, errorMessages, onChange, setInputError, setInputTouched]);
  var handleFocusCardNumber = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onFocus && props.onFocus(e);
      setFocused('cardNumber');
    };
  }, []);
  var handleKeyPressCardNumber = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      var formattedCardNumber = e.target.value || '';
      var cardNumber = formattedCardNumber.replace(/\s/g, '');
      props.onKeyPress && props.onKeyPress(e);

      if (e.key !== index.default.ENTER_KEY_CODE) {
        if (!index.default.validator.isNumeric(e)) {
          e.preventDefault();
        }

        if (index.default.validator.hasCardNumberReachedMaxLength(cardNumber)) {
          e.preventDefault();
        }
      }
    };
  }, []);
  var getCardNumberProps = React.useCallback(function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var refKey = _ref2.refKey,
        props = __chunk_1._objectWithoutProperties(_ref2, ["refKey"]);

    return __chunk_1._objectSpread(__chunk_1._defineProperty({
      'aria-label': 'Card number',
      autoComplete: 'cc-number',
      id: 'cardNumber',
      name: 'cardNumber',
      placeholder: 'Card number',
      type: 'tel'
    }, refKey || 'ref', cardNumberField), props, {
      onBlur: handleBlurCardNumber(props),
      onChange: handleChangeCardNumber(props),
      onFocus: handleFocusCardNumber(props),
      onKeyPress: handleKeyPressCardNumber(props)
    });
  }, [handleBlurCardNumber, handleChangeCardNumber, handleFocusCardNumber, handleKeyPressCardNumber]);
  /** ====== END: CARD NUMBER STUFF ====== */

  /** ====== START: EXPIRY DATE STUFF ====== */

  var handleBlurExpiryDate = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onBlur && props.onBlur(e);
      onBlur && onBlur(e);
      setFocused(undefined);
      setInputTouched('expiryDate', true);
    };
  }, [onBlur, setInputTouched]);
  var handleChangeExpiryDate = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      setInputTouched('expiryDate', false);
      expiryDateField.current.value = index.default.formatter.formatExpiry(e);
      props.onChange && props.onChange(e);
      onChange && onChange(e);
      var expiryDateError = index.default.validator.getExpiryDateError(expiryDateField.current.value, expiryValidator, {
        errorMessages: errorMessages
      });

      if (!expiryDateError && autoFocus) {
        cvcField.current && cvcField.current.focus();
      }

      setInputError('expiryDate', expiryDateError);
      props.onError && props.onError(expiryDateError);
    };
  }, [autoFocus, errorMessages, expiryValidator, onChange, setInputError, setInputTouched]);
  var handleFocusExpiryDate = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onFocus && props.onFocus(e);
      setFocused('expiryDate');
    };
  }, []);
  var handleKeyDownExpiryDate = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onKeyDown && props.onKeyDown(e);

      if (e.key === index.default.BACKSPACE_KEY_CODE && !e.target.value && autoFocus) {
        cardNumberField.current && cardNumberField.current.focus();
      }
    };
  }, [autoFocus]);
  var handleKeyPressExpiryDate = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      var formattedExpiryDate = e.target.value || '';
      var expiryDate = formattedExpiryDate.replace(' / ', '');
      props.onKeyPress && props.onKeyPress(e);

      if (e.key !== index.default.ENTER_KEY_CODE) {
        if (!index.default.validator.isNumeric(e)) {
          e.preventDefault();
        }

        if (expiryDate.length >= 4) {
          e.preventDefault();
        }
      }
    };
  }, []);
  var getExpiryDateProps = React.useCallback(function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var refKey = _ref3.refKey,
        props = __chunk_1._objectWithoutProperties(_ref3, ["refKey"]);

    return __chunk_1._objectSpread(__chunk_1._defineProperty({
      'aria-label': 'Expiry date in format MM YY',
      autoComplete: 'cc-exp',
      id: 'expiryDate',
      name: 'expiryDate',
      placeholder: 'MM/YY',
      type: 'tel'
    }, refKey || 'ref', expiryDateField), props, {
      onBlur: handleBlurExpiryDate(props),
      onChange: handleChangeExpiryDate(props),
      onFocus: handleFocusExpiryDate(props),
      onKeyDown: handleKeyDownExpiryDate(props),
      onKeyPress: handleKeyPressExpiryDate(props)
    });
  }, [handleBlurExpiryDate, handleChangeExpiryDate, handleFocusExpiryDate, handleKeyDownExpiryDate, handleKeyPressExpiryDate]);
  /** ====== END: EXPIRY DATE STUFF ====== */

  /** ====== START: CVC STUFF ====== */

  var handleBlurCVC = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onBlur && props.onBlur(e);
      onBlur && onBlur(e);
      setFocused(undefined);
      setInputTouched('cvc', true);
    };
  }, [onBlur, setInputTouched]);
  var handleChangeCVC = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        cardType = _ref4.cardType;

    return function (e) {
      var cvc = e.target.value;
      setInputTouched('cvc', false);
      props.onChange && props.onChange(e);
      onChange && onChange(e);
      var cvcError = index.default.validator.getCVCError(cvc, cvcValidator, {
        cardType: cardType,
        errorMessages: errorMessages
      });

      if (!cvcError && autoFocus) {
        zipField.current && zipField.current.focus();
      }

      setInputError('cvc', cvcError);
      props.onError && props.onError(cvcError);
    };
  }, [autoFocus, cvcValidator, errorMessages, onChange, setInputError, setInputTouched]);
  var handleFocusCVC = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onFocus && props.onFocus(e);
      setFocused('cvc');
    };
  }, []);
  var handleKeyDownCVC = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onKeyDown && props.onKeyDown(e);

      if (e.key === index.default.BACKSPACE_KEY_CODE && !e.target.value && autoFocus) {
        expiryDateField.current && expiryDateField.current.focus();
      }
    };
  }, [autoFocus]);
  var handleKeyPressCVC = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        cardType = _ref5.cardType;

    return function (e) {
      var formattedCVC = e.target.value || '';
      var cvc = formattedCVC.replace(' / ', '');
      props.onKeyPress && props.onKeyPress(e);

      if (e.key !== index.default.ENTER_KEY_CODE) {
        if (!index.default.validator.isNumeric(e)) {
          e.preventDefault();
        }

        if (cardType && cvc.length >= cardType.code.length) {
          e.preventDefault();
        }

        if (cvc.length >= 4) {
          e.preventDefault();
        }
      }
    };
  }, []);
  var getCVCProps = React.useCallback(function () {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var refKey = _ref6.refKey,
        props = __chunk_1._objectWithoutProperties(_ref6, ["refKey"]);

    return __chunk_1._objectSpread(__chunk_1._defineProperty({
      'aria-label': 'CVC',
      autoComplete: 'cc-csc',
      id: 'cvc',
      name: 'cvc',
      placeholder: cardType ? cardType.code.name : 'CVC',
      type: 'tel'
    }, refKey || 'ref', cvcField), props, {
      onBlur: handleBlurCVC(props),
      onChange: handleChangeCVC(props, {
        cardType: cardType
      }),
      onFocus: handleFocusCVC(props),
      onKeyDown: handleKeyDownCVC(props),
      onKeyPress: handleKeyPressCVC(props, {
        cardType: cardType
      })
    });
  }, [cardType, handleBlurCVC, handleChangeCVC, handleFocusCVC, handleKeyDownCVC, handleKeyPressCVC]);
  /** ====== END: CVC STUFF ====== */

  /** ====== START: ZIP STUFF ====== */

  var handleBlurZIP = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onBlur && props.onBlur(e);
      onBlur && onBlur(e);
      setFocused(undefined);
      setInputTouched('zip', true);
    };
  }, [onBlur, setInputTouched]);
  var handleChangeZIP = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      var zip = e.target.value;
      setInputTouched('zip', false);
      props.onChange && props.onChange(e);
      onChange && onChange(e);
      var zipError = index.default.validator.getZIPError(zip, {
        errorMessages: errorMessages
      });
      setInputError('zip', zipError);
      props.onError && props.onError(zipError);
    };
  }, [errorMessages, onChange, setInputError, setInputTouched]);
  var handleFocusZIP = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onFocus && props.onFocus(e);
      setFocused('zip');
    };
  }, []);
  var handleKeyDownZIP = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onKeyDown && props.onKeyDown(e);

      if (e.key === index.default.BACKSPACE_KEY_CODE && !e.target.value && autoFocus) {
        cvcField.current && cvcField.current.focus();
      }
    };
  }, [autoFocus]);
  var handleKeyPressZIP = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (e) {
      props.onKeyPress && props.onKeyPress(e);

      if (e.key !== index.default.ENTER_KEY_CODE) {
        if (!index.default.validator.isNumeric(e)) {
          e.preventDefault();
        }
      }
    };
  }, []);
  var getZIPProps = React.useCallback(function () {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var refKey = _ref7.refKey,
        props = __chunk_1._objectWithoutProperties(_ref7, ["refKey"]);

    return __chunk_1._objectSpread(__chunk_1._defineProperty({
      autoComplete: 'off',
      id: 'zip',
      maxLength: '6',
      name: 'zip',
      placeholder: 'ZIP',
      type: 'tel'
    }, refKey || 'ref', zipField), props, {
      onBlur: handleBlurZIP(props),
      onChange: handleChangeZIP(props),
      onFocus: handleFocusZIP(props),
      onKeyDown: handleKeyDownZIP(props),
      onKeyPress: handleKeyPressZIP(props)
    });
  }, [handleBlurZIP, handleChangeZIP, handleFocusZIP, handleKeyDownZIP, handleKeyPressZIP]);
  /** ====== END: ZIP STUFF ====== */

  /** ====== START: CARD IMAGE STUFF ====== */

  var getCardImageProps = React.useCallback(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var images = props.images || {};
    return __chunk_1._objectSpread({
      'aria-label': cardType ? cardType.displayName : 'Placeholder card',
      children: images[cardType ? cardType.type : 'placeholder'] || images.placeholder,
      width: '1.5em',
      height: '1em',
      viewBox: '0 0 24 16'
    }, props);
  }, [cardType]);
  /** ====== END: CARD IMAGE STUFF ====== */
  // Set default field errors

  React.useLayoutEffect(function () {
    if (zipField.current) {
      var zipError = index.default.validator.getZIPError(zipField.current.value, {
        errorMessages: errorMessages
      });
      setInputError('zip', zipError);
    }

    if (cvcField.current) {
      var cvcError = index.default.validator.getCVCError(cvcField.current.value, cvcValidator, {
        errorMessages: errorMessages
      });
      setInputError('cvc', cvcError);
    }

    if (expiryDateField.current) {
      var expiryDateError = index.default.validator.getExpiryDateError(expiryDateField.current.value, expiryValidator, {
        errorMessages: errorMessages
      });
      setInputError('expiryDate', expiryDateError);
    }

    if (cardNumberField.current) {
      var cardNumberError = index.default.validator.getCardNumberError(cardNumberField.current.value, cardNumberValidator, {
        errorMessages: errorMessages
      });
      setInputError('cardNumber', cardNumberError);
    }
  }, [cardNumberValidator, cvcValidator, errorMessages, expiryValidator, setInputError]); // Format default values

  React.useLayoutEffect(function () {
    if (cardNumberField.current) {
      cardNumberField.current.value = index.default.formatter.formatCardNumber(cardNumberField.current.value);
    }

    if (expiryDateField.current) {
      expiryDateField.current.value = index.default.formatter.formatExpiry({
        target: expiryDateField.current
      });
    }
  }, []); // Set default card type

  React.useLayoutEffect(function () {
    if (cardNumberField.current) {
      var _cardType = index.default.cardTypes.getCardTypeByValue(cardNumberField.current.value);

      setCardType(_cardType);
    }
  }, []);
  return {
    getCardImageProps: getCardImageProps,
    getCardNumberProps: getCardNumberProps,
    getExpiryDateProps: getExpiryDateProps,
    getCVCProps: getCVCProps,
    getZIPProps: getZIPProps,
    wrapperProps: {
      error: error,
      focused: focused,
      isTouched: isTouched
    },
    meta: {
      cardType: cardType,
      erroredInputs: erroredInputs,
      error: error,
      focused: focused,
      isTouched: isTouched,
      touchedInputs: touchedInputs
    }
  };
}

exports.default = usePaymentCard;
