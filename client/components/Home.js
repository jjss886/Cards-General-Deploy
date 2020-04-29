import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getAllRooms, addNewRoom } from "../store";
import { channelOption } from "../utils/utilities";
import socket from "../utils/socket";

class Home extends Component {
  constructor() {
    super();
    this.state = { roomId: "", name: "" };
  }

  async componentDidMount() {
    const { data: rooms } = await axios.get("/all-rooms");
    this.props.getAllRooms(new Set(rooms));
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

      if (!rooms.has(roomId)) {
        const roomObj = { type: "NEW_ROOM", roomId, id: 1, name };

        await axios.post("/room-action", { action: roomObj });

        socket.emit("new-room", roomObj);

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

    if (rooms.has(roomId)) {
      history.push(`/Room/${roomId}`);
    } else alert("Room Not Available");
  };

  render() {
    const { rooms } = this.props,
      roomIds = [...rooms.values()];

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
  getAllRooms: (rooms) => dispatch(getAllRooms(rooms)),
  addNewRoom: (roomObj) => dispatch(addNewRoom(roomObj)),
});

export default connect(mapState, mapDispatch)(Home);
