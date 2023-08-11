import { a as getCardTypeByValue } from './cardTypes-4f45f8d3.js';
import { a as _toArray, b as _slicedToArray } from '../chunk-7eee66c0.js';

var formatCardNumber = function formatCardNumber(cardNumber) {
  var cardType = getCardTypeByValue(cardNumber);
  if (!cardType) return (cardNumber.match(/\d+/g) || []).join('');
  var format = cardType.format;

  if (format && format.global) {
    return (cardNumber.match(format) || []).join(' ');
  }

  if (format) {
    var execResult = format.exec(cardNumber.split(' ').join(''));

    if (execResult) {
      return execResult.splice(1, 3).filter(function (x) {
        return x;
      }).join(' ');
    }
  }

  return cardNumber;
};
var formatExpiry = function formatExpiry(event) {
  var eventData = event.nativeEvent && event.nativeEvent.data;
  var prevExpiry = event.target.value.split(' / ').join('/');
  if (!prevExpiry) return null;
  var expiry = prevExpiry;

  if (/^[2-9]$/.test(expiry)) {
    expiry = "0".concat(expiry);
  }

  if (prevExpiry.length === 2 && +prevExpiry > 12) {
    var _prevExpiry$split = prevExpiry.split(''),
        _prevExpiry$split2 = _toArray(_prevExpiry$split),
        head = _prevExpiry$split2[0],
        tail = _prevExpiry$split2.slice(1);

    expiry = "0".concat(head, "/").concat(tail.join(''));
  }

  if (/^1[/-]$/.test(expiry)) {
    return "01 / ";
  }

  expiry = expiry.match(/(\d{1,2})/g) || [];

  if (expiry.length === 1) {
    if (!eventData && prevExpiry.includes('/')) {
      return expiry[0];
    }

    if (/\d{2}/.test(expiry)) {
      return "".concat(expiry[0], " / ");
    }
  }

  if (expiry.length > 2) {
    var _ref = expiry.join('').match(/^(\d{2}).*(\d{2})$/) || [],
        _ref2 = _slicedToArray(_ref, 3),
        _ref2$ = _ref2[1],
        month = _ref2$ === void 0 ? null : _ref2$,
        _ref2$2 = _ref2[2],
        year = _ref2$2 === void 0 ? null : _ref2$2;

    return [month, year].join(' / ');
  }

  return expiry.join(' / ');
};

var formatter = /*#__PURE__*/Object.freeze({
  formatCardNumber: formatCardNumber,
  formatExpiry: formatExpiry
});

export { formatter as a, formatCardNumber as b, formatExpiry as c };
