import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LineItem from "../lineitem";
import Total from "./Total";

const renderLineItems = invoiceItems => {
  invoiceItems.map(item => <LineItem item={item} />);
};

const checkForLineItems = invoiceItems => {
  if (invoiceItems.length) {
    return renderLineItems(invoiceItems);
  }

  return "You have no Line Items";
};

const Invoice = ({ invoiceItems, subtotal, tax, taxRate, total }) => (
    <div>
      <h1>Invoice</h1>
      <div className="invoice-container">
        <div className="ledger-container">
          <div className="cols">
            <div className="header">Item</div>
            <div className="header">Qty</div>
            <div className="header">Price</div>
            <div className="header">Total</div>
          </div>

          <div className="line-items-container">
            {checkForLineItems(invoiceItems)}
          </div>

          <button className="additem-btn">
            <Link to="/additem">Add Item</Link>
          </button>
        </div>

        <Total subtotal={subtotal} tax={tax} taxRate={taxRate} total={total} />
      </div>
    </div>
  );

const mapStateToProps = ({ invoice }) => ({
  invoiceItems: invoice.invoiceItems,
  subtotal: invoice.subtotal,
  tax: invoice.tax,
  taxRate: invoice.taxRate,
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
  taxRate: PropTypes.number.isRequired,
  subtotal: PropTypes.string.isRequired,
  tax: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Invoice);
