import React from "react";

const FormRow = ({ className, type, value, onFocus, onBlur, onChange }) => (
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
);

export default FormRow;
