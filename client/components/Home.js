import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { addNewRoom } from "../store";
import { channelOption } from "../utils/utilities";
import socket from "../utils/socket";

class Home extends Component {
  constructor() {
    super();
    this.state = { roomId: "", name: "" };
  }

  async componentDidMount() {
    const { data: rooms } = await axios.get("/all-rooms");
    this.props.addNewRoom(rooms);
  }

  roomCreate = async () => {
    const { history, rooms } = this.props,
      { name } = this.state;

    if (!name.length) return alert("Please fill in name");

    while (true) {
      let roomId = "";

      for (let i = 0; i < 4; i++) {
        const x = Math.floor(Math.random() * channelOption.length);
        roomId += channelOption[x];
      }

      if (!(roomId in rooms)) {
        await axios.post("/room-action", {
          action: { type: "NEW_ROOM", roomId, name },
        });

        socket.emit("new-room", roomId);

        history.push(`/Room/${roomId}`);

        return;
      }
    }
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  joinRoom = (evt) => {
    evt.preventDefault();

    const { roomId, name } = this.state,
      { history, rooms } = this.props;

    if (!name.length) return alert("Please fill in name");

    if (roomId in rooms) history.push(`/Room/${roomId}`);
    else alert("Room Not Available");
  };

  render() {
    const { rooms } = this.props,
      roomIds = Object.keys(rooms);

    return (
      <div className="houseDiv mainDiv">
        <h3>Home to General Cards</h3>

        <input
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Name"
        />

        <button type="button" className="gBtn" onClick={this.roomCreate}>
          Create Room!
        </button>

        <form onSubmit={this.joinRoom}>
          <input
            name="roomId"
            value={this.state.roomId}
            onChange={this.handleChange}
            placeholder="Room Id"
          />

          <button type="submit" className="gBtn">
            Join
          </button>
        </form>

        <div>{roomIds ? roomIds.map((x, i) => <p key={i}>{x}</p>) : null}</div>
      </div>
    );
  }
}

const mapState = (state) => ({ rooms: state.rooms });

const mapDispatch = (dispatch) => ({
  addNewRoom: (room) => dispatch(addNewRoom(room)),
});

export default connect(mapState, mapDispatch)(Home);
