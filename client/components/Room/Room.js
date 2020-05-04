import React, { Component } from "react";
import { connect } from "react-redux";
import { actionSocket } from "../../store";
import { roomLog } from "../../socket";
import ChatRoom from "./ChatRoom";
import RoomSetup from "./RoomSetup";

class Room extends Component {
  leaveRoom = () => {
    const { user, channel, history } = this.props;
    actionSocket({ type: "LEAVE_ROOM", roomId: channel.room, name: user });
    history.push("/");
  };

  render() {
    const { channel } = this.props;

    return (
      <div className="mainDiv">
        <h3>Welcome to room: {channel.room}</h3>

        <div className="roomFlexDiv">
          <button type="button" onClick={this.leaveRoom} className="gBtn">
            Leave
          </button>

          <button type="button" onClick={roomLog} className="gBtn">
            Log Socket
          </button>
        </div>

        <div className="roomFlexDiv">
          <RoomSetup />

          <ChatRoom />
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({ user: state.user, channel: state.channel });

export default connect(mapState)(Room);
