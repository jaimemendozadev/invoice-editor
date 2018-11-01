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

  handleBlur = formVal => {
    const { item, qty, price, errorMsgs } = this.state;

    if (formVal === "item") {
      if (item.length === 0) {
        this.setState({ [formVal]: "Description" });
      }
    }

    if (formVal === "qty") {
      if (qty.length === 0) {
        this.setState({ [formVal]: 0 });
      }

      const parsedQty = parseInt(qty, 10); // get parsed qty

      if (Number.isNaN(parsedQty)) {
        const newErrors = Object.assign({}, errorMsgs, {
          invalidQty: "Please enter a valid quantity."
        });

        this.setState({ errorMsgs: newErrors, qty: 0 });
      } else {
        const parsedPrice = parseFloat(price); // get price floating num
        const updatedErrors = Object.assign({}, errorMsgs);

        if (updatedErrors.invalidQty) {
          delete updatedErrors.invalidQty;
        }

        const updatedTotal = calculateTotal(qty, parsedPrice);
        this.setState({
          qty,
          total: updatedTotal,
          errorMsgs: updatedErrors
        });
      }
    }

    if (formVal === "price") {
      if (price.length === 0) {
        this.setState({ [formVal]: "0.00" });
      } else {
        // convert price to float, then to floating point num
        const convertedPrice = parseFloat(price).toFixed(2);

        const updatedTotal = calculateTotal(qty, convertedPrice);

        this.setState({ total: updatedTotal, price: convertedPrice });
      }
    }
  };

  handleChange = (evt, formVal) => {
    if (formVal === "qty") {
      // Wait for user to set qty, then do checking in onBlur
      this.setState({
        qty: evt.target.value
      });
    }

    if (formVal === "price") {
      // Wait for user to set price, then fix price in onBlur
      this.setState({ price: evt.target.value, errorMsgs: "" });
    }

    if (formVal === "item") {
      this.setState({ item: evt.target.value, errorMsgs: "" });
    }
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
