import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DeleteIcon from "../assets/delete-button.png";
import { updateInvoice } from "../../services/redux/actions";

const deleteLineItem = (lineItemID, invoiceItems, subtotal, callback) => {

  const price = invoiceItems.price;

  // Delete the item from the invoiceItems
  delete invoiceItems[lineItemID];

  // Get the updated subtotal
  const updatedSubtotal;

  const payload = {
    invoice: invoiceItems,
    total: {subtotal: },
  }

  callback(invoiceItems);
};

// item, price, qty, total
const LineItem = ({
  lineItemID,
  lineItem,
  invoiceItems,
  subtotal,
  UpdateInvoice
}) => (
  <div className="line-item">
    <div className="line-item-field item-field">{lineItem.item}</div>
    <div className="line-item-field qty-field">{lineItem.qty}</div>
    <div className="line-item-field price-field">{lineItem.price}</div>
    <div className="line-item-field total-field">
      <div>{lineItem.total}</div>
      <img
        onClick={() =>
          deleteLineItem(lineItemID, invoiceItems, subtotal, UpdateInvoice)
        }
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
  lineItemID: PropTypes.string.isRequired,
  subtotal: PropTypes.string.isRequired,
  UpdateInvoice: PropTypes.func.isRequired
};

const mapStateToProps = ({ total }) => ({
  subtotal: subtotal.total
});
export default connect(
  mapStateToProps,
  { UpdateInvoice: updateInvoice }
)(LineItem);
