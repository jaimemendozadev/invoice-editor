import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LineItem from "../lineitem";

const renderLineItems = invoiceItems => {
  invoiceItems.map(item => <LineItem item={item} />);
};

const Invoice = ({ invoiceItems, subtotal, tax, total }) => {
  console.log("invoiceItems is ", invoiceItems);

  return (
    <div>
      <h1>Invoice</h1>
      <div className="table">
        <div className="cols">
          <div className="header">Item</div>
          <div className="header">Qty</div>
          <div className="header">Price</div>
          <div className="header">Total</div>
        </div>

        <button>Add Item</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ invoice }) => ({
  invoiceItems: invoice.invoiceItems,
  subtotal: invoice.subtotal,
  tax: invoice.tax,
  total: invoice.total
});

Invoice.propTypes = {
  invoiceItems: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string,
      qty: PropTypes.number,
      price: PropTypes.string,
      total: PropTypes.string
    })
  ).isRequired,
  subtotal: PropTypes.string.isRequired,
  tax: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Invoice);
