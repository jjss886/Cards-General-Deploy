import React from "react";

const Room = ({ location, history }) => {
  const { state } = location,
    { channel } = state;
  console.log("room render -", state);

  return (
    <div className="mainDiv">
      <h3>Welcome to room: {channel}</h3>

      <button type="button" onClick={history.goBack}>
        Back
      </button>
    </div>
  );
};

export default Room;
