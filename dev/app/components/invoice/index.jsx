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

  return <div className="default-msg">You Have No Line Items</div>;
};

const Invoice = ({ invoiceItems }) => (
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
          <Link to="/additem">
            <span>Add Item</span>
          </Link>
        </button>
      </div>

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
