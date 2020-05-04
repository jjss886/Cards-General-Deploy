import React, { Component } from "react";
import { connect } from "react-redux";

class RoomSetup extends Component {
  constructor() {
    super();
    this.state = { mode: "none" };
  }

  render() {
    const players = channel.players ? Object.values(channel.players) : [];

    return (
      <div className="roomSetupDiv">
        <p>
          <u>Host</u>: {channel.host}
        </p>

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

export default connect(mapState)(RoomSetup);
