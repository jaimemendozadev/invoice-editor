import React from "react";
import { connect } from "react-redux";

const Invoice = ({ invoice }) => (
  <div>
    <h1>Invoice</h1>

    <div className="table">
      <div className="cols">
        <div className="header">Item</div>
        <div className="header">Qty</div>
        <div className="header">Price</div>
        <div className="header">Total</div>
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ invoice }) => ({
  invoice
});
export default connect(mapStateToProps)(Invoice);
