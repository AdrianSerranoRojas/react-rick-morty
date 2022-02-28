import React from "react";

const Button = ({ handleButton, children, ...props }) => {
  return (
    <button type="button" onClick={handleButton} {...props}>
        {children}
    </button>
  );
};
export default Button;
