import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mockData = {
  taxPercentage: 5,
  subtotal: "5,678,908.98",
  salesTax: "2.60",
  total: "5,678,908.98.58"
};

const devEnvironment = false;

const Total = ({ subtotal, salesTax, taxPercentage, total }) => (
  <div className="total">
    <div className="total-labels">
      <div>Subtotal</div>
      <div>
        {`Tax(${devEnvironment ? mockData.taxPercentage : taxPercentage}%)`}
      </div>
      <div>Total</div>
    </div>

    <div className="total-figures">
      <div>{`$${devEnvironment ? mockData.subtotal : subtotal}`}</div>
      <div>{`$${devEnvironment ? mockData.salesTax : salesTax}`}</div>
      <div>{`$${devEnvironment ? mockData.total : total}`}</div>
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
