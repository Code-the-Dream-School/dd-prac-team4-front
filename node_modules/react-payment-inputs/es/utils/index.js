import { b as cardTypes } from './cardTypes-4f45f8d3.js';
import { a as validator } from './validator-0f41e23d.js';
import '../chunk-7eee66c0.js';
import { a as formatter } from './formatter-b0b2372d.js';

var BACKSPACE_KEY_CODE = 'Backspace';
var ENTER_KEY_CODE = 'Enter';
var isHighlighted = function isHighlighted() {
  return (window.getSelection() || {
    type: undefined
  }).type === 'Range';
};
var utils = {
  cardTypes: cardTypes,
  formatter: formatter,
  validator: validator,
  BACKSPACE_KEY_CODE: BACKSPACE_KEY_CODE,
  ENTER_KEY_CODE: ENTER_KEY_CODE,
  isHighlighted: isHighlighted
};

export default utils;
export { BACKSPACE_KEY_CODE, ENTER_KEY_CODE, isHighlighted };
