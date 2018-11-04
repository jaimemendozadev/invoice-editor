import React from "react";
import PropTypes from "prop-types";

const StatusMessage = ({ statusMsg }) => {
  const statusKeys = Object.keys(statusMsg);

  if (statusKeys.length) {
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
