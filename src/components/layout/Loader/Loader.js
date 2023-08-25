import React from 'react';
import styled from 'styled-components';
import spinnerSvg from '../../../images/loader.svg';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &.small-spinner {
    transform: scale(0.5);
  }
  }
`;
//This is functional styled 'Loader' component that displays a spinner with optional size variations
//based on the given class name.
const StyledSpinner = ({ className }) => (
  <SpinnerWrapper className={className}>
    <img src={spinnerSvg} alt="spinner" />
  </SpinnerWrapper>
);

export default StyledSpinner;
