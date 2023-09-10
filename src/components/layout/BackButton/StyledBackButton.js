import React from 'react';
import styled from 'styled-components';
import BackButtonSvg from '../../../images/arrow-back.svg';
import { Link } from 'react-router-dom';

const BackButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  justify-content: left;
  margin: 0.625rem 0 0 0;
`;
const GoBackImg = styled.img`
  align-items: center;
  width: 2.188rem;
  height: 2.5rem;
  font-size: 0.625rem;
  font-weight: none;
  text-transform: none;
`;
const BackLink = styled(Link)`
  text-decoration: none;
  color: var(--color-white);
  font-size: 1rem;
  font-weight: bold;

  &.link-color {
    color: var(--color-black);
  }
`;
// This is functional styled 'StyledBackButton' component that renders a styled back button
//with optional children and custom CSS class
const StyledBackButton = ({ linkName, children, className }) => (
  <BackLink to={`${linkName}`} className={className}>
    <BackButtonWrapper>
      <GoBackImg src={BackButtonSvg} alt="go back arrow" />
      {children}
    </BackButtonWrapper>
  </BackLink>
);

export default StyledBackButton;
