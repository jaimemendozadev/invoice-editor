import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LineItem from "../lineitem";
import Total from "./Total";

const renderLineItems = invoiceItems => {
  invoiceItems.map(item => <LineItem item={item} />);
};

const Invoice = ({ invoiceItems, subtotal, tax, taxRate, total }) => {
  console.log("invoiceItems is ", invoiceItems);

  return (
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

          {invoiceItems.length ? renderLineItems(invoiceItems) : null}

          <button>Add Item</button>
        </div>

        <Total subtotal={subtotal} tax={tax} taxRate={taxRate} total={total} />
      </div>
    </div>
  );
};

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
