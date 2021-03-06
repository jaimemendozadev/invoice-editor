import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LineItem from "../lineitem";
import Total from "../total";

const renderLineItems = (invoiceItems, invoiceItemKeys) =>
  invoiceItemKeys.map(key => (
    <LineItem
      key={key}
      lineItemID={key}
      invoiceItems={invoiceItems}
      lineItem={invoiceItems[key]}
    />
  ));

const checkForLineItems = invoiceItems => {
  const invoiceItemKeys = Object.keys(invoiceItems);

  if (invoiceItemKeys.length) {
    return renderLineItems(invoiceItems, invoiceItemKeys);
  }

  return <div className="default-msg">You Have No Line Items</div>;
};

const Invoice = ({ invoiceItems }) => (
  <div className="main-container">
    <h1>Invoice</h1>
    <div className="invoice-container">
      <div className="ledger-container">
        <div className="cols">
          <div className="header">Item</div>
          <div className="header">Qty</div>
          <div className="header">Price</div>
          <div className="header last-header">Total</div>
        </div>

        <div className="line-items-container">
          {checkForLineItems(invoiceItems)}
        </div>
      </div>

      <button className="additem-btn">
        <Link to="/additem">
          <span>Add Item</span>
        </Link>
      </button>

      <Total />
    </div>
  </div>
);

const mapStateToProps = ({ invoice }) => ({
  invoiceItems: invoice.invoiceItems
});

Invoice.propTypes = {
  invoiceItems: PropTypes.objectOf(
    PropTypes.shape({
      item: PropTypes.string,
      qty: PropTypes.number,
      price: PropTypes.string,
      total: PropTypes.string
    })
  ).isRequired
};

export default connect(mapStateToProps)(Invoice);
