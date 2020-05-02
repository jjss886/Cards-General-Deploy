import React, { Component } from "react";
import { connect } from "react-redux";
import { channelOption } from "../utils/utilities";
// import { getAllRooms, addNewRoom, joinRoom, actionSocket } from "../store";
import { getAllRoomsAPI, actionSocket } from "../store";

class Home extends Component {
  constructor() {
    super();
    this.state = { roomId: "", name: "" };
  }

  componentDidMount() {
    this.props.getAllRoomsAPI();
  }

  roomCreate = async () => {
    const { history, rooms, addNewRoom } = this.props,
      { name } = this.state;

    if (!name.length) return alert("Please fill in name");

    while (true) {
      let roomId = "";

      for (let i = 0; i < 4; i++) {
        const x = Math.floor(Math.random() * channelOption.length);
        roomId += channelOption[x];
      }

      if (!(roomId in rooms)) {
        // addNewRoom({ type: "NEW_ROOM", roomId, name });

        actionSocket({ type: "NEW_ROOM", roomId, name });

        history.push(`/Room/${roomId}`);

        return;
      }
    }
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    const { roomId, name } = this.state,
      { history, rooms, joinRoom } = this.props;

    if (!name.length) return alert("Please fill in name");

    // if (rooms.has(roomId)) {
    if (roomId in rooms) {
      if (!rooms[roomId].includes(name)) {
        // joinRoom({ type: "JOIN_ROOM", roomId, name });

        actionSocket({ type: "JOIN_ROOM", roomId, name });

        history.push(`/Room/${roomId}`);
      } else alert("Name Already Taken");
    } else alert("Room Not Available");
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

        <form onSubmit={this.handleSubmit}>
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
  getAllRoomsAPI: () => dispatch(getAllRoomsAPI()),
  // addNewRoom: (roomObj) => dispatch(addNewRoom(roomObj)),
  // joinRoom: (roomObj) => dispatch(joinRoom(roomObj)),
});

export default connect(mapState, mapDispatch)(Home);
