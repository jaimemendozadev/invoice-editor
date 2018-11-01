import React, { Component } from "react";
import { calculateTotal } from "./utils";

const defaultState = {
  qty: 0,
  price: "0.00",
  total: "0.00",
  desc: "Line Item Name"
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
    const { desc, qty, price } = this.state;

    if (formVal === "desc") {
      if (desc.length === 0) {
        this.setState({ [formVal]: "Line Item Name" });
      }
    }

    if (formVal === "qty") {
      if (qty.length === 0) {
        this.setState({ [formVal]: 0 });
      }
    }

    if (formVal === "price") {
      if (price.length === 0) {
        this.setState({ [formVal]: "0.00" });
      }
    }
  };

  handleChange = (evt, formVal) => {
    if (formVal === "qty") {
      const qty = parseInt(evt.target.value, 10);
      this.setState({
        qty
      });
    } else {
      this.setState({ price: evt.target.value });
    }
  };

  handleSubmit = evt => {
    evt.preventDefault();
  };

  render() {
    const { desc, qty, price, total } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add an Item</h1>

        <div className="form-row">
          <div className="form-label">Description:</div>
          <input
            className="longer-input"
            type="text"
            value={`${desc}`}
            onFocus={() => this.handleFocus("desc")}
            onBlur={() => this.handleBlur("desc")}
            onChange={evt => this.handleChange(evt, "desc")}
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
      </form>
    );
  }
}

export default AddItem;
