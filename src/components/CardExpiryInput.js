import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";

const CardExpiryInput = props => {
  const newProps = {
    ...props,
    placeholder: "Expiry",
    onKeyDown: e => {
      const nonNumericCharsRe = /[^0-9]/g;
      const containsNonNumerics = nonNumericCharsRe.test(e.key);

      if (containsNonNumerics) {
        if (e.which !== 8 && e.which !== 9) {
          e.preventDefault();
        }
      } else {
        const sanitizedValue = e.target.value.replace(/[^0-9]+/g, "");
        if (sanitizedValue.length === 2 && e.key > 3) {
          e.preventDefault();
        }
        if (sanitizedValue.length === 3) {
          const thirdNumber = parseInt(sanitizedValue[2]);
          if (e.key === "0") {
            if (thirdNumber === 0) {
              e.preventDefault();
            }
          } else if (e.key > 1 && thirdNumber === 3) {
            e.preventDefault();
          }
        }
        if (sanitizedValue.length > 3) {
          e.preventDefault();
        }
      }
    }
  };
  return <TextInput {...newProps} />;
};

CardExpiryInput.propTypes = {
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  size: PropTypes.oneOf(["small", "regular", "large"])
};

export default CardExpiryInput;
