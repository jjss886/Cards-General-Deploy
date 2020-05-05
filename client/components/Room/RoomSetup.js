import React, { Component } from "react";
import { connect } from "react-redux";
import { gameModes } from "../../utils/utilities";

class RoomSetup extends Component {
  constructor() {
    super();
    this.state = { mode: "None" };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const { channel } = this.props,
      players = channel.players ? Object.values(channel.players) : [];

    return (
      <div className="roomSetupDiv">
        <p className="roomSetupText">
          <u>Host</u>: {channel.host}
        </p>

        {players.map((p, i) => (
          <p key={i} className="roomSetupText">
            {i + 1}. {p.name} points: {p.points}
          </p>
        ))}

        <select
          name="mode"
          value={this.state.mode}
          onChange={this.handleChange}
        >
          {gameModes.map((g, i) => (
            <option key={i}>{g}</option>
          ))}
        </select>
      </div>
    );
  }
}

const mapState = (state) => ({ channel: state.channel });

export default connect(mapState)(RoomSetup);
