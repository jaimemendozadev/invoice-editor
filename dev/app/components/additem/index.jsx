import React, { Component } from "react";
import { calculateTotal } from "./utils";

const defaultState = {
  qty: 0,
  price: "0.00",
  total: "0.00"
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
    const { qty, price } = this.state;
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

  render() {
    const { qty, price, total } = this.state;
    return (
      <form>
        <h1>Add an Item</h1>

        <div>
          <label>Quantity:</label>
          <input
            type="text"
            value={`${qty}`}
            onFocus={() => this.handleFocus("qty")}
            onBlur={() => this.handleBlur("qty")}
            onChange={evt => this.handleChange(evt, "qty")}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onFocus={() => this.handleFocus("price")}
            onBlur={() => this.handleBlur("price")}
            onChange={evt => this.handleChange(evt, "price")}
          />
        </div>
        <div>{`Total ${total}`}</div>
      </form>
    );
  }
}

export default AddItem;
