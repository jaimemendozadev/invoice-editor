import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LineItem from "../lineitem";
import Total from "../total";

const mockData = {
  "Widget 1-2.34": {
    item: "Widget 1",
    price: "2.34",
    qty: 2,
    total: "4.68"
  },

  "Widget 2-4.55": {
    item: "Widget 2",
    price: "4.55",
    qty: 3,
    total: "13.65"
  },

  "Widget 376-12.99": {
    item: "Widget 376",
    price: "12.99",
    qty: 5,
    total: "64.95"
  },

  "Fake Widget jfjasuoreuwoajfasdjfasjfipoiweerojasdfiashdpfhpiewahroefhapehrpeawhrohsdoafuasdpureuawpfupu-875-45.00": {
    item:
      "Fake Widget jfjasuoreuwoajfasdjfasjfipoiweerojasdfiashdpfhpiewahroefhapehrpeawhrohsdoafuasdpureuawpfupu",
    price: "45.00",
    qty: 875,
    total: "39,375723895742305702375032475273523578234573254637252357325899235"
  }
};

const devMode = true;

const renderLineItems = (invoiceItems, invoiceItemKeys) =>
  invoiceItemKeys.map(key => (
    <LineItem key={key} lineItem={invoiceItems[key]} />
  ));

const checkForLineItems = invoiceItems => {
  const invoiceItemKeys = Object.keys(invoiceItems);

  if (invoiceItemKeys.length) {
    return renderLineItems(invoiceItems, invoiceItemKeys);
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
          {devMode
            ? checkForLineItems(mockData)
            : checkForLineItems(invoiceItems)}
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
  invoiceItems: PropTypes.objectOf(
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
