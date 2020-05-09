import React, { Component } from "react";
import { connect } from "react-redux";
import { gameModes } from "../../utils/utilities";
import { startGame } from "../../store";

class RoomSetup extends Component {
  constructor() {
    super();
    this.state = { mode: "None" };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  start = () => {
    const { players, startGame } = this.props;
    if (players) startGame(Object.keys(players)[0]);
  };

  render() {
    const { channel, players } = this.props,
      curPlayers = Object.values(players || []);

    return (
      <div className="roomSetupDiv">
        <p className="roomSetupText">
          <u>Host</u>: {channel.host}
        </p>

        <p className="roomSetupText">
          <u># of Players</u>: {curPlayers.length}
        </p>

        <select
          name="mode"
          value={this.state.mode}
          onChange={this.handleChange}
        >
          {gameModes.map((g, i) => (
            <option key={i}>{g}</option>
          ))}
        </select>

        <button type="button" onClick={this.start}>
          Start!
        </button>

        {curPlayers.map((p, i) => (
          <p key={i} className="roomSetupText">
            {i + 1}. {p.name} points: {p.points}
          </p>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  channel: state.channel,
  players: state.channel.players,
});

const mapDispatch = (dispatch) => ({
  startGame: (deck) => dispatch(startGame(deck)),
});

export default connect(mapState, mapDispatch)(RoomSetup);
