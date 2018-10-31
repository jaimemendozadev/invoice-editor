import React, { Component } from "react";
import { connect } from "react-redux";

class Invoice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("this.props inside invoice ", this.props);
    return <h1>Invoice</h1>;
  }
}

const mapStateToProps = ({ invoice }) => ({
  invoice
});
export default connect(mapStateToProps)(Invoice);
