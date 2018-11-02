import React from "react";
import PropTypes from "prop-types";

const FormRow = ({
  labelName,
  className,
  type,
  value,
  onFocus,
  onBlur,
  onChange
}) => (
  <div className="form-row">
    <div className="form-label">{labelName}</div>
    <input
      className={`${className}`}
      type={`${type}`}
      value={`${value}`}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    />
  </div>
);

FormRow.propTypes = {
  labelName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default FormRow;
