import React, { Component } from "react";
import { connect } from "react-redux";
import { roomLog } from "../socket";

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

        <button type="button" onClick={roomLog}>
          Log Socket
        </button>

        {players.map((p, i) => (
          <p key={i}>
            {i + 1}. {p.name} points: {p.points}
          </p>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({ channel: state.channel });

export default connect(mapState)(Room);
