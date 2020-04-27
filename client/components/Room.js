import React from "react";

const Room = (props) => {
  console.log("room render -", props.location.state);
  return (
    <div>
      <h3>Room!</h3>
      <button type="button" onClick={props.history.goBack}>
        Back
      </button>
    </div>
  );
};

export default Room;
