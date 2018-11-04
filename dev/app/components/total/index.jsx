import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Total = ({ subtotal, salesTax, taxPercentage, total }) => (
  <div className="total">
    <div className="total-labels">
      <div>Subtotal</div>
      <div>{`Tax(${taxPercentage}%)`}</div>
      <div>Total</div>
    </div>

    <div className="total-figures">
      <div>{`$${subtotal}`}</div>
      <div>{`$${salesTax}`}</div>
      <div>{`$${total}`}</div>
    </div>
  </div>
);

Total.propTypes = {
  subtotal: PropTypes.string.isRequired,
  salesTax: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  taxPercentage: PropTypes.number.isRequired
};

const mapStateToProps = ({ total }) => ({
  subtotal: total.subtotal,
  salesTax: total.salesTax,
  total: total.total,
  taxPercentage: total.taxPercentage
});

export default connect(mapStateToProps)(Total);
