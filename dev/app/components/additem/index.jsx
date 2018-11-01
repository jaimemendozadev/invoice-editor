import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLineItem } from "../../services/redux/actions";
import { calculateTotal, createLineItem, checkForErrors } from "./utils";

const defaultState = {
  qty: 0,
  price: "0.00",
  total: "0.00",
  item: "Description",
  errorMsgs: {}
};

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

    const inputErrors = {
      qty: {
        invalidQty: "Please enter a valid quantity."
      },
      price: {
        invalidPrice: "Please enter a valid price."
      }
    };

    if (Number.isNaN(numToCheck)) {
      const newResetState = Object.assign({}, stateResets, {
        errorMsgs: inputErrors[inputType]
      });

      this.setState(newResetState);
    } else {
      // Get the price & quantity
      const usingPrice = inputType === "price" ? numToCheck : price;
      const usingQty = inputType === "qty" ? numToCheck : qty;

      // Get the updatedTotal
      const updatedTotal = calculateTotal(usingQty, usingPrice);

      this.setState({
        total: updatedTotal,
        price: usingPrice.toFixed(2), // Price should be displayed with cents
        qty: parseInt(usingQty, 10) // Not necessary, just incase
      });
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

      const numToCheck = parseFloat(price);
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

    AddLineItem(payload);
  };

  render() {
    const { item, qty, price, total, errorMsgs } = this.state;

    console.log("this.state inside AddItem ", this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add an Item</h1>

        <div className="form-row">
          <div className="form-label">Item:</div>
          <input
            className="longer-input"
            type="text"
            value={`${item}`}
            onFocus={() => this.handleFocus("item")}
            onBlur={() => this.handleBlur("item")}
            onChange={evt => this.handleChange(evt, "item")}
          />
        </div>

        <div className="form-row">
          <div className="form-label">Quantity:</div>
          <input
            className="shorter-input"
            type="text"
            value={`${qty}`}
            onFocus={() => this.handleFocus("qty")}
            onBlur={() => this.handleBlur("qty")}
            onChange={evt => this.handleChange(evt, "qty")}
          />
        </div>

        <div className="form-row">
          <div className="form-label">Price:</div>
          <input
            className="shorter-input"
            type="text"
            value={price}
            onFocus={() => this.handleFocus("price")}
            onBlur={() => this.handleBlur("price")}
            onChange={evt => this.handleChange(evt, "price")}
          />
        </div>

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
