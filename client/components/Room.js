import React, { Component } from "react";
import { connect } from "react-redux";
import { actionSocket } from "../store";
import { roomLog } from "../socket";

class Room extends Component {
  leaveRoom = () => {
    const { user, channel, history } = this.props;
    actionSocket({ type: "LEAVE_ROOM", roomId: channel.room, name: user });
    history.push("/");
  };

  render() {
    const { channel } = this.props,
      players = channel.players ? Object.values(channel.players) : [];

    return (
      <div className="mainDiv">
        <h3>Welcome to room: {channel.room}</h3>

        <button type="button" onClick={this.leaveRoom} className="gBtn">
          Leave
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

const mapState = (state) => ({ user: state.user, channel: state.channel });

export default connect(mapState)(Room);
