import React from "react";

const LineItem = ({ item }) => (
  <div className="line-item">
    <div>{item}</div>
    <div>{qty}</div>
    <div>{price}</div>
    <div>{total}</div>
  </div>
);

export default LineItem;
