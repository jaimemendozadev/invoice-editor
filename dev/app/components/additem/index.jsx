import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormRow from "./FormRow";
import { addLineItem } from "../../services/redux/actions";
import {
  calculateTotal,
  createLineItem,
  checkForErrors,
  defaultState,
  inputErrors
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
      const newResetState = Object.assign({}, stateResets, {
        errorMsgs: inputErrors[inputType]
      });

      this.setState(newResetState);
    } else {
      // Get the price & quantity
      const usingPrice = inputType === "price" ? numToCheck : parseFloat(price);
      const usingQty = inputType === "qty" ? numToCheck : parseInt(qty, 10);

      // Get the updatedTotal
      const updatedTotal = calculateTotal(usingQty, usingPrice);

      // Price should be displayed with cents
      const updatedPrice = usingPrice.toFixed(2);

      this.setState({
        total: updatedTotal,
        price: updatedPrice,
        qty: usingQty
      });
    }
  };

  checkItemInput = (inputType, callback) => {
    const { item, errorMsgs } = this.state;
    if (item === "Description") {
      const newError = Object.assign({}, errorMsgs, {
        errorMsgs: inputErrors[inputType]
      });

      this.setState(newError);
    } else {
      // If the final check passes, reset form and invoke callback
      this.setState(defaultState, () => callback());
    }
  };

  handleBlur = formVal => {
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
      const stringPriceFloat = parseFloat(price).toFixed(2);
      const numToCheck = parseFloat(stringPriceFloat);

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

    const payload = createLineItem(this.state);

    // this.checkItemInput performs final payload check
    // before firing Redux action
    this.checkItemInput("item", () => AddLineItem(payload));
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

        {checkForErrors(errorMsgs)}
      </form>
    );
  }
}

AddItem.propTypes = {
  AddLineItem: PropTypes.func.isRequired
};

export default connect(
  null,
  { AddLineItem: addLineItem }
)(AddItem);
