import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormRow from "../formrow";
import ErrorMessage from "../errormessage";
import { addLineItem } from "../../services/redux/actions";
import {
  calculateTotal,
  createLineItem,
  defaultState,
  createErrorObject,
  formatPrice,
  checkForFormErrors
} from "./utils";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleFocus = formVal => {
    this.setState({ [formVal]: "" });
  };

  checkNumberInput = (numToCheck, inputType, stateResets) => {
    const { qty, price } = this.state;

    if (Number.isNaN(numToCheck)) {
      const newResetState = createErrorObject(stateResets, inputType);

      this.setState(newResetState);
    } else {
      // Get the price & quantity
      const usingPrice =
        inputType === "price" ? numToCheck : formatPrice(price);
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
    const { item, qty, price } = this.state;
    const { taxRate, subtotal, tax, grand_total } = this.props;

    const checkResult = checkForFormErrors(qty, price, item);

    if (checkResult === false) {
      const payload = createLineItem(this.state);
      // Calculate total Redux state here

      console.log("taxRate ", taxRate);
      console.log("subtotal ", subtotal);
      console.log("tax is ", tax);
      console.log("grand_total ", grand_total);

      // If the final check passes, reset form and invoke callback
      this.setState(defaultState, () => callback());
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
      const numToCheck = formatPrice(price);

      const stateResets = { price: "0.00", total: "0.00" };

      this.checkNumberInput(numToCheck, "price", stateResets);
    }
  };

  handleChange = (evt, formVal) => {
    this.setState({
      [formVal]: evt.target.value,
      errorMsgs: {}
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { AddLineItem } = this.props;

    // this.performFinalCheck performs final payload check
    // before firing Redux action
    this.performFinalCheck(AddLineItem);
  };

  render() {
    const { item, qty, price, total, errorMsgs } = this.state;

    console.log("this.state inside AddItem ", this.state);
    return (
      <form onSubmit={this.handleSubmit}>
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

        <div className="form-row">
          <div className="form-label">Total</div>
          <div>{total}</div>
        </div>

        <button className="add-item-btn" type="submit">
          Add Line Item
        </button>

        <ErrorMessage errorMsgs={errorMsgs} />
      </form>
    );
  }
}

AddItem.propTypes = {
  AddLineItem: PropTypes.func.isRequired,
  taxRate: PropTypes.number.isRequired,
  subtotal: PropTypes.string.isRequired,
  tax: PropTypes.string.isRequired,
  grand_total: PropTypes.string.isRequired
};

const mapStateToProps = ({ total }) => ({
  subtotal: total.subtotal,
  tax: total.tax,
  grand_total: total.total,
  taxRate: total.taxRate
});

export default connect(
  mapStateToProps,
  { AddLineItem: addLineItem }
)(AddItem);
