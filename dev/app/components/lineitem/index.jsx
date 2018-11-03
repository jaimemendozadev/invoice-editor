import React from "react";
import DeleteIcon from "../assets/delete-button.png";

const deleteLineItem = evt => {
  console.log("do something");
};

const LineItem = ({ lineItem }) => (
  <div className="line-item">
    <div className="line-item-field item-field">{lineItem.item}</div>
    <div className="line-item-field qty-field">{lineItem.qty}</div>
    <div className="line-item-field price-field">{lineItem.price}</div>
    <div className="line-item-field total-field">
      <div>{lineItem.total}</div>
      <img
        onClick={deleteLineItem}
        src={DeleteIcon}
        alt="Delete Icon for Line Item"
      />
    </div>
  </div>
);

export default LineItem;
