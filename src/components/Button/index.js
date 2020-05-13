import React from "react";

const Button = ({ disabled, buttonText, onClick }) => {
  return (
    <button disabled={disabled} onClick={onClick} className="btn">
      {buttonText}
    </button>
  );
};

export default Button;
