import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "../assets/delete-button.png";
import invoice from "../../services/redux/reducers/invoice";

const deleteLineItem = (evt, lineItemID, invoiceItems) => {
  console.log("do something");

  console.log("key is ", lineItemID);
  console.log("invoiceItems inside deleteItem ", invoiceItems);
};

// item, price, qty, total
const LineItem = ({ lineItemID, lineItem, invoiceItems }) => (
  <div className="line-item">
    <div className="line-item-field item-field">{lineItem.item}</div>
    <div className="line-item-field qty-field">{lineItem.qty}</div>
    <div className="line-item-field price-field">{lineItem.price}</div>
    <div className="line-item-field total-field">
      <div>{lineItem.total}</div>
      <img
        onClick={evt => deleteLineItem(evt, lineItemID, invoiceItems)}
        src={DeleteIcon}
        alt="Delete Icon for Line Item"
      />
    </div>
  </div>
);

LineItem.propTypes = {
  invoiceItems: PropTypes.objectOf(
    PropTypes.shape({
      item: PropTypes.string,
      qty: PropTypes.number,
      price: PropTypes.string,
      total: PropTypes.string
    })
  ).isRequired,

  lineItem: PropTypes.shape({
    item: PropTypes.string,
    qty: PropTypes.number,
    price: PropTypes.string,
    total: PropTypes.string
  }).isRequired,
  lineItemID: PropTypes.string.isRequired
};

export default LineItem;
