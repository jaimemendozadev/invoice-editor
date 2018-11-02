import React from "react";

const LineItem = ({ lineItem }) => (
  <div className="line-item">
    <div className="line-item-field item-field">{lineItem.item}</div>
    <div className="line-item-field qty-field">{lineItem.qty}</div>
    <div className="line-item-field price-field">{lineItem.price}</div>
    <div className="line-item-field total-field">{lineItem.total}</div>
  </div>
);

export default LineItem;
