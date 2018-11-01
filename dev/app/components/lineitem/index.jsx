import React from "react";

const LineItem = ({ lineItem }) => (
  <div className="line-item">
    <div>{lineItem.item}</div>
    <div>{lineItem.qty}</div>
    <div>{lineItem.price}</div>
    <div>{lineItem.total}</div>
  </div>
);

export default LineItem;
