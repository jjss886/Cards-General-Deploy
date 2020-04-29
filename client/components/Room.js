import React, { Component } from "react";
import { connect } from "react-redux";

class Room extends Component {
  render() {
    const { location, history } = this.props,
      { room } = location.state;

    return (
      <div className="mainDiv">
        <h3>Welcome to room: {room}</h3>

        <button type="button" onClick={history.goBack} className="gBtn">
          Back
        </button>

        {/* {channel.players.map((x, i) => (
          <p key={i}>
            {x.id}. {x.name}
          </p>
        ))} */}
      </div>
    );
  }
}

const mapState = (state) => ({});

export default connect(mapState)(Room);
