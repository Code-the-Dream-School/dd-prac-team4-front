import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

//The NavigateButton lets us navigate to another screen in our app
const NavigateButton = ({
  linkName,
  variant,
  color,
  children,
  className,
  startIcon,
  style,
}) => {
  // linkName is a destination name of the route
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(linkName); // Simply navigate to the new route name
  };
  return (
    <>
      <div style={{ marginBottom: 2 }}>
        <Button
          onClick={clickHandler}
          variant={variant}
          color={color}
          className={className}
          startIcon={startIcon}
          style={style}
        >
          {children}
        </Button>
      </div>
    </>
  );
};
export default NavigateButton;
