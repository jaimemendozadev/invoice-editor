import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ errorMsgs }) => {
  const errorKeys = Object.keys(errorMsgs);

  console.log("errorMsgs is ", errorMsgs);

  if (errorKeys.length) {
    return errorKeys.map((errorKey, idx) => (
      <div key={`${errorKey}-${idx}`} className="error-msg">
        {errorMsgs[errorKey]}
      </div>
    ));
  }

  return null;
};

ErrorMessage.propTypes = {
  errorMsgs: PropTypes.objectOf(PropTypes.string).isRequired
};

export default ErrorMessage;
