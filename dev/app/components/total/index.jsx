import React from "react";
import { connect } from "react-redux";
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
      <div>{`$${salesTax}`}</div>
      <div>{`$${total}`}</div>
    </div>
  </div>
);

Total.propTypes = {
  taxRate: PropTypes.number.isRequired,
  subtotal: PropTypes.string.isRequired,
  salesTax: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired
};

const mapStateToProps = ({ total }) => ({
  taxRate: total.taxRate,
  subtotal: total.subtotal,
  salesTax: total.salesTax,
  total: total.total
});

export default connect(mapStateToProps)(Total);
