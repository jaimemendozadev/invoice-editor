import React from "react";
import DeleteIcon from "../assets/delete-button.png";

const LineItem = ({ lineItem }) => (
  <div className="line-item">
    <div className="line-item-field item-field">{lineItem.item}</div>
    <div className="line-item-field qty-field">{lineItem.qty}</div>
    <div className="line-item-field price-field">{lineItem.price}</div>
    <div className="line-item-field total-field">
      <div>{lineItem.total}</div>
      <img src={DeleteIcon} alt="Delete Icon for Line Item" />
    </div>
  </div>
);

export default LineItem;
