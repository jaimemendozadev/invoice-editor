import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DeleteIcon from "../assets/delete-button.png";
import { prepGrandTotal } from "../additem/utils";
import { updateInvoice } from "../../services/redux/actions";

const deleteLineItem = (
  lineItemID,
  invoiceItems,
  subtotal,
  taxPercentage,
  callback
) => {
  // Get the deleted item's total
  const itemTotal = invoiceItems[lineItemID].total;

  // Delete the item from the invoiceItems
  delete invoiceItems[lineItemID];

  // Get the updated total state for Redux
  const updatedTotalReducer = prepGrandTotal(
    itemTotal,
    subtotal,
    taxPercentage,
    true
  );

  const payload = {
    invoice: invoiceItems,
    total: updatedTotalReducer
  };

  // Update Redux store
  callback(payload);
};

const LineItem = ({
  lineItemID,
  lineItem,
  invoiceItems,
  subtotal,
  taxPercentage,
  UpdateInvoice
}) => (
  <div className="line-item">
    <div className="line-item-field item-field">{lineItem.item}</div>
    <div className="line-item-field qty-field">{lineItem.qty}</div>
    <div className="line-item-field price-field">{`$${lineItem.price}`}</div>
    <div className="line-item-field total-field">
      <div>{`$${lineItem.total}`}</div>
      <img
        onClick={() =>
          deleteLineItem(
            lineItemID,
            invoiceItems,
            subtotal,
            taxPercentage,
            UpdateInvoice
          )
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
  taxPercentage: PropTypes.number.isRequired,
  UpdateInvoice: PropTypes.func.isRequired
};

const mapStateToProps = ({ total }) => ({
  subtotal: total.subtotal,
  taxPercentage: total.taxPercentage
});
export default connect(
  mapStateToProps,
  { UpdateInvoice: updateInvoice }
)(LineItem);
