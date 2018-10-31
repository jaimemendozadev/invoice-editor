import React, from "react";
import { connect } from "react-redux";

const Invoice = ({ invoice }) => (
  <div>
    <h1>Invoice</h1>

    <div className="table">
      <div className="cols">
        <div>Item</div>
        <div>Qty</div>
        <div>Price</div>
        <div>Total</div>
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ invoice }) => ({
  invoice
});
export default connect(mapStateToProps)(Invoice);
