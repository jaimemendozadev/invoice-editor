import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FormRow from "../formrow";
import StatusMessage from "../statusmessage";
import { addLineItem } from "../../services/redux/actions";
import {
  createLineItem,
  defaultState,
  createStatusObject,
  checkForFormErrors,
  prepGrandTotal
} from "./utils";

import { convertToDecimals, calculateTotal } from "./utils/accounting";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleFocus = formVal => {
    this.setState({ [formVal]: "", statusMsg: {} });
  };

  checkNumberInput = (numToCheck, inputType, stateResets) => {
    const { qty, price } = this.state;

    if (Number.isNaN(numToCheck)) {
      const newResetState = createStatusObject(stateResets, inputType);

      this.setState(newResetState);
    } else {
      // Get the price & quantity
      const usingPrice =
        inputType === "price" ? numToCheck : convertToDecimals(price);
      const usingQty = inputType === "qty" ? numToCheck : parseInt(qty, 10);

      // Get the updatedTotal
      const updatedTotal = calculateTotal(usingQty, usingPrice);

      // Price should be displayed with cents
      const updatedPrice = usingPrice.toFixed(2);

      this.setState({
        total: updatedTotal, // type string
        price: updatedPrice, // type string
        qty: usingQty // type number
      });
    }
  };

  performFinalCheck = callback => {
    const { item, qty, price, total } = this.state;
    const { taxPercentage, subtotal } = this.props;

    const checkResult = checkForFormErrors(qty, price, item);

    // If the final check passes, reset form and invoke callback
    if (checkResult === false) {
      const invoicePayload = createLineItem(this.state);
      const totalPayload = prepGrandTotal(total, subtotal, taxPercentage);

      const reduxPayload = { invoice: invoicePayload, total: totalPayload };

      this.setState(defaultState, () => callback(reduxPayload));
    } else {
      this.setState(checkResult);
    }
  };

  handleBlur = formVal => {
    // Where MOST of the magic happens
    // Qty and Price state inputs are converted
    // to nums before we invoke checkNumberInput

    const { item, qty, price } = this.state;

    if (formVal === "item") {
      if (item.length === 0) {
        this.setState({ [formVal]: "Description" });
      }
    }

    if (formVal === "qty") {
      if (qty.length === 0) {
        this.setState({ [formVal]: 0 });
      }

      const numToCheck = parseInt(qty, 10);
      const stateResets = { qty: 0 };

      this.checkNumberInput(numToCheck, "qty", stateResets);
    }

    if (formVal === "price") {
      if (price.length === 0) {
        this.setState({ [formVal]: "0.00" });
      }

      // Ensures that number passed to
      // checkNumberInput only has 2 decimal places
      const numToCheck = convertToDecimals(price);

      const stateResets = { price: "0.00", total: "0.00" };

      this.checkNumberInput(numToCheck, "price", stateResets);
    }
  };

  handleChange = (evt, formVal) => {
    this.setState({
      [formVal]: evt.target.value,
      statusMsg: {}
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { AddLineItem } = this.props;

    // this.performFinalCheck performs final payload check
    // before firing Redux action
    this.performFinalCheck(AddLineItem);
  };

  componentDidUpdate = prevProps => {
    const { subtotal } = this.props;

    if (subtotal > prevProps.subtotal) {
      const itemAddedToInvoice = createStatusObject({}, "addToStore");

      this.setState(itemAddedToInvoice);
    }
  };

  render() {
    const { item, qty, price, total, statusMsg } = this.state;
    const { subtotal } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-container">
          <h1>Add an Item</h1>
          <FormRow
            labelName="Item:"
            className="longer-input"
            type="text"
            value={item}
            onFocus={() => this.handleFocus("item")}
            onBlur={() => this.handleBlur("item")}
            onChange={evt => this.handleChange(evt, "item")}
          />

          <FormRow
            labelName="Quantity:"
            className="shorter-input"
            type="text"
            value={qty}
            onFocus={() => this.handleFocus("qty")}
            onBlur={() => this.handleBlur("qty")}
            onChange={evt => this.handleChange(evt, "qty")}
          />

          <FormRow
            labelName="Price:"
            className="shorter-input"
            type="text"
            value={price}
            onFocus={() => this.handleFocus("price")}
            onBlur={() => this.handleBlur("price")}
            onChange={evt => this.handleChange(evt, "price")}
          />

          <div className="form-row row-total">
            <div className="form-label">Total</div>
            <div>{`$${total}`}</div>
          </div>
        </div>

        <StatusMessage statusMsg={statusMsg} />

        <div className="add-item-btn-container">
          <button className="create-item-btn" type="submit">
            Create Item
          </button>
          <button className="back-btn">
            <Link to="/">
              <span>Back to Invoice</span>
            </Link>
          </button>
        </div>
      </form>
    );
  }
}

AddItem.propTypes = {
  AddLineItem: PropTypes.func.isRequired,
  taxPercentage: PropTypes.number.isRequired,
  subtotal: PropTypes.string.isRequired
};

const mapStateToProps = ({ total }) => ({
  subtotal: total.subtotal,
  taxPercentage: total.taxPercentage
});

export default connect(
  mapStateToProps,
  { AddLineItem: addLineItem }
)(AddItem);
