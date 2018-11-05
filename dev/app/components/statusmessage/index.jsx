import React from "react";
import PropTypes from "prop-types";

const StatusMessage = ({ statusMsg }) => {
  const statusKeys = Object.keys(statusMsg);
  const keyLen = statusKeys.length;
  const firstKey = statusKeys[0];

  if (keyLen === 1 && firstKey === "success") {
    return (
      <div key={`${firstKey}-0`} className="success-msg">
        {statusMsg[firstKey]}
      </div>
    );
  }

  if (keyLen) {
    return statusKeys.map((statusKey, idx) => (
      <div key={`${statusKey}-${idx}`} className="error-msg">
        {statusMsg[statusKey]}
      </div>
    ));
  }

  return null;
};

StatusMessage.propTypes = {
  statusMsg: PropTypes.objectOf(PropTypes.string).isRequired
};

export default StatusMessage;
