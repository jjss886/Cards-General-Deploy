import React, { Component } from "react";
import { connect } from "react-redux";
import { channelOption } from "../utils/utilities";
import { getAllRoomsAPI, actionSocket, setUser } from "../store";

class Home extends Component {
  constructor() {
    super();
    this.state = { roomId: "", name: "" };
  }

  componentDidMount() {
    this.props.getAllRoomsAPI();
  }

  roomCreate = async () => {
    const { history, rooms, setUser } = this.props,
      { name } = this.state;

    if (!name.length) return alert("Please fill in name");

    while (true) {
      let roomId = "";

      for (let i = 0; i < 4; i++) {
        const x = Math.floor(Math.random() * channelOption.length);
        roomId += channelOption[x];
      }

      if (!(roomId in rooms)) {
        setUser(name);
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

    const { history, rooms, setUser } = this.props,
      { roomId, name } = this.state;

    if (!name.length) return alert("Please fill in name");

    if (roomId in rooms) {
      if (!rooms[roomId].includes(name)) {
        setUser(name);
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

        <button
          type="submit"
          className="gBtn"
          onClick={() => actionSocket({ type: "CLEAR_ROOM" })}
        >
          Clear Rooms
        </button>

        <div>{roomIds ? roomIds.map((x, i) => <p key={i}>{x}</p>) : null}</div>
      </div>
    );
  }
}

const mapState = (state) => ({ rooms: state.rooms });

const mapDispatch = (dispatch) => ({
  getAllRoomsAPI: () => dispatch(getAllRoomsAPI()),
  setUser: (name) => dispatch(setUser(name)),
});

export default connect(mapState, mapDispatch)(Home);
