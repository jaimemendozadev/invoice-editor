import React from "react";
import PropTypes from "prop-types";

const Total = ({ subtotal, tax, taxRate, total }) => (
  <div className="total">
    <div className="total-labels">
      <div>Subtotal</div>
      <div>{`Tax(${taxRate}%)`}</div>
      <div>Total</div>
    </div>

    <div className="total-figures">
      <div>{`$${subtotal}`}</div>
      <div>{`$${tax}`}</div>
      <div>{`$${total}`}</div>
    </div>
  </div>
);

Total.propTypes = {
  subtotal: PropTypes.string.isRequired,
  tax: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired
};

export default Total;
