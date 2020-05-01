import React, { Component } from "react";
import { connect } from "react-redux";
import { logging } from "../socket";

class Room extends Component {
  render() {
    const { channel, history } = this.props,
      players = channel.players ? Object.values(channel.players) : [];

    return (
      <div className="mainDiv">
        <h3>Welcome to room: {channel.room}</h3>

        <button type="button" onClick={history.goBack} className="gBtn">
          Back
        </button>

        <button type="button" onClick={logging}>
          Log Socket
        </button>

        {players.map((x, i) => (
          <p key={i}>
            {x.id}. {x.name}
          </p>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({ rooms: state.rooms, channel: state.channel });

export default connect(mapState)(Room);
