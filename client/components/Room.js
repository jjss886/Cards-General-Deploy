import React from "react";

const Room = (props) => {
  console.log("room render -", props.location.state);
  return (
    <div>
      <h3>Room!</h3>
    </div>
  );
};

export default Room;
