import React, { Component } from "react";
import { connect } from "react-redux";
import { actionSocket, restoreState } from "../../store";
import { roomLog } from "../../socket";
import ChatRoom from "./ChatRoom";
import RoomSetup from "./RoomSetup";
import Table from "../Game/Table";
import ControlPanel from "../Game/ControlPanel";

class Room extends Component {
  componentDidMount() {
    const { user, restoreState, history } = this.props,
      state = localStorage.getItem("profile");

    if (!user) {
      if (state) restoreState(JSON.parse(state));
      else history.push("/");
    }
  }

  storageUpdate = () => {
    localStorage.setItem("profile", JSON.stringify(this.props.state));
  };

  leaveRoom = () => {
    const { user, channel, history } = this.props;
    actionSocket({ type: "LEAVE_ROOM", roomId: channel.room, name: user });
    history.push("/");
  };

  render() {
    const { channel } = this.props;

    if (channel.room) this.storageUpdate();

    return (
      <div className="mainDiv">
        {channel ? (
          <>
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
              <Table />

              <ControlPanel />

              <RoomSetup />

              <ChatRoom />
            </div>
          </>
        ) : (
          <h3>Loading</h3>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  channel: state.channel,
  state: state,
});

const mapDispatch = (dispatch) => ({
  restoreState: (state) => dispatch(restoreState(state)),
});

export default connect(mapState, mapDispatch)(Room);
