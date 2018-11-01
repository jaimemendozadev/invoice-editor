import React, { Component } from "react";
import { connect } from "redux";
import { calculateTotal, createLineItem } from "./utils";
import { addLineItem } from "../../services/redux/actions";

const defaultState = {
  qty: 0,
  price: "0.00",
  total: "0.00",
  item: "Description"
};

/*
 // item, qty, price, total

 item: PropTypes.string,
 qty: PropTypes.number,
 price: PropTypes.string,
 total: PropTypes.string

*/

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleFocus = formVal => {
    this.setState({ [formVal]: "" });
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
    const { AddLineItem } = this.props;

    const payload = createLineItem(this.state);

    AddLineItem(payload);
  };

  render() {
    const { item, qty, price, total } = this.state;
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
